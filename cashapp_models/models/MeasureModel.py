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

	def natural_key(self):
		"""
		Overrides base class method
		:return:
		"""
		self_keys = {
			'code': self.code,
			'allow_floats': self.allow_floats
		}
		natural_keys = super(Measure, self).natural_key(self_keys)
		return natural_keys
