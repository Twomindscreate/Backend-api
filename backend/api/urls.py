from django.urls import path
from . import views

urlpatterns = [
    
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),

    path('profile/', views.create_profile, name='create_profile'),
    path('profile/', views.get_profile, name='get_profile'),
    path('profile/<int:pk>/', views.update_profile, name='update_profile'),
    
    path('teams/', views.team_list_create, name='team_list_create'),
    path('teams/<int:pk>/', views.team_detail, name='team_detail'),
    
    path('members/', views.member_list_create, name='member_list_create'),
    path('members/<int:pk>/', views.member_detail, name='member_detail'),
    
    path('projects/', views.project_list_create, name='project_list_create'),
    path('projects/<int:pk>/', views.project_detail, name='project_detail'),
    
    path('tasks/', views.task_list_create, name='task_list_create'),
    path('tasks/<int:pk>/', views.task_detail, name='task_detail'),

]


