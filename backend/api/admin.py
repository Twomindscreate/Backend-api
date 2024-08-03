from django.contrib import admin
from .models import CustomUser, Profile, Team, Member, Project, Task

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ( 'username', 'email', 'password')

admin.site.register(Profile)
@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ( 'name', 'description')
@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ( 'user', 'team', 'role')
admin.site.register(Project)
admin.site.register(Task)