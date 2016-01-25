from django.contrib.auth.models import User
from django.db import models
from cashapp_models.models.CurrencyModel import Currency
from cashapp_models.models.FinanceTypeModel import FinanceType
from cashapp_models.models.ModelBase import ModelBase


class Finance(ModelBase):
	name = models.CharField(max_length=30, null=True)
	is_locked = models.BooleanField(default=False)
	currency = models.ForeignKey(Currency)
	user = models.ForeignKey(User)
	type = models.ForeignKey(FinanceType)

	class Meta:
		app_label = 'cashapp_models'