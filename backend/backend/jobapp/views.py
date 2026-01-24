from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly, AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication  # testing...testing..testing(12/3/2025)
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView 
from openai import OpenAI  # testing: 1/2/
from decouple import config
from .models import JobUser, JobApplication, InterviewNote, UserTemplate, Education, Experience, Skill
from .serializers import JobUserSerializer, SignupSerializer, JobApplicationSerializer, InterviewNoteSerializer, UserTemplateSerializer, EducationSerializer, ExperienceSerializer, SkillSerializer


# Create your views here.

#Sign up view here...
class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        job_user = serializer.save()
        user = job_user.user

        # Optional: auto-login by returning tokens
        refresh = RefreshToken.for_user(user)

        return Response({
            "job_user": JobUserSerializer(job_user).data,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=status.HTTP_201_CREATED)

# Login view here...
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"detail": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

        # use user_obj.username (not user.username)
        user = authenticate(request, username=user_obj.username, password=password)

        if user is None:
            return Response({"detail": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "message": "Login successful"
        }, status=status.HTTP_200_OK)
# Login view end...

def home(request):
    return HttpResponse("Welcome to the Job Application Tracker!")

class UserView(APIView):  # testing code 1/24/2026
    permission_classes = [IsAuthenticated] # testing

    def get(self, request):
        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email,
            "password": request.user.password
        })
 # End of user view testing code 1/24/2026       

class JobUserView(APIView):

   # permission_classes = [DjangoModelPermissionsOrAnonReadOnly] - Testing

    permission_classes = [AllowAny] # testing
    def get_queryset(self):
        return JobUser.objects.all()

    # GET Request for Job User
    def get(self, request, format=None):
        users = self.get_queryset()
        serializer = JobUserSerializer(users, many=True)
        return Response(serializer.data)

    

class JobUserDetailView(APIView):

  #  permission_classes = [DjangoModelPermissionsOrAnonReadOnly] - Testing

    def get_queryset(self):
        return JobUser.objects.all()

    # GET request for a singular object
    def get(self, request, pk, format=None):
        job_user = get_object_or_404(self.get_queryset(), id=pk)
        serializer = JobUserSerializer(job_user)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        job_user = get_object_or_404(JobUser, id=pk)
        serializer = JobUserSerializer(job_user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


    def patch(self, request, pk, format=None):
        job_user = get_object_or_404(JobUser, id=pk)
        serializer = JobUserSerializer(job_user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        job_user = get_object_or_404(JobUser, id=pk)
        job_user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)     

class EducationView(APIView):
   # permission_classes = [DjangoModelPermissionsOrAnonReadOnly] - Testing

    def get_queryset(self, user_pk=None):
        if user_pk is not None:
            return Education.objects.filter(jobuser__pk=user_pk)
        return Education.objects.all()

    def get(self, request, user_pk=None, format=None):
        educations = self.get_queryset(user_pk)
        serializer = EducationSerializer(educations, many=True)
        return Response(serializer.data)

    def post(self, request, user_pk=None, format=None):
        serializer = EducationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EducationDetailView(APIView):

   # permission_classes = [DjangoModelPermissionsOrAnonReadOnly]  - Testing

    def get_object(self, user_pk, education_pk):
        return get_object_or_404(Education, id=education_pk, jobuser__pk=user_pk)

    def get(self, request, user_pk, education_pk, format=None):
        education = self.get_object(user_pk, education_pk)
        serializer = EducationSerializer(education)
        return Response(serializer.data)

    def put(self, request, user_pk, education_pk, format=None):
        education = self.get_object(user_pk, education_pk)
        serializer = EducationSerializer(education, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


    def patch(self, request, user_pk, education_pk, format=None):
        education = self.get_object(user_pk, education_pk)
        serializer = EducationSerializer(education, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_pk, education_pk, format=None):
        education = self.get_object(user_pk, education_pk) 
        education.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 


class JobApplicationView(APIView):

   # permission_classes = [DjangoModelPermissionsOrAnonReadOnly] - Testing

    def get_queryset(self):
        return JobApplication.objects.all()

    # GET Request for Job application
    def get(self, request, format=None):
        applications = self.get_queryset()
        serializer = JobApplicationSerializer(applications, many=True)
        return Response(serializer.data)
    # POST request for Job application
    def post(self, request, format=None):
        serializer = JobApplicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


class JobApplicationDetailView(APIView):

   # permission_classes = [DjangoModelPermissionsOrAnonReadOnly] - Testing

    def get_queryset(self):
        return JobApplication.objects.all()

    def get(self, request, pk, format=None):
        job_application = get_object_or_404(self.get_queryset(), id=pk) 
        serializer = JobApplicationSerializer(job_application)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        job_application = get_object_or_404(JobApplication, id=pk) 
        serializer = JobApplicationSerializer(job_application, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


    def patch(self, request, pk, format=None):
        job_application = get_object_or_404(JobApplication, id=pk) 
        serializer = JobApplicationSerializer(job_application, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        job_application = get_object_or_404(JobApplication, id=pk) 
        job_application.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 

class ExperienceView(APIView):

   # permission_classes = [DjangoModelPermissionsOrAnonReadOnly] - Testing

    def get_queryset(self, user_pk=None):
        if user_pk is not None:
            return Experience.objects.filter(jobuser__pk=user_pk)
        return Experience.objects.all()

    def get(self, request, user_pk=None, format=None):
        experiences = self.get_queryset(user_pk)
        serializer = ExperienceSerializer(experiences, many=True)
        return Response(serializer.data)

    def post(self, request, user_pk=None, format=None):
        serializer = ExperienceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExperienceDetailView(APIView):

   # permission_classes = [DjangoModelPermissionsOrAnonReadOnly] - Testing

    def get_object(self, user_pk, experience_pk):
        return get_object_or_404(Experience, id=experience_pk, jobuser__pk=user_pk)

    def get(self, request, user_pk, experience_pk, format=None):
        experience = self.get_object(user_pk, experience_pk)
        serializer = ExperienceSerializer(experience)
        return Response(serializer.data)

    def put(self, request, user_pk, experience_pk, format=None):
        experience = self.get_object(user_pk, experience_pk)
        serializer = ExperienceSerializer(experience, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


    def patch(self, request, user_pk, experience_pk, format=None):
        experience = self.get_object(user_pk, experience_pk)
        serializer = ExperienceSerializer(experience, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_pk, experience_pk, format=None):
        experience = self.get_object(user_pk, experience_pk) 
        experience.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class SkillView(APIView):

    #permission_classes = [DjangoModelPermissionsOrAnonReadOnly] - Testing

    def get_queryset(self, user_pk=None):
        if user_pk is not None:
            return Skill.objects.filter(jobuser__pk=user_pk)
        return Skill.objects.all()

    def get(self, request, user_pk=None, format=None):
        skills = self.get_queryset(user_pk)
        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data)

    def post(self, request, user_pk=None, format=None):
        serializer = SkillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        

class SkillDetailView(APIView):

    #permission_classes = [DjangoModelPermissionsOrAnonReadOnly]  - Testing

    def get_object(self, user_pk, skill_pk):
        return get_object_or_404(Skill, id=skill_pk, jobuser__pk=user_pk)

    def get(self, request, user_pk, skill_pk, format=None):
        skill = self.get_object(user_pk, skill_pk)
        serializer = SkillSerializer(skill)
        return Response(serializer.data)

    def put(self, request, user_pk, skill_pk, format=None):
        skill = self.get_object(user_pk, skill_pk)
        serializer = SkillSerializer(skill, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


    def patch(self, request, user_pk, skill_pk, format=None):
        skill = self.get_object(user_pk, skill_pk)
        serializer = SkillSerializer(skill, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_pk, skill_pk, format=None):
        skill = self.get_object(user_pk, skill_pk) 
        skill.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)         


class InterviewNotesView(APIView):

    #permission_classes = [DjangoModelPermissionsOrAnonReadOnly]- Testing

    def get_queryset(self):
        return InterviewNote.objects.all()

    # GET Request for Interview Notes
    def get(self, request, format=None):
        interview_notes = self.get_queryset()
        serializer = InterviewNoteSerializer(interview_notes, many=True)
        return Response(serializer.data)
    # POST request for Interview Notes
    def post(self, request, format=None):
        serializer = InterviewNoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

class InterviewNotesDetailView(APIView):

   # permission_classes = [DjangoModelPermissionsOrAnonReadOnly] - Testing

    def get_queryset(self):
        return InterviewNote.objects.all()
    
    def get(self, request, pk, format=None):
        interview_note = get_object_or_404(self.get_queryset(), id=pk)
        serializer = InterviewNoteSerializer(interview_note)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        interview_note = get_object_or_404(InterviewNote, id=pk)
        serializer = InterviewNoteSerializer(interview_note, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

    def patch(self, request, pk, format=None):
        interview_note = get_object_or_404(InterviewNote, id=pk)
        serializer = InterviewNoteSerializer(interview_note, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        interview_note = get_object_or_404(InterviewNote, id=pk)
        interview_note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)  

class UserTemplateView(APIView):
    #permission_classes = [DjangoModelPermissionsOrAnonReadOnly] - Testing

    def get_queryset(self):
        return UserTemplate.objects.all()

    # GET request
    def get(self, request, format=None):
        templates = self.get_queryset()
        serializer = UserTemplateSerializer(templates, many=True)
        return Response(serializer.data)

    # POST request
    def post(self, request, format=None):
        serializer = UserTemplateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserTemplateDetailView(APIView):
    #permission_classes = [DjangoModelPermissionsOrAnonReadOnly] - Testing

    def get_queryset(self):
        return UserTemplate.objects.all()

    def get(self, request, pk, format=None):
        template = get_object_or_404(self.get_queryset(), id=pk)
        serializer = UserTemplateSerializer(template)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        template = get_object_or_404(UserTemplate, id=pk)
        serializer = InterviewNoteSerializer(template, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

    def patch(self, request, pk, format=None):
        template = get_object_or_404(UserTemplate, id=pk)
        serializer = InterviewNoteSerializer(template, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        template = get_object_or_404(UserTemplate, id=pk)
        template.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)      

# Function for collecting data and sending to an LLM: Step 1: Aggregate User data
def collect_user_data(user_id):
    try:
        user = JobUser.objects.get(id=user_id)
        education = user.educations.all()
        skills = user.skills.all()
        experiences = user.experiences.all()

        return {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "education": list(education.values()),
            "experiences": list(experiences.values()),
            "skills": list(skills.values()),
        }
    except JobUser.DoesNotExist:
        raise Http404("Not found")

def generate_resume_prompt(user_data):  #function that generates resume prompt in LLM
    education_str = "\n".join(
        [f" - {edu['education']} from {edu['school']} ({edu.get('graduation_year', 'n/a')})"
        for edu in user_data.get("educations", [])]
    )

    experience_str = "\n".join(
        [f" - {exp['position']} at {exp['company']} for {exp['years_of_experience']} years. Description of work: {exp['responsibilities']}"
        for exp in user_data.get("experiences", [])]
    )

    skills_str = "\n".join(
        [f" Skill Name: {skill['name']} Skill Category: {skill['category']}"
        for skill in user_data.get("skills", [])]
    )

    prompt = f"""
    Write a professional resume for the following individual:
    Name: {user_data['first_name']} {user_data['last_name']}
    Education: {education_str}
    Experience: {experience_str}
    Skills: {skills_str}
    Format it like a standard resume with Education, Experience, and Skills as the headers for it.
    """

    return prompt.strip()

def send_to_llm(prompt):        # testing

    api_key = config('OPENAI_API_KEY')

    client = OpenAI(api_key=api_key)   # object instance of OpenAI

    response = client.chat.completions.create(
        model="gpt-4.1",
        messages =[{"role": "system", "content": "You are a helpful assistant that writes professional resumes."},
        {"role": "user", "content": prompt}],
        max_tokens = 1000, # 1000 tokens
        temperature=0.6
    )
    return response.choices[0].message.content

def save_resume_data(user_id):

    try:
        user = JobUser.objects.get(id=user_id)
        user_data = collect_user_data(user_id)
        prompt = generate_resume_prompt(user_data)

        try:
            generated_content = send_to_llm(prompt)
        except Exception as e:
            raise Exception("Failed to generate resume " + str(e))

        # Creation of Usertemplate object    
        template = UserTemplate.objects.create(
            user = user,
            title = f" Resume for {user.first_name} {user.last_name}",
            is_resume = True,
            content = generated_content,
            liked = True,
        )
    except JobUser.DoesNotExist:
        raise Http404("User Not found")

class GenerateResumeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        user = request.user 
        try:
            save_resume_data(user.id)
            return Response({"message": "Resume data saved successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TestLLMView(APIView):     # testing testing testing view

    permission_classes = [AllowAny]
    def get(self, request, format=None):
        sample_prompt = "Write a professional resume for John Doe with a Computer Science degree from Harvard."
        try:
            response = send_to_llm(sample_prompt)
            return Response({"result": response}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




