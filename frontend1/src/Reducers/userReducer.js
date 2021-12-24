import { USER_LOGIN_REQUEST,
USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,
USER_LOGOUT,


USER_REGISTER_SUCCESS,
USER_REGISTER_REQUEST,
USER_REGISTER_FAIL,

USER_DETAILS_REQUEST,
USER_DETAILS_SUCCESS,
USER_DETAILS_FAIL,
USER_DETAILS_RESET,

USER_REGISTER_TWO_FAIL,
USER_REGISTER_TWO_SUCCESS,
USER_REGISTER_TWO_REQUEST,

USER_REGISTER_TWO_DETAILS_FAIL,
USER_REGISTER_TWO_DETAILS_REQUEST,
USER_REGISTER_TWO_DETAILS_SUCCESS,


USER_LIST_FAIL,
USER_LIST_SUCCESS,
USER_LIST_REQUEST,
USER_LIST_RESET,

USER_DELETE_FAIL,
USER_DELETE_SUCCESS,
USER_DELETE_REQUEST,

USER_UPDATE_REQUEST,
USER_UPDATE_SUCCESS,
USER_UPDATE_FAIL,
USER_UPDATE_RESET,

GET_MY_WALLET_REQUEST,
GET_MY_WALLET_SUCCESS,
GET_MY_WALLET_FAIL,
GET_MY_WALLET_RESET,


DEPOSIT_WALLET_REQUEST,
DEPOSIT_WALLET_SUCCESS,
DEPOSIT_WALLET_FAIL,
DEPOSIT_WALLET_RESET,

GET_WALLET_REQUEST,
GET_WALLET_SUCCESS,
GET_WALLET_FAIL,
GET_WALLET_RESET} from "../Constants/userConstants";

export const userLoginReducer = (state = {}, action)=>{
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {loading: true}

        case USER_LOGIN_SUCCESS:
                return {loading:false, userInfo:action.payload}

        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}
            

        case USER_LOGOUT:
            return {}    
            
            
    
        default:
            return state
    }
}



export const userRegisterReducer = (state = {}, action)=>{
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true}

        case USER_REGISTER_SUCCESS:
                return {loading:false, userInfo:action.payload}

        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}

        case USER_LOGOUT:
            return {}    
                
            
       
            
    
        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }

        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }

        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case USER_DETAILS_RESET:
            return { user: {} }


        default:
            return state
    }
}


export const userRegisterTwoReducer = (state = {}, action)=>{
    switch (action.type) {
        case USER_REGISTER_TWO_REQUEST:
            return {loading: true}

        case USER_REGISTER_TWO_SUCCESS:
                return {loading:false, userInfoTwo:action.payload}

        case USER_REGISTER_TWO_FAIL:
            return {loading: false, error: action.payload}
            
       
            
    
        default:
            return state
    }
}

export const userRegisterTwoDetailsReducer = (state = { profiles : {}}, action)=>{
    switch (action.type) {
        case USER_REGISTER_TWO_DETAILS_REQUEST:
            return {loading: true}

        case USER_REGISTER_TWO_DETAILS_SUCCESS:
                return {loading:false, profiles:action.payload}

        case USER_REGISTER_TWO_DETAILS_FAIL:
            return {loading: false, error: action.payload}
            
       
            
    
        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }

        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }

        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }

        case USER_LIST_RESET:
            return { users: [] }

        default:
            return state
    }
}


export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true }

        case USER_DELETE_SUCCESS:
            return { loading: false, success: true }

        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const userUpdateReducer = (state = {user:{}}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }

        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }

            case USER_UPDATE_RESET:
                return { user: {} }

        default:
            return state
    }
}

export const myWalletReducer = (state = { wallets: [] }, action) => {
    switch (action.type) {
        case GET_MY_WALLET_REQUEST:
            return { loading: true }

        case GET_MY_WALLET_SUCCESS:
            return { loading: false, wallets: action.payload }

        case GET_MY_WALLET_FAIL:
            return { loading: false, error: action.payload }

        case GET_MY_WALLET_RESET:
            return { wallets: [] }

        default:
            return state
    }
}


export const depositWalletReducer = (state = {wallets:{}}, action) => {
    switch (action.type) {
        case DEPOSIT_WALLET_REQUEST:
            return { loading: true }

        case DEPOSIT_WALLET_SUCCESS:
            return { loading: false, success: true }

        case DEPOSIT_WALLET_FAIL:
            return { loading: false, error: action.payload }

            case DEPOSIT_WALLET_RESET:
                return { wallet: {} }

        default:
            return state
    }
}

export const walletDetailsReducer = (state = { wallet: {} }, action) => {
    switch (action.type) {
        case GET_WALLET_REQUEST:
            return { ...state, loading: true }

        case GET_WALLET_SUCCESS:
            return { loading: false, user: action.payload }

        case GET_WALLET_FAIL:
            return { loading: false, error: action.payload }

        case GET_WALLET_RESET:
            return { wallet: {} }


        default:
            return state
    }
}