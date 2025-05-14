from django.db import models

# Create your models here.
class JobUser(models.Model):
    current_role = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200) # needs to be hashed and encrypted
    desired_role = models.CharField(max_length=200)

    def _str_(self):
        return self.email

class JobApplication(models.Model):
    YES_OR_NO = [   # yes or no choices 
        ("Y", "Yes"),
        ("N", "No"),
    ]

    JOB_STATUSES = [    # job statuses for job choices
        ("A", "Applied"),
        ("I", "Interviewed"),
        ("R", "Rejected"),
        ("H", "Hired"),
    ]
    jobuser = models.ForeignKey(JobUser, on_delete=models.CASCADE)
    role = models.CharField(max_length=200)
    company = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    date_applied = models.DateField(auto_now=True)
    follow_up = models.CharField(max_length=1, choices=YES_OR_NO)
    resume = models.FileField(upload_to='resume/')   # resume file to be uploaded to /resume
    cover_letter = models.FileField(upload_to='cover-letter/', blank=True, null=True)
    job_status = models.CharField(max_length=1, choices=JOB_STATUSES)

    def _str_(self):
        return self.role 
    
class InterviewNotes(models.Models):
    interview_length = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    notes = models.TextField()    
    