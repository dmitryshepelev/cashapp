# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cashapp_models', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='owner',
            field=models.ForeignKey(default=2, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='currency',
            name='left_side',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='expenseitem',
            name='currency',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, default='86e4c0f40bce47d1a6bccada73583eb05jd03f94', to_field=b'guid', to='cashapp_models.Currency'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='expenseitem',
            name='owner',
            field=models.ForeignKey(default=2, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='supplier',
            name='owner',
            field=models.ForeignKey(default=2, to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
