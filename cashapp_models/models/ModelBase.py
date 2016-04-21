import hashlib
import random

from django.db import models


class ModelBase(models.Model):
	guid = models.CharField(max_length=40, db_index=True, unique=True)
	exist = models.BooleanField(default=True)

	class Meta:
		abstract = True

	def get_vm(self, *args, **kwargs):
		"""
		Returns VM of requested args
		If args are defined returns dict of keys = args and model values
		Else returns default models (all fields exclude pk and fields begins with underscore)
		If kwargs has 'include_pk=True' the result will contain pk value
		Override this method in child class to customize default VM
		:return: dict
		"""
		vm = dict()

		if args:
			for arg in args:
				if arg in self.__dict__.keys():
					vm.__setitem__(arg, self.__dict__.get(arg))

		else:
			for key in self.__dict__.keys():
				if not key.startswith('_'):
					if key == 'id' and not kwargs.get('include_pk', False):
						continue
					else:
						vm.__setitem__(key, self.__dict__.get(key))

		return vm

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