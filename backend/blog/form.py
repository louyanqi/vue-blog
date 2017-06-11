from django import forms
from ckeditor.fields import RichTextFormField


class EditorForm(forms.Form):
    content = RichTextFormField()


class FileForm(forms.Form):
    title = forms.CharField(max_length=50)
    file_field = forms.FileField(widget=forms.ClearableFileInput(attrs={'multiple': True}))
