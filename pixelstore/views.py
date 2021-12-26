
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.paginator import Paginator,PageNotAnInteger,EmptyPage
from .serializer import *
from django.contrib.auth.models import User
from datetime import datetime

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
    


# get profilemoredetails 
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfileMoreDetails(request):
    user = request.user
    profiles = user.profile_set.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserMoreProfileById(request,pk):
    
    profile = Profile.objects.get(id=pk)
    serializer = UserSerializer(profile, many=False)
    return Response(serializer.data)


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
    templates = Template.objects.all()
    serializer = TemplateSerializer(templates, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getTemplate(request, pk):
    template = Template.objects.get(_id=pk)
    serializer = TemplateSerializer(template,many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createTemplate(request):
    user = request.user
    template=Template.objects.create(
        user = user,
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
@permission_classes([IsAdminUser])
def updateTemplate(request,pk):
    data = request.data
    template = Template.objects.get(_id=pk)
    
    if template.is_paid == False and data['is_paid'] == True:
        #######Fund Wallet here
        template.user.deposite(template.user.id,template.price)


    template.title = data['title']
    template.category = data['category']
    template.price = data['price']
    template.description = data["description"]
    template.is_paid = data['is_paid']

    template.save()
    serializer = TemplateSerializer(template,many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def DeleteTemplate(request,pk):
    template = Template.objects.get(_id=pk)
    template.delete()
    return Response("template deleted")




@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateTemplateToPaid(request, pk):
    template = Template.objects.get(_id=pk)

    template.is_purchased = True
    template.paidAt = datetime.now()
    template.save()

    return Response('template was paid')

#get_all_withdrawals
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getWithdrawals(request):
    withdrawal = Withdrawal.objects.all()   
    serializer = WalletsSerializer( withdrawal, many=True)
    return Response(serializer.data)

#update_withdrawal_details
api_view(['PUT'])
def updateWithdrawal(request, pk):
    data = request.data
    withdrawal = Withdrawal.objects.get(_id=pk)
    withdrawal.accountName= data['accountName']
    withdrawal.accountBank_Name= data['accountBank_Name']
    withdrawal.accountBank_Number= data['accountBank_Number']
    withdrawal.save()

    serializer = WalletsSerializer(Withdrawal, many=False)
    return Response(serializer.data)

    
#My_wallet
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyWallet(request):
    user = request.user
    wallet = user.wallets_set.all()
    serializer = WalletsSerializer(wallet, many=True)
    return Response(serializer.data)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getWalletbyId(request, pk):
    user = request.user
    wallet = Wallets.objects.get(_id=pk)
    serializer = WalletsSerializer(wallet, many=False)
    return Response(serializer.data)

'''
def mybalance(request):
    user = request.user
    balance = user.balance_set.all()
    serializer = BalanceSerializer(balance, many=False)
    return Response(serializer.data)
    '''


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyTemplates(request):
    user = request.user
    template = user.template_set.all()
    serializer = TemplateSerializer(template, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])    
def Deposite(request,pk ):
    #user = request.user
    data = request.data
    wallet = Wallets.objects.get(_id=pk)
    wallet.amount = data['amount'] 
    wallet.save()
    
    return Response("balanceChanged")






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


        
