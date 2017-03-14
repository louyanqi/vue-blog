from django.shortcuts import render
from .form import EditorForm
from .models import Comment


def test(request):
    comment_list = Comment.objects.all()
    print(comment_list)
    context = {
        'comment_list': comment_list
    }
    return render(request, 'test.html', context)


def manage(request):
    form = EditorForm
    return render(request, 'manage.html', {'form': form})


