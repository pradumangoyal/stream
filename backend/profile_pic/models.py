from django.db import models
from .validations import FileValidator
# Create your models here.


def user_path(self, request):
    return 'profile/{}.png'.format(request.user.username)


class Image(models.Model):
    description = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to=user_path)
