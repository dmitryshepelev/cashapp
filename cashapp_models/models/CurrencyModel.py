from django.db import models


class Currency(models.Model):
	"""
	Provide Currency table
	"""
	code = models.CharField(max_length=3, db_index=True)
	hex = models.CharField(max_length=10)
	dec = models.CharField(max_length=20)
	label = models.CharField(max_length=30, null=True)

	class Meta:
		app_label = 'cashapp_models'