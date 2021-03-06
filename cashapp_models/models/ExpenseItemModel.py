from django.contrib.auth.models import User
from django.db import models
from django.db.models import Max

from cashapp_models.managers.ExpenseItemManager import ExpenseItemManager
from cashapp_models.models.CategoryModel import Category
from cashapp_models.models.CurrencyModel import Currency
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
	owner = models.ForeignKey(User, on_delete = models.CASCADE, null = False)
	currency = models.ForeignKey(Currency, to_field = 'guid', on_delete = models.PROTECT)

	objects = ExpenseItemManager()

	class Meta:
		app_label = 'cashapp_models'

	def natural_key(self):
		"""
		Overrides base class method
		:return:
		"""
		self_keys = {
			'name': self.name,
			'description': self.description,
			'category': self.category.natural_key(),
			'measure': self.measure.natural_key(),
			'currency': self.currency.natural_key(),
		}
		natural_keys = super(ExpenseItem, self).natural_key(self_keys)
		return natural_keys

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
		exclude_fields = tuple(set(exclude_fields) | {'owner'})
		serialized = super(ExpenseItem, self).serialize(format, include_fields, exclude_fields, use_natural_foreign_keys,
											use_natural_primary_keys)
		return serialized

	def get_last_register_record(self):
		"""
		Overrides base class method
		:return: {ExpenseItemRegister} instance
		"""
		return self.expenseitemregister_set.annotate(max_date = Max('creation_datetime')).last()
