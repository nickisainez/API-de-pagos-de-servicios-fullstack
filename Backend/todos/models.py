from django.db import models
from users.models import User

class Service(models.Model):
    name = models.CharField(max_length=80,unique=True)
    description = models.TextField()
    logo = models.CharField(max_length=800)

    def __str__(self):
        return self.name
    
class Payment(models.Model):
    user_id = models.ForeignKey(User,null=True,blank=True,on_delete=models.CASCADE)
    service_id = models.ForeignKey(Service,null=True,blank=True,on_delete=models.CASCADE)
    amount = models.FloatField(default=0.0)
    paymentdate = models.DateField(auto_now_add=True)
    expirationdate = models.DateField()

                         
    @property
    def name(self):
        return self.service_id.name
 

class ExpiredPayments(models.Model):
    payment_user_id = models.ForeignKey(Payment,null=True,blank=True,on_delete=models.CASCADE)
    penalty_fee = models.FloatField(default=0.0)
