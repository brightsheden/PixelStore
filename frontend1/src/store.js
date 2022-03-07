import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from "redux-devtools-extension";
import { templatesListReducer , 
templateDetailsReducer, templateListMyReducer,
templateCreateReducer,
templateUpdateReducer,
templateDeleteReducer,
templatePurchaseReducer,
templatePayReducer,purchasedTemplateReducer,
templateCreateReviewReducer,
templateTopReducer,
} from './Reducers/templateReducer';
import { userLoginReducer ,
userDetailsReducer,
userRegisterReducer,
userRegisterTwoReducer,
userRegisterTwoDetailsReducer,
userListReducer,
userDeleteReducer,userUpdateReducer, myWalletReducer,
 depositWalletReducer, profileListReducer, profileUpdateReducer, 
 profileDetailsReducer, profileDeleteReducer, withdrawalListReducer, 
 withdrawalUpdateReducer,
 withdrawalDetailsReducer,
 withdrawalDeleteReducer,
 withdrawalCreateReducer,
 withdrawalListMyReducer,
 decreaseWalletReducer,
 profileUserUpdateReducer} from './Reducers/userReducer';
import { blogCreateReducer, blogCreateReviewReducer, blogDeleteReducer, blogDetailsReducer, blogListReducer, blogUpdateReducer } from './Reducers/blogReducer';
import { sellerDeleteReducer, sellerDetailsReducer, sellerFormCreateReducer, sellerListReducer, sellerPayReducer } from './Reducers/sellerFormReducer';



const reducer = combineReducers({
    templateList : templatesListReducer,
    templateDetails : templateDetailsReducer,
    createTemplate: templateCreateReducer,
    myTemplate: templateListMyReducer,
    updateTemplate: templateUpdateReducer, 
    deleteTemplate: templateDeleteReducer,
    templatePurchase: templatePurchaseReducer,
    templatePay: templatePayReducer,
    purchasedTemplate: purchasedTemplateReducer,
    templateReview: templateCreateReviewReducer,
    templateTopRated: templateTopReducer,

    bloglist : blogListReducer,
    blogDetails : blogDetailsReducer,
    createBlog: blogCreateReducer,
    deleteBlog: blogDeleteReducer,
    updateBlog: blogUpdateReducer,
    blogCreateReview: blogCreateReviewReducer,


    createSellerForm: sellerFormCreateReducer,
    sellerPay : sellerPayReducer,
    sellerDetails : sellerDetailsReducer,
    sellerList : sellerListReducer,
    sellerDelete: sellerDeleteReducer,
    

    userLogin : userLoginReducer,
    userRegister: userRegisterReducer ,
    userDetails : userDetailsReducer,
    userRegisterTwo: userRegisterTwoReducer,
    userProfileMore: userRegisterTwoDetailsReducer,
    usersList: userListReducer,
    profilesList: profileListReducer,
    userDelete: userDeleteReducer,
    userUpdate:userUpdateReducer,
    profileUpdate:profileUpdateReducer,
    profileUserUpdate:profileUserUpdateReducer,
    profileDetails : profileDetailsReducer,
    profileDelete: profileDeleteReducer,
    withdrawalList: withdrawalListReducer,
    withdrawalUpdate: withdrawalUpdateReducer,
    withdrawalDetails : withdrawalDetailsReducer,
    withdrawalDelete: withdrawalDeleteReducer,
    createWithdrawal: withdrawalCreateReducer,
    myWithdrawal: withdrawalListMyReducer,
    userWallet: myWalletReducer,
    depositWallet : depositWalletReducer,
    decreaseWallet : decreaseWalletReducer,
    
    

 

})
const userInfoFromStorage = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) : null

const userInfoTwoFromStorage = localStorage.getItem("profiles") ?
    JSON.parse(localStorage.getItem("profiles")) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
    userProfileMore: {profiles: userInfoTwoFromStorage}
}

const middleware = [thunk]


const store = createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

    export default store