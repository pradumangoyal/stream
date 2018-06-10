from django.db import models
from django.contrib.auth.models import User

class Image(models.Model):
    image = models.ImageField(upload_to='profile/')
    user = models.CharField(max_length=150)
