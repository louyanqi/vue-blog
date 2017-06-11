from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from .serializers import ArticleSerializer, CommentSerializer, TagSerializer,\
    ArchiveArticleSerializer, ArticleDetailSerializer
from rest_framework.decorators import api_view, authentication_classes
from blog.models import Article, Comment, Tag, ViewInfo
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .serializers import UserLoginSerializer
from rest_framework.authtoken.models import Token
from .paginator import get_page_list
from django.core.paginator import Paginator
from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from .img_url import url_list
import random
import re


@api_view(['GET'])
def change_img(request):
    if request.method == 'GET':
        url = random.choice(url_list)
        return Response({'img_url': url}, status=status.HTTP_200_OK)


# 首页文章列表
@api_view(['GET', 'POST'])
def article(request):
    if request.method == 'GET':
        page = request.GET.get('page')
        article_list = Article.objects.all()
        num_pages = Paginator(article_list, 7).num_pages
        next_list = True
        pre_list = True
        if page:
            start = (int(page)-1)*7
            page = int(request.GET.get('page'))
        else:
            start = 0
            page = 1

        if page == 1:
            pre_list = False
        elif page == num_pages:
            next_list = False

        page_list = get_page_list(current_page=int(page), left=2, right=3, page_number=num_pages)

        article_list = Article.objects.all().order_by('-id')[start: start+7]
        serializer = ArticleSerializer(article_list, many=True)

        # 得到访问首页用户的ip
        if 'HTTP_X_FORWARDED_FOR' in request.META:
            ip = request.META['HTTP_X_FORWARDED_FOR']
        else:
            ip = request.META['REMOTE_ADDR']
        view_info = ViewInfo(view_ip=ip)
        view_info.save()

        data = {
            'data': serializer.data,
            'page_list': page_list,
            'now_page': page,
            'next_list': next_list,
            'pre_list': pre_list
        }
        return Response(data, status=status.HTTP_200_OK)


# 首页随机文章
@api_view(['GET'])
def random_article(request):
    if request.method == 'GET':
        article_list = Article.objects.all().order_by('?')[1:7]
        serializer = ArchiveArticleSerializer(article_list, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def article_admin(request):
    if request.method == 'GET':
        tag_id = request.GET.get('tag')

        if tag_id and tag_id != 'undefined':
            article_list = Article.objects.all().filter(tag__id=int(tag_id)).order_by('-id')
            tag_info = Tag.objects.get(id=int(tag_id))
            serializer = ArticleSerializer(article_list, many=True)
            tag_serializer = TagSerializer(tag_info)
            data = {
                'article_data': serializer.data,
                'tag_data': tag_serializer.data
            }
            return Response(data, status=status.HTTP_200_OK)
        else:
            article_list = Article.objects.all().order_by('-id')
            serializer = ArticleSerializer(article_list, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        data = request.data
        title = data.get('title')
        content = data.get('content')
        # 取出内容中markdown的图片地址作为首页图片
        img_url = re.search('!\[]\((.*?)\)', content)
        if not img_url:
            img_url = ''
        else:
            img_url = img_url.group(1)
        art = Article(title=title, content=content, url_img=img_url)
        art.save()
        return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def archive_article(request):
    if request.method == 'GET':
        archive_article_list = Article.objects.all().order_by('-id')
        serializer = ArchiveArticleSerializer(archive_article_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def article_detail(request, article_id):
    article_info = get_object_or_404(Article, id=article_id)
    if request.method == 'GET':
        try:
            next_article = article_info.get_previous_by_create_time()
        except Article.DoesNotExist:
            next_article = Article(id=article_id, title="没有了")
        try:
            pre_article = article_info.get_next_by_create_time()
        except Article.DoesNotExist:
            pre_article = Article(id=article_id, title="没有了")
        serializer = ArticleDetailSerializer(article_info)

        data = {
            'data': serializer.data,
            'pre_id': pre_article.id,
            'pre_title': pre_article.title,
            'next_id': next_article.id,
            'next_title': next_article.title,
        }

        return Response(data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def article_detail_admin(request, article_id):
    article_info = get_object_or_404(Article, id=article_id)
    if request.method == "GET":
        serializer = ArticleDetailSerializer(article_info)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        data = request.data
        tag_id_list = data.get('tags_id')
        tag_id = data.get('tag_id')
        if tag_id:
            tag_info = Tag.objects.get(id=tag_id)
            article_info.tag.remove(tag_info)
            return Response(status=status.HTTP_200_OK)
        if tag_id_list:
            for tag_id in tag_id_list:
                if int(article_info.tag.count()) >= 5:
                    return Response(status=status.HTTP_400_BAD_REQUEST)
                else:
                    new_tag = Tag.objects.get(id=tag_id)
                    article_info.tag.add(new_tag)
                    article_info.save()
            return Response(status=status.HTTP_200_OK)
    if request.method == 'PUT':
        data = request.data
        id = data.get('id')
        title = data.get('title')
        content = data.get('content')
        # 取出内容中markdown的图片地址作为首页图片
        img_url = re.search('!\[]\((.*?)\)', content)
        if not img_url:
            img_url = ''
        else:
            img_url = img_url.group(1)
        article_info = Article.objects.get(id=id)
        article_info.title = title
        article_info.content = content
        content_text1 = content.replace('<p>', '').replace('</p>', '').replace('&#39;', '')
        # 去掉图片链接
        content_text2 = re.sub('!\[\]\((.*?)\)', '', content_text1)
        # 去掉markdown标签
        pattern = '[\\\`\*\_\[\]\#\+\-\!\>]'
        content_text3 = re.sub(pattern, '', content_text2)
        article_info.abstract = content_text3[:150]
        article_info.url_img = img_url
        article_info.save()
        return Response(status=status.HTTP_200_OK)
    if request.method == "DELETE":
        article_info = Article.objects.get(id=article_id)
        article_info.delete()
        return Response(status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def comment(request):
    if request.method == 'GET':
        article_id = request.GET.get('article_id')
        comment_list = Comment.objects.all().filter(belong_to_id=article_id, parent=None).order_by('-id')
        serializer = CommentSerializer(comment_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        data = request.data
        article_id = data.get('article_id')
        comment_user = data.get('comment_user')
        comment_content = data.get('comment_content')
        user_email = data.get('user_email')
        send_email = data.get('send_email')

        # 拿到用户ip地址
        if 'HTTP_X_FORWARDED_FOR' in request.META:
            ip = request.META['HTTP_X_FORWARDED_FOR']
        else:
            ip = request.META['REMOTE_ADDR']

        if data.get('parent'):
            parent_id = data.get('parent')
            reply_id = data.get('reply_to')
            comment_info = Comment(belong_to_id=article_id, reply_id=reply_id, parent_id=parent_id,
                                   content=comment_content, comment_user=comment_user, send_email=send_email,
                                   user_email=user_email, user_ip=ip)
            parent_info = Comment.objects.get(id=parent_id)

            if parent_info.send_email is True:
                subject = comment_user + '回复你：'
                message = comment_content
                send_mail(subject=subject, message=message, from_email='778617402@qq.com',
                          recipient_list=[parent_info.user_email])
        else:
            comment_info = Comment(belong_to_id=article_id, content=comment_content, comment_user=comment_user,
                                   send_email=send_email, user_email=user_email, user_ip=ip)
        comment_info.save()
        article_info = Article.objects.get(id=article_id)
        article_info.comment_num = Comment.objects.filter(belong_to_id=article_id).count()
        article_info.save()
        return Response(status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def tag(request):
    if request.method == 'GET':
        tag_list = Tag.objects.all().exclude(article_num=0).order_by('-id')
        for tag_info in tag_list:
            article_num = tag_info.article.count()
            tag_info.article_num = article_num
            tag_info.save()
        serializer = TagSerializer(tag_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def tag_admin(request):
    if request.method == 'GET':
        tag_list = Tag.objects.all().order_by('-id')
        for tag_info in tag_list:
            article_num = tag_info.article.count()
            tag_info.article_num = article_num
            tag_info.save()
        serializer = TagSerializer(tag_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        data = request.data
        name = data.get('tag')
        try:
            Tag.objects.get(name=name)
            return Response({'msg': '标签已存在'}, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            new_tag = Tag(name=name)
            new_tag.save()
            return Response({'tag': name}, status=status.HTTP_200_OK)


@api_view(['GET', 'POST', 'DELETE'])
def tag_detail(request, tag_id):
    if request.method == 'GET':
        tag_info = Tag.objects.get(id=tag_id)
        serializer = TagSerializer(tag_info)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'DELETE':
        Tag.objects.get(id=tag_id).delete()
        return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def view_info(request):
    if request.method == 'GET':
        view_num = ViewInfo.objects.all().count()
        # 统计不重复ip的访问数量
        view_people = len(set(ViewInfo.objects.values_list('view_ip', flat=True)))

        data = {
            'view_num': view_num,
            'view_people': view_people
        }
        return Response(data, status=status.HTTP_200_OK)


class UserLoginAPIView(APIView):
    permission_classes = []
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes((TokenAuthentication,))
def request_user(request):
    print(request.auth)
    if request.auth:
        user_info = request.user
        return Response({'user': str(user_info)}, status=status.HTTP_200_OK)
    else:
        return Response({'user': 'not_login'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET', 'PUT', 'DELETE', 'POST'])
@authentication_classes((TokenAuthentication,))
def manage(request):
    return Response(status=status.HTTP_200_OK)
