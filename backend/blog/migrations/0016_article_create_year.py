# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-20 05:12
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0015_comment_user_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='create_year',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
