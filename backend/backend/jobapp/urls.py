from django.urls import path, include
from django.contrib import admin
from rest_framework import routers
from jobapp.views import JobUserView, JobUserDetailView, JobApplicationView, JobApplicationDetailView, InterviewNotesView, InterviewNotesDetailView, UserTemplateView, UserTemplateDetailView
from . import views 

router = routers.DefaultRouter() # defining router for root api view

urlpatterns = [
    path('', include(router.urls)),
    path('jobusers/', views.JobUserView.as_view(), name='job-users'),
    path('jobusers/<int:pk>/', views.JobUserDetailView.as_view(), name='job-user-detail'),
    path('jobapplications/', views.JobApplicationView.as_view(), name='job-applications'),
    path('jobapplications/<int:pk>/', views.JobApplicationDetailView.as_view(), name='job-application-detail'),
    path('interview_notes/', views.InterviewNotesView.as_view(), name='interview-notes'),
    path('interview_notes/<int:pk>/', views.InterviewNotesDetailView.as_view(), name='interview-notes-detail'),
    path('user_templates/', views.UserTemplateView.as_view(), name='user-template-view'),
    path('user_templates/<int:pk>/', views.UserTemplateDetailView.as_view(), name='user-template-detail-view'),
]
