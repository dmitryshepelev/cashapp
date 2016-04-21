from django.db import models

from cashapp_models.models.ModelBase import ModelBase


class POType(ModelBase):
	"""
	Represents Payment object type
	"""
	name = models.CharField(max_length=10, db_index=True, unique=True)

	class Meta:
		app_label = 'cashapp_models'