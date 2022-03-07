import {USER_LOGIN_REQUEST,
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
    USER_REGISTER_TWO_DETAILS_SUCCESS,
    USER_REGISTER_TWO_DETAILS_REQUEST,

    USER_LIST_FAIL,
    USER_LIST_SUCCESS,
    USER_LIST_REQUEST,

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

    GET_WITHDRAWALS_REQUEST,
    GET_WITHDRAWALS_SUCCESS,
    GET_WITHDRAWALS_FAIL,
    GET_WITHDRAWALS_RESET,


        
    WITHDRAWAL_DETAILS_REQUEST,
    WITHDRAWAL_DETAILS_SUCCESS,
    WITHDRAWAL_DETAILS_FAIL,
    WITHDRAWAL_DETAILS_RESET,




    DEPOSIT_WALLET_REQUEST,
    DEPOSIT_WALLET_SUCCESS,
    DEPOSIT_WALLET_FAIL,
    DEPOSIT_WALLET_RESET,

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

    
    WITHDRAWAL_UPDATE_REQUEST,
    WITHDRAWAL_UPDATE_SUCCESS,
    WITHDRAWAL_UPDATE_FAIL,
    WITHDRAWAL_UPDATE_RESET,

    WITHDRAWAL_DELETE_REQUEST,
    WITHDRAWAL_DELETE_SUCCESS,
    WITHDRAWAL_DELETE_FAIL,

        
    CREATE_WITHDRAWAL_REQUEST,
    CREATE_WITHDRAWAL_SUCCESS,
    CREATE_WITHDRAWAL_FAIL,
    CREATE_WITHDRAWAL_RESET,

    GET_MY_WITHDRAWAL_REQUEST,
    GET_MY_WITHDRAWAL_FAIL,
    GET_MY_WITHDRAWAL_SUCCESS,

    DECREASE_WALLET_REQUEST,
    DECREASE_WALLET_SUCCESS,
    DECREASE_WALLET_FAIL,
    DECREASE_WALLET_RESET,
    PROFILE_USER_UPDATE_FAIL,
    PROFILE_USER_UPDATE_SUCCESS,
    PROFILE_USER_UPDATE_REQUEST,
    USER_REGISTER_TWO_DETAILS_RESET,
} from "../Constants/userConstants";

import axios from "axios"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/user/login/',
            { 'username': email, 'password': password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.details
                ? error.response.data.details
                : error.message,
        })
    }
}

export const logout = () => async (dispatch)=>{
    localStorage.removeItem('userInfo')
    localStorage.removeItem('profiles')
    dispatch({type: USER_LOGOUT})
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({type: USER_REGISTER_TWO_DETAILS_RESET})

}


export const register = (name,email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://127.0.0.1:8000/api/user/register/',
            { 'name':name, 'email':email, 'password':password},
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `http://127.0.0.1:8000/api/user/${id}/`
            ,
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const registerTwo = (image,occupation,country,nickname) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_REGISTER_TWO_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `http://127.0.0.1:8000/api/user/create/profileMoreDetails/`,
            {image,nickname,country,occupation},config
        )

        dispatch({
            type: USER_REGISTER_TWO_SUCCESS,
            payload: data
        })

        //localStorage.setItem('profiles', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: USER_REGISTER_TWO_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const registerTwoDetails = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_REGISTER_TWO_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/user/myprofileMoredetails/`,
            config
        )

        dispatch({
            type: USER_REGISTER_TWO_DETAILS_SUCCESS,
            payload: data
        })

        localStorage.setItem('profiles', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: USER_REGISTER_TWO_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/user/getUsers/`,
            config
        )

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteUsers = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/user/delete/${id}/`,
            config
        )

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const updateUsers = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/user/update/${user._id}/`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_SUCCESS,
           
        })

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })



    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const walletuser = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_MY_WALLET_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `api/user/mywallet/`,
            config
        )

 
        dispatch({
            type:GET_MY_WALLET_SUCCESS,
            payload: data
        })



    } catch (error) {
        dispatch({
            type: GET_MY_WALLET_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateWallets = (profile) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DEPOSIT_WALLET_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/user/${profile._id}/updatewallet/` ,
            profile,
            config
        )

        dispatch({
            type: DEPOSIT_WALLET_SUCCESS,
           
        })

  


    } catch (error) {
        dispatch({
            type: DEPOSIT_WALLET_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const decreaseWallets = (profile) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DECREASE_WALLET_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/user/${profile._id}/decreasewallet/` ,
            profile,
            config
        )

        dispatch({
            type: DECREASE_WALLET_SUCCESS,
           
        })

        dispatch({
            type: USER_REGISTER_TWO_DETAILS_SUCCESS,
            payload: data
        })

       



    } catch (error) {
        dispatch({
            type: DECREASE_WALLET_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const getWithdrawalsList = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_WITHDRAWALS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/user/getwithdrawals/`
            ,
            config
        )

        dispatch({
            type: GET_WITHDRAWALS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: GET_WITHDRAWALS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateWithdrawal = (withdraw) => async (dispatch, getState) => {
    try {
        dispatch({
            type: WITHDRAWAL_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/user/${withdraw._id}/updatewithdrawal/`,
            withdraw,
            config
        )

        dispatch({
            type: WITHDRAWAL_UPDATE_SUCCESS,
           
        })

        dispatch({
            type: WITHDRAWAL_DETAILS_SUCCESS,
            payload: data
        })



    } catch (error) {
        dispatch({
            type: WITHDRAWAL_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getWithdrawalDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: WITHDRAWAL_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/user/${id}/withdrawal/`
            ,
            config
        )

        dispatch({
            type: WITHDRAWAL_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: WITHDRAWAL_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteWithdrawal = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: WITHDRAWAL_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/user/${id}/deletewithdrawal/`,
            config
        )

        dispatch({
            type: WITHDRAWAL_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: WITHDRAWAL_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createWithdrawals = (amount,accountName,accountBank_Name,accountBank_Number,payPalId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_WITHDRAWAL_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/user/withdrawal/create/`,
            {amount,accountName,accountBank_Name,accountBank_Number,payPalId},
            config
        )
        dispatch({
            type: CREATE_WITHDRAWAL_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: CREATE_WITHDRAWAL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const listMyWithdrawals = ()=> async (dispatch,getState)=>{
    try {
        dispatch({ type:  GET_MY_WITHDRAWAL_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/user/mywithdrawals/`,
        config)

        dispatch({
            type: GET_MY_WITHDRAWAL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_MY_WITHDRAWAL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




export const listProfiles = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROFILE_LIST_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/user/getProfiles/`,
            config
        )

        dispatch({
            type: PROFILE_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type:PROFILE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateProfiles = (profile) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROFILE_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/user/${profile._id}/updateprofiles/`,
            profile,
            config
        )

        dispatch({
            type: PROFILE_UPDATE_SUCCESS,
           
        })

        dispatch({
            type: PROFILE_DETAILS_SUCCESS,
            payload: data
        })



    } catch (error) {
        dispatch({
            type: PROFILE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const updateProfilesUser = (profile) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROFILE_USER_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/user/${profile._id}/updateprofilesuser/`,
            profile,
            config
        )

        dispatch({
            type: PROFILE_USER_UPDATE_SUCCESS,
           
        })

        dispatch({
            type: PROFILE_DETAILS_SUCCESS,
            payload: data
        })



    } catch (error) {
        dispatch({
            type: PROFILE_USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const getProfileDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROFILE_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/user/${id}/profilemore/`
            ,
            
            config
        )

        dispatch({
            type: PROFILE_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PROFILE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const deleteProfiles = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PROFILE_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/user/${id}/deleteprofiles/`,
            config
        )

        dispatch({
            type: PROFILE_DELETE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PROFILE_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}