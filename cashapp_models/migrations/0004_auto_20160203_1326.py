# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cashapp_models', '0003_auto_20160202_1311'),
    ]

    operations = [
        migrations.AddField(
            model_name='currency',
            name='guid',
            field=models.CharField(default='fd', unique=True, max_length=40, db_index=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='currency',
            name='is_exist',
            field=models.BooleanField(default=True),
        ),
    ]
