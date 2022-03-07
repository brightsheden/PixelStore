import axios from "axios"
import { CREATE_SELLER_FORM_FAIL,
    CREATE_SELLER_FORM_REQUEST, 
    CREATE_SELLER_FORM_RESET,
     CREATE_SELLER_FORM_SUCCESS,
    
     DELETE_SELLER_FORM_FAIL,
    
     DELETE_SELLER_FORM_REQUEST,
    
     DELETE_SELLER_FORM_SUCCESS,
    
     SELLER_FORM_DETAILS_FAIL,
    
     SELLER_FORM_DETAILS_REQUEST,
    
     SELLER_FORM_DETAILS_SUCCESS,
    
     SELLER_FORM_LIST_FAIL,
    
     SELLER_FORM_LIST_REQUEST,
    
     SELLER_FORM_LIST_SUCCESS,
    
     SELLER_PAY_FAIL, 
     SELLER_PAY_REQUEST,
     SELLER_PAY_RESET,
     SELLER_PAY_SUCCESS} from "../Constants/sellerFormConstants"


export const createSellerFormm = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_SELLER_FORM_REQUEST
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
            `/api/seller/create/`,
            {},
            config
        )
        dispatch({
            type: CREATE_SELLER_FORM_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: CREATE_SELLER_FORM_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const paySeller = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SELLER_PAY_REQUEST
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
            `/api/seller/${id}/pay/`,
        paymentResult,
        config
        )

        dispatch({
            type: SELLER_PAY_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: SELLER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const getSellerDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SELLER_FORM_DETAILS_REQUEST
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
            `/api/seller/${id}/`
            ,
            config
        )

        dispatch({
            type: SELLER_FORM_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: SELLER_FORM_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listSellers = () => async (dispatch,getState) => {
    try {
        dispatch({ type: SELLER_FORM_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/seller/sellers/`,config)

        dispatch({
            type: SELLER_FORM_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SELLER_FORM_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const sellerDelete = (id)=> async (dispatch,getState)=>{
    try {
        dispatch({ type: DELETE_SELLER_FORM_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`/api/seller/${id}/delete/`,
        config)

        dispatch({
            type: DELETE_SELLER_FORM_SUCCESS,
        
        })

    } catch (error) {
        dispatch({
            type: DELETE_SELLER_FORM_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

