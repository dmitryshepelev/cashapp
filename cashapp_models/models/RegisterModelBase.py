from django.db import models


class RegisterModelBase(models.Model):
	"""
	Represents an abstract class of Register models
	"""
	date = models.DateTimeField(null = False)
	value = models.DecimalField(null = False, decimal_places = 2, max_digits = 17)

	class Meta:
		abstract = True
