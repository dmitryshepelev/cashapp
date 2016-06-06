from collections import namedtuple
from datetime import date


class IAggregatable(object):
	"""
	Provide interface of aggregation
	"""
	aggregated_model = namedtuple('AggregatedModel', ['date', 'value'])

	class AggregatedModelList:
		def __init__(self, aggregated_list, *args, **kwargs):
			self.data = aggregated_list
			self.__start_date = None
			self.__end_date = None

			if 'start_date' in kwargs.keys():
				self.start_date = kwargs.get('start_date')

			if 'end_date' in kwargs.keys():
				self.end_date = kwargs.get('end_date')

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
			if self.__end_date:
				if value > self.__end_date:
					raise ValueError('Start date cannot be greater than end date')

			self.__start_date = value

		@property
		def end_date(self):
			"""
			Getter of __end_date
			:return: end_date value
			"""
			return self.__end_date

		@end_date.setter
		def end_date(self, value):
			"""
			Setter of __end_date
			:param value: value to set
			"""
			if self.__start_date:
				if value < self.__start_date:
					raise ValueError('End date cannot be less than start date')

			if value > date.today():
				value = date.today()

			self.__end_date = value

		def normalize(self, *args, **kwargs):
			"""
			Normalize data
			:return:
			"""
			raise NotImplementedError()

	def aggregate_by_days(self, *args, **kwargs):
		"""
		Aggregate by days
		:return:
		"""
		raise NotImplementedError()
