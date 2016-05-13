from django.contrib.auth.models import User
from django.db import models

from cashapp_models.models.ModelBase import ModelBase


class Supplier(ModelBase):
	"""
	Represents Supplier table
	"""
	name = models.CharField(max_length = 50, null = False, unique = True)
	description = models.CharField(max_length = 1000, null = True)
	owner = models.ForeignKey(User, on_delete = models.CASCADE, null = False)

	class Meta:
		app_label = 'cashapp_models'
