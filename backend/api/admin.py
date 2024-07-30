from django.contrib import admin
from .models import Users, Profile, Team, Member, Project, Task

admin.site.register(Users)
admin.site.register(Profile)
admin.site.register(Team)
admin.site.register(Member)
admin.site.register(Project)
admin.site.register(Task)
