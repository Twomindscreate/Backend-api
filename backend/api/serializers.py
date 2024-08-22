from dataclasses import field
from rest_framework import serializers
# from string import ascii_lowercase, ascii_uppercase
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import  force_str, smart_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
# from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import send_normal_email # type: ignore
import datetime
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from .models import User, Profile, Team, Member, Project, Task


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    password2= serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model=User
        fields = ['email', 'first_name', 'last_name', 'password', 'password2']

    def validate(self, attrs):
        password=attrs.get('password', '')
        password2 =attrs.get('password2', '')
        if password !=password2:
            raise serializers.ValidationError("passwords do not match")
         
        return attrs

    def create(self, validated_data):
        user= User.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            password=validated_data.get('password')
            )
        return user

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=155, min_length=6)
    password=serializers.CharField(max_length=68, write_only=True)
    full_name=serializers.CharField(max_length=255, read_only=True)
    access_token=serializers.CharField(max_length=255, read_only=True)
    refresh_token=serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'full_name', 'access_token', 'refresh_token']

    

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request=self.context.get('request')
        user = authenticate(request, email=email, password=password)
        if not user:
            raise AuthenticationFailed("invalid credential try again")
        if not user.is_verified:
            raise AuthenticationFailed("Email is not verified")
        tokens=user.tokens()
        return {
            'email':user.email,
            'full_name':user.get_full_name,
            "access_token":str(tokens.get('access')),
            "refresh_token":str(tokens.get('refresh'))
        }


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ['email']

    def validate(self, attrs):
        
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user= User.objects.get(email=email)
            uidb64=urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            request=self.context.get('request')
            current_site = "http://localhost:3000/"
            relative_link =reverse('reset-password-confirm', kwargs={'uidb64':uidb64, 'token':token})
            abslink=f"http://{current_site}{relative_link}"
            print(abslink)
            email_body=f"Hi {user.first_name} use the link below to reset your password {abslink}"
            data={
                'email_body':email_body, 
                'email_subject':"Reset your Password", 
                'to_email':user.email
                }
            send_normal_email(data)

        return super().validate(attrs)

    
class SetNewPasswordSerializer(serializers.Serializer):
    password=serializers.CharField(max_length=100, min_length=6, write_only=True)
    confirm_password=serializers.CharField(max_length=100, min_length=6, write_only=True)
    uidb64=serializers.CharField(min_length=1, write_only=True)
    token=serializers.CharField(min_length=3, write_only=True)

    class Meta:
        fields = ['password', 'confirm_password', 'uidb64', 'token']

    def validate(self, attrs):
        try:
            token=attrs.get('token')
            uidb64=attrs.get('uidb64')
            password=attrs.get('password')
            confirm_password=attrs.get('confirm_password')

            user_id=force_str(urlsafe_base64_decode(uidb64))
            user=User.objects.get(id=user_id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed("reset link is invalid or has expired", 401)
            if password != confirm_password:
                raise AuthenticationFailed("passwords do not match")
            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            return AuthenticationFailed("link is invalid or has expired")


    
class LogoutUserSerializer(serializers.Serializer):
    refresh_token=serializers.CharField()

    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs.get('refresh_token')

        return attrs

    def save(self, **kwargs):
        try:
            token=RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            return self.fail('bad_token')

    

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'bio', 'username', 'phone_number', 'address', 'gender',
            'occupation', 'department', 'role', 'birth_date', 'profile_picture'
        ]
        read_only_fields = ['user']

    def update(self, instance, validated_data):
        # Update the fields with provided data or retain existing values
        instance.bio = validated_data.get('bio', instance.bio)
        instance.username = validated_data.get('username', instance.username)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.address = validated_data.get('address', instance.address)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.occupation = validated_data.get('occupation', instance.occupation)
        instance.department = validated_data.get('department', instance.department)
        instance.role = validated_data.get('role', instance.role)
        instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        
        # Handle profile picture separately, as it's a file field
        profile_picture = validated_data.get('profile_picture', None)
        if profile_picture is not None:
            instance.profile_picture = profile_picture
        
        instance.save()
        return instance

    def validate_phone_number(self, value):
        """Validate the phone number field."""
        if not value.isdigit():
            raise serializers.ValidationError("Phone number must contain only digits.")
        if len(value) not in [10, 15]:
            raise serializers.ValidationError("Phone number must be 10 to 15 digits long.")
        return value

    def validate_birth_date(self, value):
        """Ensure birth_date is not in the future."""
        if value and value > datetime.date.today():
            raise serializers.ValidationError("Birth date cannot be in the future.")
        return value

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = [ 'id', 'name', 'description', 'created_at']

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = [ 'id','user', 'team', 'role', 'joined_at']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [ 'id', 'name', 'description', 'team', 'start_date', 'end_date', 'created_at']

class TaskSerializer(serializers.ModelSerializer):
    assigned_to = serializers.StringRelatedField(source = 'get_assign_to')
    class Meta:
        model = Task
        fields = ['id','title', 'description', 'assigned_to', 'project', 'status', 'assigned_date', 'completion_date', 'created_at']

class UserProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField(source='get_full_name')
    profile_image = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'full_name', 'profile_image']

    def get_profile_image(self, obj):
        try:
            # Attempt to retrieve the profile picture URL
            if obj.profile.profile_picture:
                return obj.profile.profile_picture.url
        except Profile.DoesNotExist:
            # If Profile does not exist, use the default image
            pass
        # Return default image URL if profile picture is not set or profile doesn't exist
        return '/static/images/profile2.png'
        
