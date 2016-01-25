import hashlib
import random
from django.db import models


class ModelBase(models.Model):
	guid = models.CharField(max_length=40, db_index=True, unique=True)
	is_exist = models.BooleanField(default=True)

	def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
		if not self.guid:
			self.guid = hashlib.sha1(str(random.random())).hexdigest()

		super(ModelBase, self).save(force_insert, force_update, using, update_fields)

	class Meta:
		abstract = True