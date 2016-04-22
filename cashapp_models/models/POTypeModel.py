from django.db import models

from cashapp_models.models.ModelBase import ModelBase


class POType(ModelBase):
	"""
	Represents Payment object type
	"""
	name = models.CharField(max_length=10, db_index=True, unique=True)

	def natural_key(self):
		"""
		Set natural key for serialization
		:return:
		"""
		self_keys = {
			'name': self.name
		}
		natural_keys = super(POType, self).natural_key(self_keys)
		return natural_keys

	class Meta:
		app_label = 'cashapp_models'
