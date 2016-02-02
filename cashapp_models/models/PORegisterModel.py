from django.db import models
from cashapp_models.models.POModel import PaymentObject
from cashapp_models.models.ModelBase import ModelBase


class PORegister(ModelBase):
	date = models.DateTimeField()
	balance = models.DecimalField(decimal_places=2, max_digits=17)
	payment_object = models.ForeignKey(PaymentObject, to_field='guid')

	class Meta:
		app_label = 'cashapp_models'