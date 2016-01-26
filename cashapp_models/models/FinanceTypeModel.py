from django.db import models


class FinanceType(models.Model):
	name = models.CharField(max_length=10, db_index=True, unique=True)

	class Meta:
		app_label = 'cashapp_models'