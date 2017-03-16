from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from ckeditor_uploader.fields import RichTextUploadingField


class Tag(models.Model):
    name = models.CharField(max_length=20)
    create_time = models.DateTimeField(default=timezone.now)
    article_num = models.CharField(default=0, max_length=10)

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(max_length=300)
    content = RichTextUploadingField(null=True, blank=True)
    abstract = models.TextField(max_length=500, null=True, blank=True)
    image = models.ImageField(upload_to='upload', null=True, blank=True)
    create_time = models.DateTimeField(default=timezone.now)
    update_time = models.DateTimeField(default=timezone.now)
    tag = models.ManyToManyField(to=Tag, related_name='article', blank=True)
    comment_num = models.IntegerField(default=0)

    def __str__(self):
        return self.title


# 新建文章时取前200字符作摘要
@receiver(post_save, sender=Article)
def create_article_abstract(sender, instance, created, **kwargs):
    if created:
        instance.abstract = instance.content[:200]
        instance.save()


class Comment(models.Model):
    belong_to = models.ForeignKey(to=Article, related_name='comments')
    parent = models.ForeignKey(to='self', related_name='child_comments', null=True, blank=True)
    reply = models.ForeignKey(to='self', related_name='who_reply', null=True, blank=True)
    content = models.TextField()
    comment_user = models.CharField(default='匿名', max_length=30)
    send_email = models.BooleanField(default=False)
    user_email = models.EmailField(max_length=30, null=True, blank=True)
    create_time = models.DateTimeField(default=timezone.now)
    child_reply_input = models.BooleanField(default=False)

    def __str__(self):
        return self.comment_user

# from faker import Factory
# fake = Factory.create()
# for i in range(0, 10):
#     A = Article(
#         title=fake.text(max_nb_chars=50),
#         content=fake.text(max_nb_chars=3000)
#     )
#     A.save()
