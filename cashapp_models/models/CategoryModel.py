from django.contrib.auth.models import User
from django.db import models

from cashapp_models.managers.CategoryManager import CategoryManager
from cashapp_models.models.CategoryLevelModel import CategoryLevel
from cashapp_models.models.ModelBase import ModelBase


class Category(ModelBase):
	"""
	Represents Category table
	"""
	name = models.CharField(max_length = 30, null = False, unique = True)
	parent_guid = models.CharField(max_length = 40, null = True)
	level = models.ForeignKey(CategoryLevel, to_field = 'guid', on_delete = models.PROTECT, null = False)
	owner = models.ForeignKey(User, on_delete = models.CASCADE, null = False)

	objects = CategoryManager()

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
		serialized = super(Category, self).serialize(format, include_fields, exclude_fields, use_natural_foreign_keys,
															use_natural_primary_keys)
		return serialized
