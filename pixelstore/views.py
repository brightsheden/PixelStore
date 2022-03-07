
from decimal import Decimal

import profile
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework.serializers import Serializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.paginator import Paginator,PageNotAnInteger,EmptyPage
from .serializer import *
from django.contrib.auth.models import User
from datetime import date, datetime
from django.db.models import Q

# Create your views here.
#user and jwt auth

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    

#register user
@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'details': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


#get useprofile
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserById(request,pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)
#get users
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
    
#delete users
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')

#update_Users
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)

    data = request.data

    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    user.is_staff = data['isAdmin']
   

    user.save()

    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)


#create user more Details
#remind me , i will later use signal for this
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProfileMoreDetails(request):
    user = request.user
    data = request.data
    profile= Profile.objects.create(
        user = user,
        occupation = data["occupation"],
        nickname = data["nickname"],
        country = data['country'],

    )
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)

#upload profile photo
'''
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def profilePhoto(request):
    data = request.data
    profile = Profile.objects.create(
        photo = data['image']
    )
    profile.photo = request.FILES.get('image')
    profile.save()
    return Response("image was Uploaded")
'''



#upload profile photo
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def profilePhoto(request):
    data = request.data
    user_id = data['user_id']
    profile = Profile.objects.get(_id=user_id )
    profile.photo = request.FILES.get('image')
    profile.save()
    return Response("image was Uploaded")
    



# get profilemoredetails 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfileMoreDetails(request):

    user = request.user
    profiles = user.profile
    #print(profiles)
    serializer = ProfileSerializer(profiles, many=False)
    print(serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getProfiles(request):
    profiles = Profile.objects.all()

   
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserMoreProfileById(request,pk):
    
    profile = Profile.objects.get(_id=pk)
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProfiles(request,pk):
    data = request.data 
    profile = Profile.objects.get(_id=pk)
    profile.nickname = data['nickname']
    profile.name = data['name']
    profile.country = data['country']
    profile.occupation = data['occupation']
    profile.wallet = Decimal(data['wallet'])
    profile.isSeller = Decimal(data['isSeller'])
    profile.isStaff = Decimal(data['isStaff'])
    profile.save()
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProfileWallet(request,pk):
    data = request.data 
    profile = Profile.objects.get(_id=pk)
    profile.wallet =profile.wallet + Decimal(data['wallet'])
    #profile.wallet += profile.wallet
    profile.save()
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProfilesUser(request,pk):
    data = request.data 
    profile = Profile.objects.get(_id=pk)
    profile.nickname = data['nickname']
    profile.name = data['name']
    profile.country = data['country']
    profile.occupation = data['occupation']
    #profile.photo = data['photo']
   
    profile.save()
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProfileWallet(request,pk):
    data = request.data 
    profile = Profile.objects.get(_id=pk)
    profile.wallet =profile.wallet + Decimal(data['wallet'])
    #profile.wallet += profile.wallet
    profile.save()
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def decreaseProfileWallet(request,pk):
    data = request.data 
    profile = Profile.objects.get(_id=pk)
    profile.wallet =profile.wallet - Decimal(data['amount'])
    #profile.wallet += profile.wallet
    profile.save()
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def DeleteProfile(request,pk):
    profile = Profile.objects.get(_id=pk)
    profile.delete()
    return Response("profile deleted")

#api_view(['PUT'])

#dummy update wallet function
def updateW(request,pk):
    data = request.data
    profile = Profile.objects.get(id=pk)
    template = Template.objects.get(id=pk)
    if template.is_purchased == True and template.paidAt == datetime.now():
        profile.wallet += template.price
    return Response("balance updated")

#update userProfile
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    user.name = data['name'],
    user.email = data['email'],


    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


@api_view(["GET"])
def getTemplates(request):
    query = request.query_params.get('keyword')
    if query == None:
        query= ''
    templates = Template.objects.filter(
       Q(title__icontains=query) | Q(category__icontains=query)
       ).order_by('-createdAt')
    #templates = Template.objects.all()
    page =request.query_params.get('page')
    paginator = Paginator(templates, 5)

    try:
        templates = paginator.page(page)
    except PageNotAnInteger:
        templates = paginator.page(1)
    except EmptyPage:
        templates = paginator.page(paginator.num_pages)

    if page  == None:
        page =1
    
    page = int(page)
    serializer = TemplateSerializer(templates, many=True)
    return Response({'templates':serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(["GET"])
def getTemplate(request, pk):
    template = Template.objects.get(_id=pk)
    serializer = TemplateSerializer(template,many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTemplate(request):
    user = request.user
    #profile = Profile.objects.filter(template=user),
    template=Template.objects.create(
        user = user,
        profile = user.profile,
        creator = user.username,
        title = "sample title",
        price = 0,
        category = "sample category",
        description = "sample description"
    )
    serializer = TemplateSerializer(template, many=False)
    return Response (serializer.data)

#upload template_file 
@api_view(['PUT'])
#@permission_classes([IsAuthenticated])
def uploadTemplateFile(request):
    data = request.data
    
    template_id=data['template_id']
    template =  Template.objects.get(_id=template_id)
    template.templatefile = request.FILES.get('file')
    template.save()
    return Response("file was uploaded")

#upload thumbnail
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def uploadThumbnail(request):
    data = request.data
    
    template_id=data['template_id']
    template =  Template.objects.get(_id=template_id)
    template.thumbnail = request.FILES.get('image')
    template.save()
    return Response("image was uploaded")

#upload_screenshots
@api_view(['POST'])
def uploadScreenshot1(request):
    data = request.data
    
    template_id=data['template_id']
    template =  Template.objects.get(_id=template_id)
    template.image1 = request.FILES.get('image')
    template.save()
    return Response("screenshot1 was uploaded")

@api_view(['POST'])
def uploadScreenshot2(request):
    data = request.data
    
    template_id=data['template_id']
    template =  Template.objects.get(_id=template_id)
    template.image2 = request.FILES.get('image')
    template.save()
    return Response("screenshot1 was uploaded")

@api_view(['POST'])
def uploadScreenshot3(request):
    data = request.data
    
    template_id=data['template_id']
    template =  Template.objects.get(_id=template_id)
    template.image3 = request.FILES.get('image')
    template.save()
    return Response("screenshot1 was uploaded")

#update_template
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateTemplate(request,pk):
    data = request.data
    template = Template.objects.get(_id=pk)
  

    template.is_paid = data["is_paid"]
    template.title = data['title']
    template.category = data['category']
    template.price = data['price']
    template.description = data["description"]
    template.is_paid = data['is_paid']

    template.save()
    serializer = TemplateSerializer(template,many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def DeleteTemplate(request,pk):
    template = Template.objects.get(_id=pk)
    template.delete()
    return Response("template deleted")

@api_view(['GET'])
def getTopRatedTemplate(request):
    templates = Template.objects.filter(rating__gte=10).order_by('-rating')[0:5]
    serializer = TemplateSerializer(templates,many=True)
    return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateTemplateToPaid(request, pk):
    data = request.data
    template = Template.objects.get(_id=pk)
      
    #if template.is_purchased == False and data['is_purchased '] == True:
        #######Fund Wallet here
      #  template.user.deposite(template.user.id,template.price)

        

    template.is_purchased = True
    template.paidAt = datetime.now()
    template.save()

    return Response('template was paid')

#withdrawals
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createWithdrawal(request):
    data = request.data
    user = request.user
    
       
    withdarwal = Withdrawal.objects.create(
        user = user,
        profile = user.profile,
        name = user.email,
        amount = data['amount'],
        accountName = data['accountName'],
        accountBank_Name =  data['accountBank_Name'],
        accountBank_Number = data['accountBank_Number'],
        payPalId = data['payPalId']
        )
   
    serializer = WithdrawalSerializer(withdarwal, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getWithdrawals(request):
    withdrawal = Withdrawal.objects.all().order_by('-createdAt')   
    serializer = WithdrawalSerializer( withdrawal, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getWithdrawalByid(request,pk):
    withdrawal = Withdrawal.objects.get(_id=pk)   
    serializer = WithdrawalSerializer( withdrawal, many=False)
    return Response(serializer.data)

#update_withdrawal_details
@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateWithdrawal(request, pk):
    data = request.data
    withdrawal = Withdrawal.objects.get(_id=pk)
    withdrawal.amount = data['amount']
    withdrawal.name = data['name']
    withdrawal.accountName = data['accountName']
    withdrawal.accountBank_Name = data['accountBank_Name']
    withdrawal.accountBank_Number = data['accountBank_Number']
    withdrawal.payPalId = data['payPalId']
    withdrawal.is_success = data['is_success']
    withdrawal.save()

    serializer = WithdrawalSerializer(withdrawal, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyWithdrawals(request):
    user = request.user
    withdrawal = user.withdrawal_set.all().order_by('-createdAt')
    serializer = WithdrawalSerializer(withdrawal, many=True)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyTemplates(request):
    user = request.user
    template = user.template_set.all().order_by('-createdAt')
    serializer = TemplateSerializer(template, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteWithdrawal(request,pk):
    withdrawal = Withdrawal.objects.get(_id=pk)
    withdrawal.delete()
    return Response("delete successful")



    













#Template_Reviews

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createTemplateReviews(request, pk):
    user = request.user
    template =Template.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = template.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'template already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            template=template,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = template.review_set.all()
        template.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        template.rating = total / len(reviews)
        template.save()

        return Response('Review Added')






        
#GetBlog
@api_view(["GET"])
def getBlog(request):
    blog = Blog.objects.all().order_by('-createdAt')
    serializer = BlogSerializer(blog, many=True)
    return Response(serializer.data)

#getblog id
@api_view(["GET"])
def getBlogByid(request, pk):
    blog= Blog.objects.get(_id=pk)
    serializer = BlogSerializer(blog, many=False)
    return Response(serializer.data)


#Blog
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBlogPost(request):
    user = request.user
    data = request.data
    blogPost=Blog.objects.create(
        user = user,
        author = user.username,
        title = "sample title",
        body = "sample body text",
        category = "sample category"
        #thunmbnail = "sample description"
    )
    serializer = BlogSerializer(blogPost, many=False)
    return Response (serializer.data)

#upload thumbnail
@api_view(['POST'])
#@permission_classes([IsAuthenticated])
def uploadBlogThumbnail(request):
    data = request.data
    
    blog_id=data['blog_id']
    blog =  Blog.objects.get(_id=blog_id)
    blog.thumbnail = request.FILES.get('image')
    blog.save()
    return Response("image was uploaded")


#update_blog
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateBlog(request,pk):
    data = request.data
    blog = Blog.objects.get(_id=pk)
    
    blog.title = data['title']
    blog.category = data['category']
    blog.body = data['description']
  
  

    blog.save()
    serializer = BlogSerializer(blog,many=False)
    return Response(serializer.data)

#DELETE Blog
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def DeleteBlog(request,pk):
    blog = Blog.objects.get(_id=pk)
    blog.delete()
    return Response("blog post deleted")

#blog reviews
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBlogReviews(request, pk):
    
    blog = Blog.objects.get(_id=pk)
    data = request.data
    user = request.user

   
    # 2 - No Rating or 0
  
    # 3 - Create review
    
    review = ReviewBlog.objects.create(
        
        blog=blog,
        name=user.username,
        comment=data['comment'],
    )

    reviews = blog.reviewblog_set.all()
    #template.numReviews = len(reviews)

    #total = 0
    #for i in reviews:
        # total += i.rating

    #template.rating = total / len(reviews)
    blog.save()

    return Response('Review Added')


#sellerform start here
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createSellerForm(request):
    data = request.data
    user = request.user
    
       
    seller = SellerForm.objects.create(
        user = user,
        profile = user.profile,
        email = user.email,
        username =user.username,
        amount = '5.00',
        isPaid = False,
        
     
        ) 
   
    serializer = SellerFormSerializer(seller, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllSellerForm(request):
    seller = SellerForm.objects.all().order_by('-createdAt')
    serializer = SellerFormSerializer(seller, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getAllSellerFormById(request,pk):
    seller = SellerForm.objects.get(_id=pk)
    serializer = SellerFormSerializer(seller, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateSellerToPaid(request,pk):
    seller = SellerForm.objects.get(_id=pk)
    seller.isPaid = True
    seller.paidAt = datetime.now()
    seller.save()
    #serializer = SellerFormSerializer(seller, many=False)
    return Response("seller paid")



@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def DeleteSellerForm(request,pk):
    seller = SellerForm.objects.get(_id=pk)
    seller.delete()
    return Response("blog post deleted")


