from django.db import models


class Language(models.Model):
	code = models.CharField(max_length=2, unique=True, null=False)

	class Meta:
		app_label = 'cashapp_models'