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
} from './Reducers/templateReducer';
import { userLoginReducer ,
userDetailsReducer,
userRegisterReducer,
userRegisterTwoReducer,
userRegisterTwoDetailsReducer,
userListReducer,
userDeleteReducer,userUpdateReducer, myWalletReducer, depositWalletReducer, walletDetailsReducer} from './Reducers/userReducer';



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
    

    userLogin : userLoginReducer,
    userRegister: userRegisterReducer ,
    userDetails : userDetailsReducer,
    userRegisterTwo: userRegisterTwoReducer,
    userProfileMore: userRegisterTwoDetailsReducer,
    usersList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate:userUpdateReducer,
    userWallet: myWalletReducer,
    depositWallet : depositWalletReducer,
    walletDetails: myWalletReducer,
    

 

})
const userInfoFromStorage = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) : null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]


const store = createStore(reducer,initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

    export default store