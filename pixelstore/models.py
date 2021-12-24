from django.db import models
from django.contrib.auth.models import User

# Create your models here.
#3user additiona profile
class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    photo = models.ImageField(null=True, blank=True)
    occupation = models.CharField(max_length=200)
    country =  models.CharField(max_length=200)
    nickname= models.CharField(max_length=200)

    def __str__(self) :
        return self.nickname

#template models
class Template(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title =  models.CharField(max_length=200, null=True, blank=True)
    thumbnail = models.ImageField(null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    price = models.DecimalField( max_digits=7, decimal_places=2, null=True, blank=True)
    image1 =  models.ImageField(null=True, blank=True)
    image2 =  models.ImageField(null=True, blank=True)
    image3 =  models.ImageField(null=True, blank=True)
    description = models.TextField( null=True, blank=True)
    templatefile = models.FileField(max_length=500)
    is_paid = models.BooleanField(default=False)
    is_purchased  = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField( null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) :
        return self.title

#wallets models
class Wallets(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    Name = models.CharField(max_length=200, null=True, blank=True)
    amount = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) :
     return self.Name

'''
class Balance(models.Model):
    wallet = models.ForeignKey(Wallets, on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    '''

    



class Withdrawal(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    amount = models.IntegerField(null=True, blank=True, default=0)
    accountName = models.CharField(max_length=200, null=True, blank=True)
    accountBank_Name = models.CharField(max_length=200, null=True, blank=True)
    accountBank_Number = models.IntegerField(null=True, blank=True, default=0)
    is_success = models.BooleanField(default=False)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self) :
     return self.accountName



class Review(models.Model):
    template = models.ForeignKey(Template, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)
