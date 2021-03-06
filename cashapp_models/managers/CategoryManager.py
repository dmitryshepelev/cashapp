from django.db import models

from cashapp_models.exceptions.BoundCategoryLevelException import BoundCategoryLevelException
from cashapp_models.exceptions.ModelsAppBaseException import CreationError
from cashapp_models.libs.ISearchable import ISearchable
from cashapp_models.models.CategoryLevelModel import CategoryLevel


class CategoryManager(models.Manager, ISearchable):
	"""
	Category model manager
	"""
	def search(self, q, *args, **kwargs):
		"""
		Implementation search method
		:param q:
		:param args:
		:param kwargs:
		:return:
		"""
		user_name = 'user'
		if user_name in kwargs.keys():
			kwargs.__setitem__('owner', kwargs.get(user_name))
			del kwargs[user_name]

		return self.filter(name__icontains = q, **kwargs)

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
			level = parent.level.next_level()
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
