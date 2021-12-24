from django.urls import  path
from .views import *


urlpatterns = [
    path('user/login/',MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('user/register/', registerUser, name="register-user"),
    path('user/profile/', getUserProfile, name="profile-user"),
    path('user/create/profileMoreDetails/', createProfileMoreDetails, name="create-profile-user"),
    path('user/profilephoto/', profilePhoto, name="profile-photo"),
    path('user/myprofileMoredetails/', getProfileMoreDetails, name="myprofile-moredetails"),
    path('user/update/profile', updateUserProfile, name="update-userprofile"),
    path('user/getUsers/', getUsers, name="getUsers"),
    path('templates/', getTemplates, name="template"),
    path('templates/mytemplate/', getMyTemplates, name="my-template"),
    path('templates/create/', createTemplate, name="create-template"),
    path('template/templatefile/', uploadTemplateFile, name="template-file"),
    path('template/thumbnail/', uploadThumbnail, name="template-thumbnail"),
    path('template/screenshot1/', uploadScreenshot1, name="template-screenshot1"),
    path('template/screenshot2/', uploadScreenshot2, name="template-screenshot2"),
    path('template/screenshot3/', uploadScreenshot3, name="template-screenshot3"),
    path('user/getwithdrawals/', getWithdrawals, name="withdrawals"),
    path('user/mywallet/', getMyWallet, name="mywallets"),
  
   
    #path('template/<str:pk>/', getTemplate, name="template"),
    path('<str:pk>/template/pay/', updateTemplateToPaid, name='pay'),
    path('<str:pk>/template/update/', updateTemplate, name="template-update"),
    
    path('<str:pk>/template/reviews/',  createTemplateReviews, name="create-review"),
    path("user/<str:pk>/", getUserById , name="user"),
    path('user/delete/<str:pk>/', deleteUser, name='user-delete'),
    path("user/<str:pk>/profilemore/", getProfileMoreDetails , name="user-more-profile"),
    path('template/<str:pk>/', getTemplate, name="template"),
    #path('template/file/<str:pk>/', getTemplateFile, name="template"),
    path('user/update/<str:pk>/', updateUser, name='user-update'),
    path('<str:pk>/template/delete/', DeleteTemplate, name="template-delete"),
    path('<str:pk>/user/upatewithdrawal/', updateWithdrawal, name="updatewithdrawals"),
    
    path('wallet/<str:pk>/wallet/', getWalletbyId, name="walletbyid"),
    path('<str:pk>/user/upatewallet/', Deposite, name="updatewallet"),

    
   
    
]

