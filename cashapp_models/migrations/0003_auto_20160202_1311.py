# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cashapp_models', '0002_auto_20160202_1307'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='language',
            name='guid',
        ),
        migrations.RemoveField(
            model_name='language',
            name='is_exist',
        ),
    ]
