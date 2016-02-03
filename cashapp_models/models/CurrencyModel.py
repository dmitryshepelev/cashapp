from django.db import models
from cashapp_models.models.ModelBase import ModelBase


class Currency(ModelBase):
	"""
	Provide Currency table
	"""
	code = models.CharField(max_length=3, db_index=True, unique=True)
	hex = models.CharField(max_length=10)
	dec = models.CharField(max_length=20)
	label = models.CharField(max_length=30, null=True)

	class Meta:
		app_label = 'cashapp_models'