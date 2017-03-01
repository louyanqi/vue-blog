from rest_framework import serializers
from blog.models import Article, Tag, Comment
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.utils import timezone


class DateTimeFieldWihTZ(serializers.DateTimeField):

    def to_representation(self, value):
        value = timezone.localtime(value)
        return super(DateTimeFieldWihTZ, self).to_representation(value)


class ArticleSerializer(serializers.ModelSerializer):
    create_time = DateTimeFieldWihTZ(format='%Y.%m.%d %H:%M')

    class Meta:
        model = Article
        fields = '__all__'
        depth = 1


class ArticleIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id']


class CommentSerializer(serializers.ModelSerializer):
    belong_to = ArticleIdSerializer()
    create_time = DateTimeFieldWihTZ(format='%Y.%m.%d %H:%M')

    class Meta:
        model = Comment
        fields = ['id', 'content', 'comment_user', 'create_time', 'belong_to', 'parent']
        depth = 1


class TagSerializer(serializers.ModelSerializer):
    create_time = DateTimeFieldWihTZ(format='%Y.%m.%d %H:%M')

    class Meta:
        model = Tag
        fields = '__all__'


class UserLoginSerializer(serializers.Serializer):
    password = serializers.CharField(style={'input_type': 'password'})
    username = serializers.CharField(required=False)

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        user = authenticate(username=username, password=password)
        if not user or not username:
            raise serializers.ValidationError({'login_err': '用户名或密码错误'})
        attrs['user'] = user
        return attrs
