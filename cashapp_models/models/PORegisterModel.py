from datetime import *
from dateutil.relativedelta import *
from django.db import models
from cashapp_models.models.POModel import PaymentObject
from cashapp_models.models.ModelBase import ModelBase


class PORegisterParams(object):
	"""
	Payment object register parameters
	"""
	class Period():
		"""
		Enum of period values
		"""
		current = 'c'
		week = 'w'
		month = 'm'
		year = 'y'
		custom = 'cs'

		def __init__(self):
			pass

	class RegType():
		"""
		Enum of types values
		"""
		current = 'c'
		expenses = 'e'
		incomes = 'i'

		def __init__(self):
			pass

	def __init__(self, period=Period.current, reg_type=RegType.current):
		"""
		Constructor
		:param period: c - current: default, w - week, m - month, y - year
		:param reg_type:
		:return:
		"""
		self.__period = None
		self.__start_date = None
		self.__end_date = date.today()
		self.__reg_type = None

		self.period = period
		self.reg_type = reg_type

	@property
	def period(self):
		"""
		Getter of __period
		:return: period value
		"""
		return self.__period
	@period.setter
	def period(self, value):
		"""
		Setter of __period
		:param value: value to set
		"""
		if not isinstance(value, str) and not isinstance(value, unicode):
			raise TypeError('\'value\' is not of \'str\'')

		if value == self.Period.current:
			self.__start_date = date.today()
			self.__reg_type = self.RegType.current

		elif value == self.Period.week:
			self.__start_date = self.__end_date - relativedelta(weeks=1)

		elif value == self.Period.month:
			self.__start_date = self.__end_date - relativedelta(months=1)

		elif value == self.Period.year:
			self.__start_date = self.__end_date - relativedelta(years=1)

		else:
			raise ValueError('Value doesn\'t match any of \'c,w,m,y\' values')

		self.__period = value
		return

	@property
	def start_date(self):
		"""
		Getter of __start_date
		:return: start_date value
		"""
		return self.__start_date
	@start_date.setter
	def start_date(self, value):
		"""
		Setter of __start_date
		:param value: value to set
		"""
		if not isinstance(value, date):
			raise TypeError('\'value\' is not of \'date\'')

		delta = self.__end_date - value

		if delta.days < 0:
			raise ValueError('\'Start date must be less than end date')

		if delta.days == 0:
			self.period = self.Period.current

		elif delta.days == 7:
			self.period = self.Period.week

		elif delta.days == 30 or delta.days == 31:
			self.period = self.Period.month

		elif delta.days == 365 or delta.days == 366:
			self.period = self.Period.year

		else:
			self.__period = self.Period.custom
			self.__start_date = value

		return

	@property
	def end_date(self):
		"""
		Getter of __end_date
		:return: end_date value
		"""
		return self.__end_date

	@property
	def reg_type(self):
		"""
		Getter of __reg_type
		:return: reg_type value
		"""
		return self.__reg_type
	@reg_type.setter
	def reg_type(self, value):
		"""
		Setter of __reg_type
		:param value: value to set
		"""
		if not isinstance(value, str) and not isinstance(value, unicode):
			raise TypeError('\'value\' is not of \'str\'')

		if value not in self.RegType.__dict__.values():
			raise ValueError('Value doesn\'t match any of \'c,e,i\' values')

		self.__reg_type = value
		return


class PORegister(ModelBase):
	date = models.DateTimeField()
	balance = models.DecimalField(decimal_places=2, max_digits=17)
	payment_object = models.ForeignKey(PaymentObject, to_field='guid')

	class Meta:
		app_label = 'cashapp_models'