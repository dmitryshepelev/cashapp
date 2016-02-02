from django.db import models
from cashapp_models.models.ModelBase import ModelBase
from cashapp_models.models.PERSModel import PERS


class Widget(ModelBase):
	object_type = models.CharField(max_length=40, null=False)
	object_guid = models.CharField(max_length=40, null=False)
	order_number = models.PositiveSmallIntegerField(null=True)
	pers = models.ForeignKey(PERS, on_delete=models.CASCADE, null=False)

	class Meta:
		app_label = 'cashapp_models'