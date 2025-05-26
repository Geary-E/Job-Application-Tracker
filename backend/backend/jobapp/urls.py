from django.urls import path, include
from django.contrib import admin
from rest_framework import routers
from jobapp.views import JobUserView, JobUserDetailView, JobApplicationView, JobApplicationDetailView, InterviewNotesView, InterviewNotesDetailView, UserTemplateView, UserTemplateDetailView, EducationView, EducationDetailView, ExperienceView, ExperienceDetailView, SkillView, SkillDetailView
from . import views 

router = routers.DefaultRouter() # defining router for root api view

urlpatterns = [
    path('', include(router.urls)),
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
]
