from django import forms
from .models import Article


class UploadForm(forms.ModelForm):

    class Meta:
        model = Article
        fields=['image']