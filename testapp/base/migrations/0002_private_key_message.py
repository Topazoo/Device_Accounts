# -*- coding: utf-8 -*-
# Generated by Django 1.9.9 on 2016-09-13 11:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='private_key',
            name='message',
            field=models.TextField(default='NULL', max_length=500),
        ),
    ]
