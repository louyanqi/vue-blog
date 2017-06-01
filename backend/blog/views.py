from django.shortcuts import render, render_to_response
from .form import EditorForm
from .models import Article
import re


def test(request):
    article_info = Article.objects.get(id=29)
    content = article_info.content

    content_text1 = content.replace('<p>', '').replace('</p>', '').replace('&#39;', '')
    # 去掉图片链接
    content_text2 = re.sub('!\[\]\((.*?)\)', '', content_text1)
    # 去掉markdown标签
    pattern = '[\\\`\*\_\[\]\#\+\-\!\>]'
    content_text3 = re.sub(pattern, '', content_text2)
    article_info.abstract = content_text3[:150]
    print(article_info.abstract)
    article_info.save()
    return render(request, 'test.html', {'content': content_text3})


def page_not_found(request):
    return render_to_response('404.html')


def page_error(request):
    return render_to_response('500.html')


def manage(request):
    form = EditorForm
    return render(request, 'manage.html', {'form': form})


