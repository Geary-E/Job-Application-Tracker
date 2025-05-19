from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework.views import APIView 
from .models import JobUser, JobApplication, InterviewNote 
from .serializers import JobUserSerializer, JobApplicationSerializer, InterviewNoteSerializer


# Create your views here.

def home(request):
    return HttpResponse("Welcome to the Job Application Tracker!")

class JobUserView(APIView):

    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

    def get_queryset(self):
        return JobUser.objects.all()

    # GET Request for Job User
    def get(self, request, format=None):
        users = self.get_queryset()
        serializer = JobUserSerializer(users, many=True)
        return Response(serializer.data)

    # POST request for Job user
    def post(self, request, format=None):
        serializer = JobUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

class JobUserDetailView(APIView):

    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

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


class JobApplicationView(APIView):

    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

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

    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

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


class InterviewNotesView(APIView):

    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

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

    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

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