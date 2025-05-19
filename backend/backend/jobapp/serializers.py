from django.contrib.auth.models import Group, User
from rest_framework import serializers
from jobapp.models import JobUser, JobApplication, InterviewNote


class JobUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobUser
        fields = ['id', 'current_role', 'email', 'password', 'desired_role']

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['id', 'job_status', 'role', 'company', 'location', 'date_applied']

class InterviewNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewNote
        fields = ['id', 'interview_length', 'location', 'notes', 'created_at']              