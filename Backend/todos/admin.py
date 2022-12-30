from django.contrib import admin

from .models import Service, Payment, ExpiredPayments

admin.site.register(Service)
admin.site.register(Payment)
admin.site.register(ExpiredPayments)

# Register your models here.
