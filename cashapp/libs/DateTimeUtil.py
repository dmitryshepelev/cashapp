import time
from datetime import datetime


class DateTimeUtil(object):

	@staticmethod
	def from_timestamp(timestamp):
		"""
		Parse new Date() js object to Python DateTime
		:param timestamp:
		:return:
		"""
		return datetime.fromtimestamp(timestamp / 1000.0)

	@staticmethod
	def to_timestamp(value):
		"""
		Convert datetime to timestamp
		:param value: {datetime} instance
		:return:
		"""
		if not isinstance(value, datetime):
			raise ValueError('Value must be a datetime instance')

		return int(time.mktime(value.timetuple()) * 1000)
