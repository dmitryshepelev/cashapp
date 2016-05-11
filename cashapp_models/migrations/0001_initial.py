# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('exist', models.BooleanField(default=True)),
                ('creation_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_edited_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('name', models.CharField(unique=True, max_length=30)),
                ('parent_id', models.PositiveIntegerField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CategoryLevel',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('exist', models.BooleanField(default=True)),
                ('creation_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_edited_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('name', models.CharField(unique=True, max_length=3)),
            ],
        ),
        migrations.CreateModel(
            name='Currency',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('exist', models.BooleanField(default=True)),
                ('creation_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_edited_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('code', models.CharField(unique=True, max_length=3, db_index=True)),
                ('hex', models.CharField(max_length=10)),
                ('dec', models.CharField(max_length=20)),
                ('label', models.CharField(max_length=30, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ExpenseItem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('exist', models.BooleanField(default=True)),
                ('creation_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_edited_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('name', models.CharField(unique=True, max_length=100)),
                ('description', models.CharField(max_length=1000, null=True)),
                ('category', models.ForeignKey(to='cashapp_models.Category', on_delete=django.db.models.deletion.PROTECT, to_field=b'guid')),
            ],
        ),
        migrations.CreateModel(
            name='ExpenseItemRegister',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('exist', models.BooleanField(default=True)),
                ('creation_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_edited_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('date', models.DateTimeField()),
                ('value', models.DecimalField(max_digits=17, decimal_places=2)),
                ('expense_item', models.ForeignKey(to='cashapp_models.ExpenseItem', on_delete=django.db.models.deletion.PROTECT, to_field=b'guid')),
            ],
        ),
        migrations.CreateModel(
            name='ExpenseTransaction',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('exist', models.BooleanField(default=True)),
                ('creation_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_edited_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('date', models.DateTimeField()),
                ('description', models.CharField(max_length=1000, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ExpenseTransactionItem',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('exist', models.BooleanField(default=True)),
                ('creation_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_edited_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('count', models.FloatField(default=1)),
                ('expense_item', models.ForeignKey(to='cashapp_models.ExpenseItem', on_delete=django.db.models.deletion.PROTECT, to_field=b'guid')),
                ('transaction', models.ForeignKey(to='cashapp_models.ExpenseTransaction', to_field=b'guid')),
            ],
        ),
        migrations.CreateModel(
            name='IncomeTransaction',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('exist', models.BooleanField(default=True)),
                ('creation_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_edited_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('date', models.DateTimeField()),
                ('description', models.CharField(max_length=1000, null=True)),
                ('value', models.DecimalField(max_digits=17, decimal_places=2)),
            ],
        ),
        migrations.CreateModel(
            name='Measure',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('exist', models.BooleanField(default=True)),
                ('creation_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_edited_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('code', models.CharField(unique=True, max_length=3)),
                ('allow_floats', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='PaymentObject',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('exist', models.BooleanField(default=True)),
                ('creation_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_edited_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('name', models.CharField(max_length=30)),
                ('allow_negative', models.BooleanField(default=False)),
                ('primary', models.BooleanField(default=False)),
                ('currency', models.ForeignKey(to='cashapp_models.Currency', on_delete=django.db.models.deletion.PROTECT, to_field=b'guid')),
            ],
        ),
        migrations.CreateModel(
            name='PORegister',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('exist', models.BooleanField(default=True)),
                ('creation_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_edited_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('date', models.DateTimeField()),
                ('value', models.DecimalField(max_digits=17, decimal_places=2)),
                ('payment_object', models.ForeignKey(to='cashapp_models.PaymentObject', to_field=b'guid')),
            ],
        ),
        migrations.CreateModel(
            name='POType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('exist', models.BooleanField(default=True)),
                ('creation_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_edited_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('name', models.CharField(unique=True, max_length=10, db_index=True)),
            ],
        ),
        migrations.CreateModel(
            name='Supplier',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('exist', models.BooleanField(default=True)),
                ('creation_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_edited_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('name', models.CharField(unique=True, max_length=50)),
                ('description', models.CharField(max_length=1000, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='TransactionStatus',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('exist', models.BooleanField(default=True)),
                ('creation_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_edited_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('name', models.CharField(unique=True, max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='TransferTransaction',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('guid', models.CharField(unique=True, max_length=40, db_index=True)),
                ('exist', models.BooleanField(default=True)),
                ('creation_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_edited_datetime', models.DateTimeField(default=django.utils.timezone.now)),
                ('date', models.DateTimeField()),
                ('description', models.CharField(max_length=1000, null=True)),
                ('value', models.DecimalField(max_digits=17, decimal_places=2)),
                ('target_payment_object_id', models.PositiveIntegerField()),
                ('payment_object', models.ForeignKey(to='cashapp_models.PaymentObject', on_delete=django.db.models.deletion.PROTECT, to_field=b'guid')),
                ('status', models.ForeignKey(to='cashapp_models.TransactionStatus', on_delete=django.db.models.deletion.PROTECT, to_field=b'guid')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=django.db.models.deletion.PROTECT)),
            ],
        ),
        migrations.AddField(
            model_name='paymentobject',
            name='type',
            field=models.ForeignKey(to='cashapp_models.POType', on_delete=django.db.models.deletion.PROTECT, to_field=b'guid'),
        ),
        migrations.AddField(
            model_name='paymentobject',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='incometransaction',
            name='payment_object',
            field=models.ForeignKey(to='cashapp_models.PaymentObject', on_delete=django.db.models.deletion.PROTECT, to_field=b'guid'),
        ),
        migrations.AddField(
            model_name='incometransaction',
            name='status',
            field=models.ForeignKey(to='cashapp_models.TransactionStatus', on_delete=django.db.models.deletion.PROTECT, to_field=b'guid'),
        ),
        migrations.AddField(
            model_name='incometransaction',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=django.db.models.deletion.PROTECT),
        ),
        migrations.AddField(
            model_name='expensetransaction',
            name='payment_object',
            field=models.ForeignKey(to='cashapp_models.PaymentObject', on_delete=django.db.models.deletion.PROTECT, to_field=b'guid'),
        ),
        migrations.AddField(
            model_name='expensetransaction',
            name='status',
            field=models.ForeignKey(to='cashapp_models.TransactionStatus', on_delete=django.db.models.deletion.PROTECT, to_field=b'guid'),
        ),
        migrations.AddField(
            model_name='expensetransaction',
            name='supplier',
            field=models.ForeignKey(to='cashapp_models.Supplier', on_delete=django.db.models.deletion.PROTECT, to_field=b'guid'),
        ),
        migrations.AddField(
            model_name='expensetransaction',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=django.db.models.deletion.PROTECT),
        ),
        migrations.AddField(
            model_name='expenseitem',
            name='measure',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to_field=b'guid', to='cashapp_models.Measure', null=True),
        ),
        migrations.AddField(
            model_name='expenseitem',
            name='suppler',
            field=models.ForeignKey(to='cashapp_models.Supplier', on_delete=django.db.models.deletion.PROTECT, to_field=b'guid'),
        ),
        migrations.AddField(
            model_name='category',
            name='level',
            field=models.ForeignKey(to='cashapp_models.CategoryLevel', on_delete=django.db.models.deletion.PROTECT, to_field=b'guid'),
        ),
    ]
