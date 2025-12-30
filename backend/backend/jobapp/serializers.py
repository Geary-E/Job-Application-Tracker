from django.contrib.auth.models import Group, User
from django.contrib.auth import get_user_model
from rest_framework import serializers
from jobapp.models import JobUser, Education, Experience, Skill, JobApplication, InterviewNote, UserTemplate


class JobUserSerializer(serializers.ModelSerializer):
    #user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = JobUser
        fields = ['id', 'current_role', 'desired_role']  #email, first name, last name and password are excluded for security reasons

User = get_user_model()

class SignupSerializer(serializers.Serializer):  # test: using ChatGPT
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    current_role = serializers.CharField(max_length=200)
    desired_role = serializers.CharField(max_length=200)

    def create(self, validated_data):
        email = validated_data["email"].lower().strip()
        password = validated_data["password"]

        user = User.objects.create_user(
            username=email,   # default Django User needs username
            email=email,
            password=password
        )

        job_user = JobUser.objects.create(
            user=user,
            current_role=validated_data["current_role"],
            desired_role=validated_data["desired_role"],
        )
        return job_user

# Test - Using ChatGPT                 

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'education', 'degree_field', 'is_graduated', 'school', 'graduation_month', 'graduation_year']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['id', 'position', 'company', 'years_of_experience', 'responsibilites']                

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