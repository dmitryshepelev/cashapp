from django.db import models

from cashapp import settings
from cashapp_models.exceptions.BoundCategoryLevelException import BoundCategoryLevelException


class CategoryLevelManager(models.Manager):
	"""
	Category level model manager
	"""
	def get_root_level(self):
		"""
		Returns root level 'L0' category instance
		:return: {CategoryLevelModel} instance
		"""
		return self.get(name = 'L0')

	def create_level(self):
		"""
		Creates sequenced level
		:return: {CategoryLevel} instance
		"""
		count = len(self.all())

		if count >= settings.MAX_CATEGORY_NESTING:
			raise BoundCategoryLevelException('Max Category nesting reached')

		level = self.create(
			name = 'L{n}'.format(n = count)
		)
		level.save()

		return level
