from django.contrib import admin
from .models import User, OneTimePassword, Profile, Team, Member, Project, Task

admin.site.register(User)
admin.site.register(OneTimePassword)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        'user', 'username', 'phone_number', 'address', 'gender',
        'occupation', 'department', 'role', 'birth_date', 'profile_picture'
    )
    search_fields = ('email', 'username', 'phone_number')
    list_filter = ('gender', 'occupation', 'department', 'role')
@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ( 'name', 'description')
@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ( 'user', 'team', 'role')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ( 'name', 'description', 'team', 'start_date', 'end_date', 'created_at')

admin.site.register(Task)