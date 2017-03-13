from django.shortcuts import render
from .form import EditorForm
from django.http import HttpResponse


def test(request):

    return render(request, 'test.html', {'test': 'adsada'})


def manage(request):
    form = EditorForm
    return render(request, 'manage.html', {'form': form})
