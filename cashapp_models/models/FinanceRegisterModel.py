from django.db import models
from cashapp_models.models.FinanceModel import Finance
from cashapp_models.models.ModelBase import ModelBase


class FinanceRegister(ModelBase):
	data = models.DateTimeField()
	balance = models.DecimalField(decimal_places=2, max_digits=17)
	finance = models.ForeignKey(Finance, to_field='guid')

	class Meta:
		app_label = 'cashapp_models'