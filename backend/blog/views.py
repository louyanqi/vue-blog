from django.shortcuts import render, render_to_response
from .form import EditorForm, FileForm
from .models import FileManage, Article
from django.http import HttpResponse
from django.shortcuts import render_to_response


def home(request):

    return render(request, 'home.html', {})


def manage_file(request):
    if request.method == 'POST':
        form = FileForm(request.POST, request.FILES)
        if form.is_valid():
            title = form.cleaned_data['title']
            file = form.cleaned_data['file_field']
            file_manage = FileManage()
            file_manage.title = title
            file_manage.file = file
            file_manage.save()
            return HttpResponse('upload finish!')
    else:
        form = FileForm()
    file_list = FileManage.objects.all()
    context = {
        'file_list': file_list,
        'form': form
    }
    return render(request, 'test.html', context)


def page_not_found(request):
    return render_to_response('404.html')


def page_error(request):
    return render_to_response('500.html')


def manage(request):
    form = EditorForm
    return render(request, 'manage.html', {'form': form})


