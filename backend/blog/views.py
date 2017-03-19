from django.shortcuts import render, render_to_response
from .form import EditorForm
from .models import Comment
from django.core.mail import send_mail


def test(request):
    comment_list = Comment.objects.all()
    print('#'*65)
    send_mail('主题', '回复内容', '778617402@qq.com', ['lyq778617402@163.com'])
    print('#'*65)
    context = {
        'comment_list': comment_list
    }
    return render(request, 'test.html', context)


def page_not_found(request):
    return render_to_response('404.html')


def page_error(request):
    return render_to_response('500.html')


def manage(request):
    form = EditorForm
    return render(request, 'manage.html', {'form': form})


