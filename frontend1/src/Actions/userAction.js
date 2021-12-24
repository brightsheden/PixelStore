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

    GET_WALLET_REQUEST,
    GET_WALLET_SUCCESS,
    GET_WALLET_FAIL,
    GET_WALLET_RESET,

    DEPOSIT_WALLET_REQUEST,
    DEPOSIT_WALLET_SUCCESS,
    DEPOSIT_WALLET_FAIL,
    DEPOSIT_WALLET_RESET,
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
    dispatch({type: USER_LOGOUT})
    dispatch({ type: USER_DETAILS_RESET })

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
            `http://127.0.0.1:8000/api/user/myprofileMoredetails/`,
            config
        )

        dispatch({
            type: USER_REGISTER_TWO_DETAILS_SUCCESS,
            payload: data
        })


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


export const updateWallets = (wallet) => async (dispatch, getState) => {
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
            `/api/${wallet._id}/user/upatewallet/`,
            wallet,
            config
        )

        dispatch({
            type: DEPOSIT_WALLET_SUCCESS,
           
        })

        dispatch({
            type: DEPOSIT_WALLET_SUCCESS,
            payload: data
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



export const getWalletDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_WALLET_REQUEST
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
            `http://127.0.0.1:8000/api/wallet/${id}/wallet/`
            ,
            config
        )

        dispatch({
            type: GET_WALLET_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: GET_WALLET_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}