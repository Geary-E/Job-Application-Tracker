from django.contrib.auth.models import Group, User
from rest_framework import serializers
from jobapp.models import JobUser, Education, Experience, Skill, JobApplication, InterviewNote, UserTemplate


class JobUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobUser
        fields = ['id', 'current_role', 'email', 'password', 'desired_role']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'education', 'degree_field', 'is_graduated', 'school', 'graduation_month', 'graduation_year']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'field', 'company', 'years_of_experience', 'responsibilites']                

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['id', 'job_status', 'role', 'company', 'location', 'date_applied']

class InterviewNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewNote
        fields = ['id', 'interview_length', 'location', 'notes', 'created_at']

class UserTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTemplate 
        fields = ['id', 'title', 'is_resume', 'content', 'liked', 'created_at']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category']                              