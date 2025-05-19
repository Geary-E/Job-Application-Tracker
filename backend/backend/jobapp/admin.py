from django.contrib import admin
from .models import JobUser, JobApplication, InterviewNote, UserTemplate
# Register your models here.
admin.site.register(JobUser)
admin.site.register(JobApplication)
admin.site.register(InterviewNote)
admin.site.register(UserTemplate)