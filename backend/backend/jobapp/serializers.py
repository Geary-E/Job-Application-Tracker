from django.contrib.auth.models import Group, User
from django.contrib.auth import get_user_model
from rest_framework import serializers
from jobapp.models import JobUser, Education, Experience, Skill, JobApplication, InterviewNote, UserTemplate


class JobUserSerializer(serializers.ModelSerializer):
    #user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = JobUser
        fields = ['id', 'user', 'current_role', 'desired_role']  # first name and last name added for testing (3/24/2026)

User = get_user_model()

class SignupSerializer(serializers.Serializer):  # test: using ChatGPT
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=100)  # testing...testing...testing(3/24/2026)
    last_name = serializers.CharField(max_length=100)   # testing...testing...testing(3/24/2026)
    password = serializers.CharField(write_only=True)
    current_role = serializers.CharField(max_length=200)
    desired_role = serializers.CharField(max_length=200)

    def create(self, validated_data):
        email = validated_data["email"].lower().strip()
        password = validated_data["password"]
        first_name = validated_data["first_name"] # testing..testing..testing(3/24/2026)
        last_name = validated_data["last_name"] # testing..testing..testing(3/24/2026)

        user = User.objects.create_user(
            username=email,   # default Django User needs username
            first_name=first_name,  # testing..testing..testing(3/24/2026)
            last_name=last_name,   # testing..testing..testing(3/24/2026)
            email=email,
            password=password
        )

        job_user = JobUser.objects.create(
            user=user,
            current_role=validated_data["current_role"],
            desired_role=validated_data["desired_role"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"]
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
        fields = ['id', 'position', 'company', 'city', 'state', 'date_started', 'date_ended', 'years_of_experience', 'responsibilites']                

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ['id', 'jobuser', 'job_status', 'role', 'company', 'location', 'date_applied']  # testing: 4/9/2026 added job_user field for testing 

class InterviewNoteSerializer(serializers.ModelSerializer):
    job_application = JobApplicationSerializer()

    class Meta:
        model = InterviewNote
        fields = ['id', 'job_application', 'date_and_time', 'interview_length', 'location', 'notes', 'created_at', 'interview_type', 'interview_outcome']

class UserTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTemplate 
        fields = ['id', 'title', 'is_resume', 'content', 'liked', 'created_at']

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name', 'category']                              