from cashapp_models.models.ModelBase import ModelBase
from django.db import models


class CategoryLevel(ModelBase):
	"""
	Provide Category level table
	"""
	name = models.CharField(max_length = 3, null = False, unique = True)

	class Meta:
		app_label = 'cashapp_models'
