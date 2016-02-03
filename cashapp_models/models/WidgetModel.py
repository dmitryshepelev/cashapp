from django.db import models
from cashapp_models.models.ModelBase import ModelBase
from cashapp_models.models.PERSModel import PERS
from cashapp_models.models.POModel import PaymentObject


widget_types = {
	'paymentobject': PaymentObject
}


class Widget(ModelBase):
	object_type = models.CharField(max_length=40, null=False)
	object_guid = models.CharField(max_length=40, null=False)
	order_number = models.PositiveSmallIntegerField(null=True)
	pers = models.ForeignKey(PERS, on_delete=models.CASCADE, null=False)

	def get_vm(self, *args, **kwargs):
		"""
		Overrides base method
		:param args:
		:param kwargs:
		:return:
		"""
		default_vm = ('object_type', 'guid', 'order_number')

		vm = super(Widget, self).get_vm(*(args or default_vm), **kwargs)

		if not args:
			vm.__setitem__('content', self.get_data())

		return vm

	def get_data(self):
		"""
		Load widget content
		:return:
		"""
		type = widget_types.get(self.object_type)
		obj = type.objects.get(guid=self.object_guid)
		return obj.get_vm()

	class Meta:
		app_label = 'cashapp_models'