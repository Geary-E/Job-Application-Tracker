from django.urls import path, include
from django.contrib import admin
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from jobapp.views import JobUserView, UserView, SignupView, JobUserDetailView, JobApplicationView, JobApplicationDetailView, InterviewNotesView, InterviewNotesDetailView, UserTemplateView, UserTemplateDetailView, EducationView, EducationDetailView, LoginView, ExperienceView, ExperienceDetailView, SkillView, SkillDetailView, TestLLMView, GenerateResumeView
from . import views 

router = routers.DefaultRouter() # defining router for root api view

urlpatterns = [
    path('', include(router.urls)),
    #path('accounts/', include('django.contrib.auth.urls')), #urls used for authentication - testing
    path('login/', LoginView.as_view(), name="login"), # login view added
    path('userinfo/', UserView.as_view(), name="user-info"), # user info view added - testing 1/24/2026
    path("signup/", SignupView.as_view(), name="signup"),
    path('accounts/', include('django.contrib.auth.urls')),  # authentication urls
    #path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # testing.. testing (1/28/2025)
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('jobusers/', views.JobUserView.as_view(), name='job-users'),
    path('jobusers/<int:pk>/', views.JobUserDetailView.as_view(), name='job-user-detail'),
    path('jobusers/<int:user_pk>/education/', views.EducationView.as_view(), name='job-user-education'), # job user education
    path('jobusers/<int:user_pk>/education/<int:education_pk>/', views.EducationDetailView.as_view(), name='job-user-detail-education'),
    path('jobusers/<int:user_pk>/experience/', views.ExperienceView.as_view(), name='job-user-experience'), # job user experience
    path('jobusers/<int:user_pk>/experience/<int:experience_pk>/', views.ExperienceDetailView.as_view(), name='job-user-detail-experience'),
    path('jobusers/<int:user_pk>/skills/', views.SkillView.as_view(), name='job-user-skills'),
    path('jobusers/<int:user_pk>/skills/<int:skill_pk>/', views.SkillDetailView.as_view(), name='job-user-detail-skills'),
    path('jobapplications/', views.JobApplicationView.as_view(), name='job-applications'),
    path('jobapplications/<int:pk>/', views.JobApplicationDetailView.as_view(), name='job-application-detail'),
    path('interview_notes/', views.InterviewNotesView.as_view(), name='interview-notes'),
    path('interview_notes/<int:pk>/', views.InterviewNotesDetailView.as_view(), name='interview-notes-detail'),
    path('user_templates/', views.UserTemplateView.as_view(), name='user-template-view'),
    path('user_templates/<int:pk>/', views.UserTemplateDetailView.as_view(), name='user-template-detail-view'),
    path('generated_resume/', views.GenerateResumeView.as_view(), name='generated-resume'),
    path("test-llm/", TestLLMView.as_view(), name="test-llm"),  # testing testing testing
]
