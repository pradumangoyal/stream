from django.db import models
from .validations import FileValidator
# Create your models here.


def user_path(instance):
    return 'profile/{}.png'.format(instance.user.username)


class Image(models.Model):
    description = models.CharField(max_length=255, blank=True)
    image = models.FileField(upload_to=user_path, validators=[FileValidator])
