# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.db.models.deletion
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cashapp_models', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Language',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('is_exist', models.BooleanField(default=True)),
                ('code', models.CharField(unique=True, max_length=2)),
            ],
        ),
        migrations.CreateModel(
            name='PERS',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('language', models.ForeignKey(on_delete=django.db.models.deletion.SET_DEFAULT, default=b'en', to_field=b'code', to='cashapp_models.Language')),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Widget',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('is_exist', models.BooleanField(default=True)),
                ('object_type', models.CharField(max_length=40)),
                ('object_guid', models.CharField(max_length=40)),
                ('order_number', models.PositiveSmallIntegerField(null=True)),
                ('pers', models.ForeignKey(to='cashapp_models.PERS')),
            ],
        ),
        migrations.RenameField(
            model_name='poregister',
            old_name='finance',
            new_name='payment_object',
        ),
    ]
