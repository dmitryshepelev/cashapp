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
