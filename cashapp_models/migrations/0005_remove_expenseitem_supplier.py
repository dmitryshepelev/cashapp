# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cashapp_models', '0004_auto_20160524_1425'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expenseitem',
            name='supplier',
        ),
    ]
