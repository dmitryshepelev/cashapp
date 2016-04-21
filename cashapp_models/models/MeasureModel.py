from django.db import models

from cashapp_models.models.ModelBase import ModelBase


class Measure(ModelBase):
	"""
	Represents Measure table
	"""
	code = models.CharField(max_length = 3, unique = True, null = False)
	allow_floats = models.BooleanField(default = True)

	class Meta:
		app_label = 'cashapp_models'
