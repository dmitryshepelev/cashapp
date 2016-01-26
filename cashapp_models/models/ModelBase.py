import hashlib
import random
from django.db import models
import django
from django.core import serializers


class ModelBase(models.Model):
	guid = models.CharField(max_length=40, db_index=True, unique=True)
	is_exist = models.BooleanField(default=True)

	def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
		"""
		Overrides base save method
		:param force_insert:
		:param force_update:
		:param using:
		:param update_fields:
		:return:
		"""
		if not self.guid:
			self.guid = hashlib.sha1(str(random.random())).hexdigest()

		super(ModelBase, self).save(force_insert, force_update, using, update_fields)

	def get_view_model(self, *args):
		"""
		Geturns VM of model
		:param args: required fields names. Use '.' to separate fields of related models
		:return: {dict}
		"""
		print(args)

	class Meta:
		abstract = True