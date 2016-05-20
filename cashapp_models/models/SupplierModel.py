from django.contrib.auth.models import User
from django.db import models

from cashapp_models.managers.SupplierManager import SupplierManager
from cashapp_models.models.ModelBase import ModelBase


class Supplier(ModelBase):
	"""
	Represents Supplier table
	"""
	name = models.CharField(max_length = 50, null = False, unique = True)
	description = models.CharField(max_length = 1000, null = True)
	owner = models.ForeignKey(User, on_delete = models.CASCADE, null = False)

	objects = SupplierManager()

	class Meta:
		app_label = 'cashapp_models'

	def serialize(self, format = 'json', include_fields = (), exclude_fields = (), use_natural_foreign_keys = True,
					use_natural_primary_keys = True):
		"""
		Overrides base class method
		:param format:
		:param include_fields:
		:param exclude_fields:
		:param use_natural_foreign_keys:
		:param use_natural_primary_keys:
		:return:
		"""
		exclude_fields = tuple(set(exclude_fields) | {'owner'})
		serialized = super(Supplier, self).serialize(format, include_fields, exclude_fields, use_natural_foreign_keys,
														use_natural_primary_keys)
		return serialized
