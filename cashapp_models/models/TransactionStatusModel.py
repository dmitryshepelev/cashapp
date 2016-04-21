from django.db import models

from cashapp_models.models.ModelBase import ModelBase


class TransactionStatus(ModelBase):
	"""
	Represents Transaction status table
	"""
	name = models.CharField(max_length = 20, null = False, unique = True)

	class Meta:
		app_label = 'cashapp_models'
