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


DECREASE_WALLET_REQUEST,
DECREASE_WALLET_SUCCESS,
DECREASE_WALLET_FAIL,
DECREASE_WALLET_RESET,

GET_WITHDRAWALS_REQUEST,
GET_WITHDRAWALS_SUCCESS,
GET_WITHDRAWALS_FAIL,
GET_WITHDRAWALS_RESET,

WITHDRAWAL_UPDATE_REQUEST,
WITHDRAWAL_UPDATE_SUCCESS,
WITHDRAWAL_UPDATE_FAIL,
WITHDRAWAL_UPDATE_RESET,


WITHDRAWAL_DETAILS_REQUEST,
WITHDRAWAL_DETAILS_SUCCESS,
WITHDRAWAL_DETAILS_FAIL,
WITHDRAWAL_DETAILS_RESET,


PROFILE_LIST_REQUEST,
PROFILE_LIST_SUCCESS,
PROFILE_LIST_FAIL,
PROFILE_LIST_RESET,

PROFILE_UPDATE_REQUEST,
PROFILE_UPDATE_SUCCESS,
PROFILE_UPDATE_FAIL,
PROFILE_UPDATE_RESET,

PROFILE_DETAILS_REQUEST,
PROFILE_DETAILS_SUCCESS,
PROFILE_DETAILS_FAIL,
PROFILE_DETAILS_RESET,

PROFILE_DELETE_REQUEST,
PROFILE_DELETE_SUCCESS,
PROFILE_DELETE_FAIL,


WITHDRAWAL_DELETE_REQUEST,
WITHDRAWAL_DELETE_SUCCESS,
WITHDRAWAL_DELETE_FAIL,

CREATE_WITHDRAWAL_REQUEST,
CREATE_WITHDRAWAL_SUCCESS,
CREATE_WITHDRAWAL_FAIL,
CREATE_WITHDRAWAL_RESET,
GET_MY_WITHDRAWAL_RESET,
GET_MY_WITHDRAWAL_FAIL,
GET_MY_WITHDRAWAL_SUCCESS,
GET_MY_WITHDRAWAL_REQUEST,


PROFILE_USER_UPDATE_REQUEST,
PROFILE_USER_UPDATE_SUCCESS,
PROFILE_USER_UPDATE_FAIL,
PROFILE_USER_UPDATE_RESET,
USER_REGISTER_TWO_DETAILS_RESET,
} from "../Constants/userConstants";

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
                return {loading:false,  profiles:action.payload}

        case USER_REGISTER_TWO_FAIL:
            return {loading: false, error: action.payload}
            
       
            
    
        default :
            return state
    }
}

export const userRegisterTwoDetailsReducer = (state= {}, action)=>{
    switch (action.type) {
        case USER_REGISTER_TWO_DETAILS_REQUEST:
            return {loading: true}

        case USER_REGISTER_TWO_DETAILS_SUCCESS:
                return {loading:false, profiles:action.payload}

        case USER_REGISTER_TWO_DETAILS_FAIL:
            return {loading: false, error: action.payload}

        case USER_REGISTER_TWO_DETAILS_RESET:
            return {}
    
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

//unwanted
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


export const depositWalletReducer = (state = {wallet:{}}, action) => {
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

export const decreaseWalletReducer = (state = {wallet:{}}, action) => {
    switch (action.type) {
        case DECREASE_WALLET_REQUEST:
            return { loading: true }

        case DECREASE_WALLET_SUCCESS:
            return { loading: false, success: true }

        case DECREASE_WALLET_FAIL:
            return { loading: false, error: action.payload }

            case DECREASE_WALLET_RESET:
                return { wallet: {} }

        default:
            return state
    }
}

//un wanted
export const withdrawalListReducer = (state = { withdrawals: [] }, action) => {
    switch (action.type) {
        case GET_WITHDRAWALS_REQUEST:
            return { ...state, loading: true }

        case GET_WITHDRAWALS_SUCCESS:
            return { loading: false, withdrawals: action.payload }

        case GET_WITHDRAWALS_FAIL:
            return { loading: false, error: action.payload }

        case GET_WITHDRAWALS_RESET:
            return { withdrawals: [] }


        default:
            return state
    }
}


export const withdrawalUpdateReducer = (state = {withdraw:{}}, action) => {
    switch (action.type) {
        case WITHDRAWAL_UPDATE_REQUEST:
            return { loading: true }

        case WITHDRAWAL_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case WITHDRAWAL_UPDATE_FAIL:
            return { loading: false, error: action.payload }

            case WITHDRAWAL_UPDATE_RESET:
                return { withdraw: {} }

        default:
            return state
    }
}



export const withdrawalDetailsReducer = (state = { withdrawal: {} }, action) => {
    switch (action.type) {
        case WITHDRAWAL_DETAILS_REQUEST:
            return { ...state, loading: true }

        case WITHDRAWAL_DETAILS_SUCCESS:
            return { loading: false, withdrawal: action.payload }

        case WITHDRAWAL_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case WITHDRAWAL_DETAILS_RESET:
            return { withdrawal: {} }


        default:
            return state
    }
}




export const withdrawalDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case WITHDRAWAL_DELETE_REQUEST:
            return { loading: true }

        case WITHDRAWAL_DELETE_SUCCESS:
            return { loading: false, success: true }

        case WITHDRAWAL_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const withdrawalCreateReducer = (state= {}, action)=>{
    switch (action.type) {
        case CREATE_WITHDRAWAL_REQUEST:
            return {loading: true, }
            
        case CREATE_WITHDRAWAL_SUCCESS:
            return {loading: false, success: true,
                 withdrawals:action.payload
            }

        case CREATE_WITHDRAWAL_FAIL:
            return {loading: false, error:action.payload}  

        case CREATE_WITHDRAWAL_RESET:
            return {}
        default:
            return state;
    }
}


export const withdrawalListMyReducer = (state={withdrawals: []}, action)=>{
    switch (action.type) {
        case GET_MY_WITHDRAWAL_REQUEST:
            return {loading: true,  }
            
        case GET_MY_WITHDRAWAL_SUCCESS:
            return {loading: false, 
                withdrawals:action.payload
            }

        case GET_MY_WITHDRAWAL_FAIL:
            return {loading: false, error:action.payload}   
            
            
        case GET_MY_WITHDRAWAL_RESET:
            return { withdrawals: []}

        default:
            return state;
    }
}






export const profileListReducer = (state = { profiles: [] }, action) => {
    switch (action.type) {
        case PROFILE_LIST_REQUEST:
            return { loading: true }

        case PROFILE_LIST_SUCCESS:
            return { loading: false, profiles: action.payload }

        case PROFILE_LIST_FAIL:
            return { loading: false, error: action.payload }

        case PROFILE_LIST_RESET:
            return { profiles: [] }

        default:
            return state
    }
}

export const profileUpdateReducer = (state = {profile:{}}, action) => {
    switch (action.type) {
        case PROFILE_UPDATE_REQUEST:
            return { loading: true }

        case PROFILE_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case PROFILE_UPDATE_FAIL:
            return { loading: false, error: action.payload }

            case PROFILE_UPDATE_RESET:
                return { profile: {} }

        default:
            return state
    }
}


export const profileUserUpdateReducer = (state = {profile:{}}, action) => {
    switch (action.type) {
        case PROFILE_USER_UPDATE_REQUEST:
            return { loading: true }

        case PROFILE_USER_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case PROFILE_USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }

            case PROFILE_USER_UPDATE_RESET:
                return { profile: {} }

        default:
            return state
    }
}




export const profileDetailsReducer = (state = { profile: {} }, action) => {
    switch (action.type) {
        case PROFILE_DETAILS_REQUEST:
            return { ...state, loading: true }

        case PROFILE_DETAILS_SUCCESS:
            return { loading: false, profile: action.payload }

        case PROFILE_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case PROFILE_DETAILS_RESET:
            return { profile: {} }


        default:
            return state
    }
}



export const profileDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_DELETE_REQUEST:
            return { loading: true }

        case PROFILE_DELETE_SUCCESS:
            return { loading: false, success: true }

        case PROFILE_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
