# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cashapp_models', '0002_auto_20160513_1508'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='parent_id',
        ),
        migrations.AddField(
            model_name='category',
            name='parent_guid',
            field=models.CharField(max_length=40, null=True),
        ),
    ]
