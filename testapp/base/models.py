from __future__ import unicode_literals

from django.db import models

class Private_Key(models.Model):
    private_key = models.TextField(default="NULL", max_length=500)
    access_key = models.TextField(default="NULL", max_length=500)
    message = models.TextField(default="NULL", max_length=500)