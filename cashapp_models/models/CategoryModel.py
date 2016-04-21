from django.db import models

from cashapp_models.models.CategoryLevelModel import CategoryLevel
from cashapp_models.models.ModelBase import ModelBase


class Category(ModelBase):
	"""
	Represents Category table
	"""
	name = models.CharField(max_length = 30, null = False, unique = True)
	parent_id = models.PositiveIntegerField(null = True)
	level = models.ForeignKey(CategoryLevel, to_field = 'guid', on_delete = models.PROTECT, null = False)

	class Meta:
		app_label = 'cashapp_models'
