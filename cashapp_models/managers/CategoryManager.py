from django.db import models

from cashapp_models.Exceptions.BoundCategoryLevelException import BoundCategoryLevelException
from cashapp_models.Exceptions.ModelsAppBaseException import CreationError
from cashapp_models.models.CategoryLevelModel import CategoryLevel


class CategoryManager(models.Manager):
	"""
	Category model manager
	"""
	def create_root(self, name):
		"""
		Creates unsaved root level category
		:param name: category name
		:return: {CategoryModel} instance
		"""
		level = CategoryLevel.objects.get_root_level()

		from cashapp_models.models.CategoryModel import Category
		category = Category(
			name = name,
			parent_guid = None,
			level = level
		)
		return category

	def create_sub(self, name, parent):
		"""
		Create unsaved sub-category
		:param name: category name
		:param parent: {CategoryModel} instance
		:return: {CategoryModel} instance
		"""
		try:
			level = parent.level.next_category()
		except BoundCategoryLevelException as e:
			raise CreationError(e.message)

		from cashapp_models.models.CategoryModel import Category
		category = Category(
			name = name,
			parent_guid = parent.guid,
			level = level
		)
		return category

	def get_roots(self, *args, **kwargs):
		"""
		Returns categories with root level
		:param args:
		:param kwargs:
		:return:
		"""
		root_level = CategoryLevel.objects.get_root_level()
		kwargs['level_id'] = root_level.guid

		categories = self.filter(*args, **kwargs)
		return categories
