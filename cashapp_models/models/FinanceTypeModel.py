from django.db import models


class FinanceType(models.Model):
	name = models.CharField(max_length=10)