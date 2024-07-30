from rest_framework import serializers
from .models import CustomUser, Profile, Team, Member, Project, Task

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'repassword']
        extra_kwargs = {
            'password': {'write_only': True},
            'repassword': {'write_only': True}
        }

    def create(self, validated_data):
        # Remove repassword before creating user
        repassword = validated_data.pop('repassword', None)
        if validated_data['password'] != repassword:
            raise serializers.ValidationError({"repassword": "Passwords must match"})
        user = CustomUser(**validated_data)
        user.save()
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'first_name', 'last_name', 'gender', 'phone_number', 'address', 'image', 'department', 'position']

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = [ 'name', 'description', 'created_at']

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = ['user', 'team', 'role', 'joined_at']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [ 'name', 'description', 'team', 'start_date', 'end_date', 'created_at']

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'description', 'assigned_to', 'project', 'status', 'assigned_date', 'completion_date', 'created_at']