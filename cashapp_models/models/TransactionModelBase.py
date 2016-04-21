from django.contrib.auth.models import User
from django.db import models

from cashapp_models.models.POModel import PaymentObject
from cashapp_models.models.TransactionStatusModel import TransactionStatus


class TransactionModelBase(models.Model):
	"""
	Represent an abstract class of Transaction
	"""
	date = models.DateTimeField()
	description = models.CharField(max_length = 1000, null = True)
	payment_object = models.ForeignKey(PaymentObject, to_field = 'guid', on_delete = models.PROTECT, null = False)
	user = models.ForeignKey(User, on_delete = models.PROTECT)
	status = models.ForeignKey(TransactionStatus, to_field = 'guid', on_delete = models.PROTECT, null = False)

	class Meta:
		abstract = True
