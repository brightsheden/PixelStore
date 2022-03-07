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
    path('user/getProfiles/', getProfiles, name="getProfiles"),
    path('templates/', getTemplates, name="template"),
    path('templates/top/rated/', getTopRatedTemplate, name="template-top-rated"),
    path('templates/mytemplate/', getMyTemplates, name="my-template"),
    path('templates/create/', createTemplate, name="create-template"),
    path('template/templatefile/', uploadTemplateFile, name="template-file"),
    path('template/thumbnail/', uploadThumbnail, name="template-thumbnail"),
    path('template/screenshot1/', uploadScreenshot1, name="template-screenshot1"),
    path('template/screenshot2/', uploadScreenshot2, name="template-screenshot2"),
    path('template/screenshot3/', uploadScreenshot3, name="template-screenshot3"),
    path('user/getwithdrawals/', getWithdrawals, name="withdrawals"),
    path('user/mywithdrawals/', getMyWithdrawals, name="mywithdrawals"),
    path('user/withdrawal/create/', createWithdrawal, name="create-withdrawal"),
    path("blog/createblog/",createBlogPost, name="createblog" ),
    path("blog/getallblogs/", getBlog, name="allblog"),
    path("seller/sellers/", getAllSellerForm, name="all-sellerform"),
    path("seller/create/", createSellerForm, name="create-sellerform"),

    path('seller/<str:pk>/', getAllSellerFormById, name="seller"),
   
    path('seller/<str:pk>/delete/', DeleteSellerForm, name="seller-topaid"),

    path('user/<str:pk>/withdrawal/', getWithdrawalByid, name="withdrawal"),
    path('user/<str:pk>/updatewithdrawal/', updateWithdrawal, name="withdrawal-update"),
    path('user/<str:pk>/deletewithdrawal/', deleteWithdrawal, name="withdrawal-delete"),
     path("blog/uploadthumbnail/", uploadBlogThumbnail, name="blogthunmbnail" ),
  
   
    
    path('<str:pk>/template/pay/', updateTemplateToPaid, name='pay'),
    path('<str:pk>/template/update/', updateTemplate, name="template-update"),
    
    path('<str:pk>/template/reviews/',  createTemplateReviews, name="create-review"),
    path("user/<str:pk>/", getUserById , name="user"),
    path('user/delete/<str:pk>/', deleteUser, name='user-delete'),
    path("user/<str:pk>/profilemore/", getUserMoreProfileById , name="user-more-profile"),
    path('template/<str:pk>/', getTemplate, name="template"),
    #path('template/file/<str:pk>/', getTemplateFile, name="template"),
    path('user/update/<str:pk>/', updateUser, name='user-update'),
    path('<str:pk>/template/delete/', DeleteTemplate, name="template-delete"),
    path('<str:pk>/user/upatewithdrawal/', updateWithdrawal, name="updatewithdrawals"),
    
    
    #path('<str:pk>/user/upatewallet/', Deposite, name="updatewallet"),
    path('user/<str:pk>/updatewallet/', updateProfileWallet, name="updatewallet"),
    path('user/<str:pk>/updateprofiles/', updateProfiles, name="updateprofile"),
    path('user/<str:pk>/updateprofilesuser/', updateProfilesUser, name="updateprofile-user"),
    path('user/<str:pk>/deleteprofiles/', DeleteProfile, name="deleteprofile"),
    path('user/<str:pk>/decreasewallet/', decreaseProfileWallet, name="decrease-wallet"),

    path("blog/<str:pk>/blogdetails/", getBlogByid, name="blogdetails"),
    path("blog/createblog/",createBlogPost, name="createblog" ),
    path("blog/<str:pk>/updateBlog/", updateBlog, name="updateBlog"),
    path("blog/<str:pk>/deleteblog/", DeleteBlog, name="deleteblog"),
   
    path("blog/<str:pk>/reviews/", createBlogReviews, name="deleteblog"),

    path('seller/<str:pk>/pay/', updateSellerToPaid, name="seller-topaid"),
    

    
   
    
]

