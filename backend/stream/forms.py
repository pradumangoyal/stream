from django import forms
from . import Image


class ImageForm(forms.ModelForm):
    class Meta:
        model = Image
        fields = ('image', 'username', )
