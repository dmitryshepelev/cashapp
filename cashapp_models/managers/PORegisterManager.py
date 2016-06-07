from datetime import date, datetime
from dateutil.relativedelta import relativedelta

from django.db import models, connection
from django.db.models import F

from cashapp_models.libs.IAggregatable import IAggregatable


class PORegisterManager(models.Manager, IAggregatable):
	"""
	PORegister model manager
	"""
	class AggregatedPORegisterModelList(IAggregatable.AggregatedModelList):
		def normalize(self, *args, **kwargs):
			"""
			Overrides base class method. Normalize aggregated list
			:return:
			"""
			if len(self.data) <= 1:
				return self.data

			self.data.reverse()
			range_size = (self.end_date - self.data[0].date).days
			normalized_register_records = []

			current_register_record = None
			for i in range(0, range_size):
				current_date = self.data[0].date + relativedelta(days = i)

				register_record = filter(lambda x: x.date == current_date, self.data)
				if len(register_record) == 1:
					current_register_record = register_record[0]

				normalized_register_records.append(
					IAggregatable.aggregated_model(
						current_date,
						current_register_record.value
					)
				)

			return normalized_register_records[::-1]

	def aggregate_by_days(self, payment_object, *args, **kwargs):
		"""
		Implementation
		:return:
		"""
		start_date = kwargs.get('start_date', None) or date.today() - relativedelta(months = 1)
		end_date = kwargs.get('end_date', None) or date.today() + relativedelta(days = 1)

		with connection.cursor() as c:
			c.execute(
				'SELECT * FROM get_aggregated_poregisers(%s, %s, %s)',
				[payment_object.guid, start_date.isoformat(), end_date.isoformat()]
			)

			register_records = [IAggregatable.aggregated_model(*row) for row in c.fetchall()]

			aggregated_model_list = self.AggregatedPORegisterModelList(register_records, start_date = start_date, end_date = end_date)

			return aggregated_model_list

	def update_register_values(self, payment_object_id, value, addition, start_date, end_date = None):
		"""
		Update registers values from start_date to end_date
		:param payment_object_id:
		:param addition:
		:param value:
		:param start_date:
		:param end_date:
		"""
		end_date = end_date or date.today() + relativedelta(days = 1)
		update_value_expression = F('value') + value if addition else F('value') - value

		self.filter(payment_object_id = payment_object_id, date__gt = start_date, date__lte = end_date).update(value = update_value_expression, last_edited_datetime = datetime.utcnow())

