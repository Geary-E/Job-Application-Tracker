from django.contrib import admin
from .models import JobUser, Education, Experience, JobApplication, InterviewNote, UserTemplate, Skill
# Register your models here.
admin.site.register(JobUser)
admin.site.register(Education)
admin.site.register(Experience)
admin.site.register(Skill)
admin.site.register(JobApplication)
admin.site.register(InterviewNote)
admin.site.register(UserTemplate)