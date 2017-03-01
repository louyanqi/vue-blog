from django.shortcuts import render
from .form import UploadForm
from django.http import HttpResponse


def image_upload(request):
    print(request.FILES)
    print('#'*65)
    print(request.POST)
    form = UploadForm(request.POST, request.FILES)
    if form.is_valid():
        instance = form.save()
        instance.save()
    return HttpResponse('upload')
