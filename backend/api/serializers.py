from rest_framework import serializers
from .models import  Profile, Team, Member, Project, Task
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()

        # Create a token for the user using the default Token model
        token, created = Token.objects.get_or_create(user=user)

        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'first_name', 'last_name', 'gender', 'phone_number', 'address', 'image', 'department', 'position']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'created_at']

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['id', 'user', 'team', 'role', 'joined_at']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'team', 'start_date', 'end_date', 'created_at']

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'assigned_to', 'project', 'status', 'assigned_date', 'completion_date', 'created_at']
