from django.db import models

from cashapp_models.managers.PORegisterManager import PORegisterManager
from cashapp_models.models.ModelBase import ModelBase
from cashapp_models.models.POModel import PaymentObject
from cashapp_models.models.RegisterModelBase import RegisterModelBase


class PORegister(ModelBase, RegisterModelBase):
	"""
	Represents Payment object register
	"""
	payment_object = models.ForeignKey(PaymentObject, to_field='guid', null = False)

	objects = PORegisterManager()

	class Meta:
		app_label = 'cashapp_models'

	def serialize(self, format = 'json', include_fields = (), exclude_fields = (), use_natural_foreign_keys = True,
					use_natural_primary_keys = True):
		"""
		Overrides base class method
		:param format:
		:param include_fields:
		:param exclude_fields:
		:param use_natural_foreign_keys:
		:param use_natural_primary_keys:
		:return:
		"""
		exclude_fields = tuple(set(exclude_fields) | {'payment_object'})
		serialized = super(PORegister, self).serialize(format, include_fields, exclude_fields, use_natural_foreign_keys,
														use_natural_primary_keys)
		return serialized
