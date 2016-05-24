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

	def natural_key(self):
		"""
		Overrides base class method
		:return:
		"""
		self_keys = {
			'name': self.name,
			'parent_guid': self.parent_guid,
			'level': self.level.natural_key()
		}
		natural_keys = super(Category, self).natural_key(self_keys)
		return natural_keys

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
		serialized['subs_count'] = len(self.get_subs())
		return serialized

	def get_subs(self, *args, **kwargs):
		"""
		Get sub categories
		:param args:
		:param kwargs:
		:return:
		"""
		kwargs['parent_guid'] = self.guid

		categories = Category.objects.filter(*args, **kwargs)
		return categories

	def get_parent(self):
		"""
		Get parent
		:return: {CategoryModel} instance
		"""
		if self.parent_guid:
			return Category.objects.get(guid = self.parent_guid)
		else:
			return None

	def get_protected_fields(self):
		"""
		Overrides base class method
		:return:
		"""
		fields = super(Category, self).get_protected_fields()
		return tuple(set(fields) | {'level_id', 'parent_guid'})
