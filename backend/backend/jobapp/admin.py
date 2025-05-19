from django.contrib import admin
from .models import JobUser, JobApplication, InterviewNote
# Register your models here.
admin.site.register(JobUser)
admin.site.register(JobApplication)
admin.site.register(InterviewNote)