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

	def natural_key(self):
		"""
		Overrides base class method
		:return:
		"""
		self_keys = {
			'code': self.code,
			'hex': self.hex,
			'dec': self.dec,
			'label': self.label
		}
		natural_keys = super(Currency, self).natural_key(self_keys)
		return natural_keys
