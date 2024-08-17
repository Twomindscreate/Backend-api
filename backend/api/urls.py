from unicodedata import name
from django.urls import path
from . import views
from .views import (
        RegisterView, 
        VerifyUserEmail,
        LoginUserView, 
        TestingAuthenticatedReq, 
        PasswordResetConfirm, 
        PasswordResetRequestView,SetNewPasswordView, LogoutApiView,ProfileView
        )
from rest_framework_simplejwt.views import (TokenRefreshView,)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-email/', VerifyUserEmail.as_view(), name='verify'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', LoginUserView.as_view(), name='login-user'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('get-something/', TestingAuthenticatedReq.as_view(), name='just-for-testing'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset-confirm/<uidb64>/<token>/', PasswordResetConfirm.as_view(), name='reset-password-confirm'),
    path('set-new-password/', SetNewPasswordView.as_view(), name='set-new-password'),
    path('logout/', LogoutApiView.as_view(), name='logout'),
    
    path('teams/', views.team_list_create, name='team_list_create'),
    path('teams/<int:pk>/', views.team_detail, name='team_detail'),
    
    path('members/', views.member_list_create, name='member_list_create'),
    path('members/<int:pk>/', views.member_detail, name='member_detail'),
    
    path('projects/', views.project_list_create, name='project_list_create'),
    path('projects/<int:pk>/', views.project_detail, name='project_detail'),
    
    path('tasks/', views.task_list_create, name='task_list_create'),
    path('tasks/<int:pk>/', views.task_detail, name='task_detail'),
    ]

