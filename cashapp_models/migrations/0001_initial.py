# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Currency',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('code', models.CharField(unique=True, max_length=3, db_index=True)),
                ('hex', models.CharField(max_length=10)),
                ('dec', models.CharField(max_length=20)),
                ('label', models.CharField(max_length=30, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PaymentObject',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('is_exist', models.BooleanField(default=True)),
                ('name', models.CharField(max_length=30, null=True)),
                ('is_locked', models.BooleanField(default=False)),
                ('allow_negative', models.BooleanField(default=False)),
                ('currency', models.ForeignKey(to='cashapp_models.Currency', to_field=b'code')),
            ],
        ),
        migrations.CreateModel(
            name='PORegister',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('is_exist', models.BooleanField(default=True)),
                ('date', models.DateTimeField()),
                ('balance', models.DecimalField(max_digits=17, decimal_places=2)),
                ('finance', models.ForeignKey(to='cashapp_models.PaymentObject', to_field=b'guid')),
            ],
        ),
        migrations.CreateModel(
            name='POType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=10, db_index=True)),
            ],
        ),
        migrations.AddField(
            model_name='paymentobject',
            name='type',
            field=models.ForeignKey(to='cashapp_models.POType', to_field=b'name'),
        ),
        migrations.AddField(
            model_name='paymentobject',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
    ]
