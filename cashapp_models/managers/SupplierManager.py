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
		user_name = 'user'
		if user_name in kwargs.keys():
			kwargs.__setitem__('owner', kwargs.get(user_name))
			del kwargs[user_name]

		return self.filter(name__icontains = q, **kwargs)
