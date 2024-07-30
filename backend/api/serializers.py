from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    repassword = serializers.CharField(write_only= True)

    class Meta:
        model = Users
        fields = [ 'username', 'email', 'password', 'repassword']

    def validate(self,data):
        password = data.get('password')
        repassword = data.get('repassword')

        if password != repassword:
            raise serializers.ValidationError("Passwords do not match")
        
        return data
    
    def create(self, validated_data):
        user = Users.objects.create(**validated_data)
        return user
    
class UserloginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length = 50)
    password = serializers.CharField(max_length = 50)

class ProfileSerializers(serializers.ModelSerializer):
    user_id = serializers.IntegerField(write_only = True)

    class Meta:
        model = Profile
        fields = ['user_id', 'first_name', 'last_name', 'gender', 'phone_number', 'address', 'image', 'department', 'position']

    def create(self, validated_data):
        user_id = validated_data.pop('user_id')
        user = Users.objects.get(id=user_id)
        profile = Profile.objects.create(user=user, **validated_data)
        return profile
    
    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.address = validated_data.get('address', instance.address)
        instance.image = validated_data.get('image', instance.image)
        instance.department = validated_data.get('department', instance.department)
        instance.position = validated_data.get('position', instance.position)
        instance.save()
        return instance
    
    def validate_phone_number(self, value):
        if len(value) != 10:
            raise serializers.ValidationError("Phone number should be 10 digits")
        return value
    
    