from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from .serializers import ArticleSerializer, CommentSerializer, TagSerializer
from rest_framework.decorators import api_view, authentication_classes
from blog.models import Article, Comment, Tag
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .serializers import UserLoginSerializer
from rest_framework.authtoken.models import Token
from .paginator import get_page_list
from django.core.paginator import Paginator


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
        data = {
            'data': serializer.data,
            'page_list': page_list,
            'now_page': page,
            'next_list': next_list,
            'pre_list': pre_list
        }
        return Response(data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def article_admin(request):
    if request.method == 'GET':
        tag_id = request.GET.get('tag')
        if tag_id:
            article_list = Article.objects.all().filter(tag__id=tag_id).order_by('-id')
        else:
            article_list = Article.objects.all().order_by('-id')
        serializer = ArticleSerializer(article_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        data = request.data
        title = data.get('title')
        content = data.get('content')
        art = Article(title=title, content=content)
        art.save()
        return Response(status=status.HTTP_200_OK)


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
        serializer = ArticleSerializer(article_info)

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
        serializer = ArticleSerializer(article_info)
        return Response(serializer.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        data = request.data
        tag_id_list = data.get('tags_id')
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
        article_info = Article.objects.get(id=id)
        article_info.title = title
        article_info.content = content
        article_info.abstract = content[:200]
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
        if data.get('parent'):
            parent_id = data.get('parent')
            comment_info = Comment(belong_to_id=article_id, parent_id=parent_id, content=comment_content, comment_user=comment_user)
        else:
            comment_info = Comment(belong_to_id=article_id, content=comment_content, comment_user=comment_user)
        comment_info.save()
        article_info = Article.objects.get(id=article_id)
        article_info.comment_num = Comment.objects.all().count()
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
