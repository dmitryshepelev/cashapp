# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cashapp_models', '0003_auto_20160513_1817'),
    ]

    operations = [
        migrations.RenameField(
            model_name='expenseitem',
            old_name='suppler',
            new_name='supplier',
        ),
    ]
