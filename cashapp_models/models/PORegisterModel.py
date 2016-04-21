from django.db import models

from cashapp_models.models.ModelBase import ModelBase
from cashapp_models.models.POModel import PaymentObject
from cashapp_models.models.RegisterModelBase import RegisterModelBase


class PORegister(ModelBase, RegisterModelBase):
	"""
	Represents Payment object register
	"""
	payment_object = models.ForeignKey(PaymentObject, to_field='guid', null = False)

	class Meta:
		app_label = 'cashapp_models'