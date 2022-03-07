
import email
import profile
from django.db import models
from django.contrib.auth.models import User
import decimal

from django.db import transaction
# Create your models here.
# 3user additiona profile


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    photo = models.ImageField(null=True, blank=True)
    occupation = models.CharField(null=True, blank=True,  max_length=200)
    country = models.CharField(null=True,blank=True,max_length=200)
    nickname = models.CharField(null=True,blank=True,max_length=200)
    wallet = models.DecimalField(max_digits=7,decimal_places=2, null=True, blank=True, default=0)
    isSeller = models.BooleanField(null=True, blank=True, default=False)
    isStaff = models.BooleanField(null=True, blank=True, default=False)
    _id = models.AutoField( blank=True, primary_key=True, editable=False)
    

    def __str__(self):
        return self.nickname

    @classmethod
    def withdraw(cls, id, amount):
        with transaction.atomic():
            account = cls.objects.select_for_update().get(id=id)
            if account.wallet < amount or amount < 1:
                return False  # cannot withdraw from wallet
            account.wallet -= decimal.Decimal(amount)
            account.save()

    @classmethod
    def deposite(cls, id, amount):
        with transaction.atomic():
            account = cls.objects.select_for_update().get(id=id)
            if amount > 0:
                account.wallet += decimal.Decimal(amount)
                account.save()


# template models


class Template(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    profile = models.ForeignKey(Profile,null=True,blank=True, on_delete=models.SET_NULL)
    creator = models.CharField(max_length=200, null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    thumbnail = models.ImageField(null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    price = models.DecimalField(max_digits=7,decimal_places=2, null=True, blank=True, default=0)
    image1 = models.ImageField(null=True, blank=True)
    image2 = models.ImageField(null=True, blank=True)
    image3 = models.ImageField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    templatefile = models.FileField(null=True, blank=True,max_length=500)
    is_paid = models.BooleanField(default=False)
    is_purchased = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title

# wallets models


class Wallets(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    Name = models.CharField(max_length=200, null=True, blank=True)
    amount = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.Name


'''
class Balance(models.Model):
    wallet = models.ForeignKey(Wallets, on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    '''


class Withdrawal(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    name =  models.CharField(max_length=200, blank=True, null=True)
    amount = models.IntegerField(null=True, blank=True)
    accountName = models.CharField(max_length=200, null=True, blank=True)
    accountBank_Name = models.CharField(max_length=200, null=True, blank=True)
    accountBank_Number = models.IntegerField(null=True, blank=True)
    payPalId = models.CharField(max_length=400, blank=True, null=True)
    is_success = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name  


class Review(models.Model):
    template = models.ForeignKey(
        Template, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


class Blog(models.Model):
    user =  models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    profile =  models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
    author = models.CharField(max_length=200,null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    body= models.TextField( null=True, blank=True)
    thumbnail = models.ImageField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title


class ReviewBlog(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True,blank=True)
    #rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.comment


class SellerForm(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    username = models.CharField(max_length=200, null=True, blank=True)
    email = models.CharField(max_length=200, null=True, blank=True)
    amount = models.DecimalField(max_digits=8,decimal_places=2, default=0, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    isPaid = models.BooleanField(default=False, null=True)
    paidAt = models.DateTimeField(auto_now_add=False, null=True , blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.username


