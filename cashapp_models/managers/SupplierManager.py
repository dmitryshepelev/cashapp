from django.db import models

from cashapp_models.libs.ISearchable import ISearchable


class SupplierManager(models.Manager, ISearchable):
	"""
	Supplier model manager
	"""

	def search(self, q, *args, **kwargs):
		"""
		Implementation search method
		:param q:
		:param args:
		:param kwargs:
		:return:
		"""
		return self.filter(name__icontains = q, **kwargs)
