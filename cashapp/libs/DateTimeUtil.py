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
