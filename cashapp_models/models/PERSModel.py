from django.contrib.auth.models import User
from django.db import models
from cashapp_models.models.LanguageModel import Language


class PERS(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	language = models.ForeignKey(Language, to_field='code', on_delete=models.SET_DEFAULT, default='en')

	class Meta:
		app_label = 'cashapp_models'