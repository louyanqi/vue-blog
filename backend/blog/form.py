from django import forms
from ckeditor.fields import RichTextFormField


class EditorForm(forms.Form):
    content = RichTextFormField()
