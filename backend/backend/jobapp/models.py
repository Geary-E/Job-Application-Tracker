from django.db import models
import calendar

# Create your models here.
class JobUser(models.Model):
    first_name = models.CharField(max_length=100, default='John') # first name for user
    last_name = models.CharField(max_length=100, default='Doe') # last name for user
    current_role = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200) # needs to be hashed and encrypted
    desired_role = models.CharField(max_length=200)

    def _str_(self):
        return self.email

class Education(models.Model):
    EDUCATION_LEVELS = [
        ("HS", "High School Diploma"),
        ("AS", "Associate's Degree"),
        ("B", "Bachelor's Degree"),
        ("M", "Master's Degree"),
    ]
    GRADUATED = [
        ("Y", "Yes"),
        ("N", "No")
    ]

    jobuser = models.ForeignKey(JobUser, on_delete=models.CASCADE, related_name='educations')
    education = models.CharField(max_length=2, choices=EDUCATION_LEVELS)
    degree_field = models.CharField(max_length=200)
    is_graduated = models.CharField(max_length=1, choices=GRADUATED)
    school = models.CharField(max_length=200) # school they graduated from
    graduation_month = models.IntegerField(choices=[(i, calendar.month_name[i]) for i in range(1, 13)])
    graduation_year = models.IntegerField()

    def _str_(self):
        return self.degree_field

class Experience(models.Model):
    jobuser = models.ForeignKey(JobUser, on_delete=models.CASCADE, related_name='experiences')
    position = models.CharField(max_length=200) # job field
    company = models.CharField(max_length=100)
    years_of_experience = models.IntegerField()
    responsibilities = models.TextField()

    def _str_(self):
        return self.field 




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
    
class InterviewNote(models.Model):
    interview_length = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    notes = models.TextField()    
    created_at = models.DateTimeField(auto_now=True)  # new addition
    updated_at = models.DateTimeField(auto_now_add=True) # new addition 2

class Skill(models.Model):
    CATEGORIES = {
        ("technical", "Technical Skill"),
        ("soft", "Soft Skill"),
        ("tool", "Tools"),
        ("language", "Languages")
    }
    jobuser = models.ForeignKey(JobUser, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=30)    
    category = models.CharField(max_length=20, choices=CATEGORIES)

    def _str_(self):
        return self.name 




# Model for Generating resume/cover letter based on user
class UserTemplate(models.Model):
    user = models.ForeignKey(JobUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    is_resume = models.BooleanField(default=True)
    content = models.TextField()
    liked = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def _str_(self):
        return self.title     