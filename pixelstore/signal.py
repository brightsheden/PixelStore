
from django.db.models.signals import pre_save,post_save
from django.contrib.auth.models import  User
from .models import Profile


def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != "":
        user.username = user.email
pre_save.connect(updateUser, sender=User,)



def seller_profile(sender,instance,created,**kwargs):
    if created:
        Profile.objects.create(
            user = instance,
            nickname = instance.username,
            name = instance.username
        ) 
        print('profile created ')

post_save.connect(seller_profile, sender=User)


