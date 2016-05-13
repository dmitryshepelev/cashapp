from django.core.exceptions import ObjectDoesNotExist
from django.db import models

from cashapp_models.managers.CategoryLevelManager import CategoryLevelManager
from cashapp_models.models.ModelBase import ModelBase


class CategoryLevel(ModelBase):
	"""
	Provide Category level table
	"""
	name = models.CharField(max_length = 3, null = False, unique = True)

	objects = CategoryLevelManager()

	class Meta:
		app_label = 'cashapp_models'

	def next_category(self):
		"""
		Returns next level
		:return:
		"""
		next_name = 'L{n}'.format(n = int(self.name[1:]) + 1)
		try:
			level = CategoryLevel.objects.get(name = next_name)
		except ObjectDoesNotExist as e:
			level = CategoryLevel.objects.create_level()

		return level
