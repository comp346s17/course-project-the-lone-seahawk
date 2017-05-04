from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User # logged-in user

# Create your models here.

class Photo(models.Model):
	image = models.ImageField()
	artist = models.ForeignKey(User)
	title = models.CharField(max_length=100)
	series = models.CharField(max_length=100)
	date = models.DateField(auto_now=True)
	featured = models.BooleanField(default=False)

	def __unicode__(self):
		return self.title
