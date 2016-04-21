from django.db import models

from cashapp_models.models.CategoryModel import Category
from cashapp_models.models.MeasureModel import Measure
from cashapp_models.models.ModelBase import ModelBase
from cashapp_models.models.SupplierModel import Supplier


class ExpenseItem(ModelBase):
	"""
	Represents ExpenseItem table
	"""
	name = models.CharField(max_length = 100, null = False, unique = True)
	description = models.CharField(max_length = 1000, null = True)
	category = models.ForeignKey(Category, on_delete = models.PROTECT, to_field = 'guid', null = False)
	measure = models.ForeignKey(Measure, on_delete = models.PROTECT, to_field = 'guid', null = True)
	suppler = models.ForeignKey(Supplier, on_delete = models.PROTECT, to_field = 'guid', null = False)

	class Meta:
		app_label = 'cashapp_models'
