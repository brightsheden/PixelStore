import { TEMPLATE_LIST_REQUEST,
    TEMPLATE_LIST_SUCCESS,
    TEMPLATE_LIST_FAIL,

    TEMPLATE_DETAILS_REQUEST,
    TEMPLATE_DETAILS_SUCCESS,
    TEMPLATE_DETAILS_FAIL,

    CREATE_TEMPLATE_FAIL,
    CREATE_TEMPLATE_SUCCESS,
    CREATE_TEMPLATE_REQUEST,
    CREATE_TEMPLATE_RESET,

    MY_TEMPLATE_FAIL,
    MY_TEMPLATE_SUCCESS,
    MY_TEMPLATE_REQUEST,
    MY_TEMPLATE_RESET,

   

    UPDATE_TEMPLATE_FAIL,
    UPDATE_TEMPLATE_REQUEST,
    UPDATE_TEMPLATE_SUCCESS,
    UPDATE_TEMPLATE_RESET,

    DELETE_TEMPLATE_FAIL,
    DELETE_TEMPLATE_REQUEST,
    DELETE_TEMPLATE_SUCCESS,

    TEMPLATE_PURCHASE_SUCCESS,
    TEMPLATE_PURCHASE_REQUEST,
    TEMPLATE_PURCHASE_FAIL,

    PAY_TEMPLATE_FAIL,
    PAY_TEMPLATE_REQUEST,
    PAY_TEMPLATE_SUCCESS,
    PAY_TEMPLATE_RESET,

    PAID_TEMPLATE_FAIL,
    PAID_TEMPLATE_REQUEST,
    PAID_TEMPLATE_SUCCESS,
    PAID_TEMPLATE_RESET,

    REVIEW_TEMPLATE_FAIL,
    REVIEW_TEMPLATE_REQUEST,
    REVIEW_TEMPLATE_SUCCESS,
    REVIEW_TEMPLATE_RESET,

    DOWNLOAD_TEMPLATE_FAIL,
    DOWNLOAD_TEMPLATE_REQUEST,
    DOWNLOAD_TEMPLATE_SUCCESS,
    DOWNLOAD_TEMPLATE_RESET,
    TEMPLATES_TOP_REQUEST,
    TEMPLATES_TOP_SUCCESS,
    TEMPLATES_TOP_FAIL,

 } from "../Constants/templateConstant"

import axios from "axios"

export const listTemplates = (keyword= '')=> async (dispatch)=>{
    try {
        dispatch({ type: TEMPLATE_LIST_REQUEST })

        const { data } = await axios.get(`/api/templates/${keyword}`)

        dispatch({
            type: TEMPLATE_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TEMPLATE_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listTemplateDestails = (id)=> async (dispatch,getState)=>{
    try {
        dispatch({ type: TEMPLATE_DETAILS_REQUEST })

       // const {
        //    userLogin: { userInfo },
        //} = getState()

        //const config = {
        //    headers: {
        //        'Content-type': 'application/json',
        //        Authorization: `Bearer ${userInfo.token}`
         //   }
       // }

        const { data } = await axios.get(`/api/template/${id}`,)

        dispatch({
            type: TEMPLATE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TEMPLATE_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const createTemplates = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_TEMPLATE_REQUEST
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
            `/api/templates/create/`,
            {},
            config
        )
        dispatch({
            type: CREATE_TEMPLATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: CREATE_TEMPLATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listMyTemplates = ()=> async (dispatch,getState)=>{
    try {
        dispatch({ type:  MY_TEMPLATE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/templates/mytemplate/`,
        config)

        dispatch({
            type: MY_TEMPLATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MY_TEMPLATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const templateUpdate = (template)=> async (dispatch,getState)=>{
    try {
        dispatch({ type: UPDATE_TEMPLATE_REQUEST, })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/${template._id}/template/update/`,
        template,
        config)

        dispatch({
           type: UPDATE_TEMPLATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: TEMPLATE_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_TEMPLATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const templateDelete = (id)=> async (dispatch,getState)=>{
    try {
        dispatch({ type: DELETE_TEMPLATE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(`/api/${id}/template/delete/`,
        config)

        dispatch({
            type: DELETE_TEMPLATE_SUCCESS,
        
        })

    } catch (error) {
        dispatch({
            type: DELETE_TEMPLATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const purchaseTemplate = (id)=> async (dispatch,getState)=>{
    try {
        dispatch({ type: TEMPLATE_PURCHASE_REQUEST })

       // const {
        //    userLogin: { userInfo },
        //} = getState()

        //const config = {
        //    headers: {
        //        'Content-type': 'application/json',
        //        Authorization: `Bearer ${userInfo.token}`
         //   }
       // }

        const { data } = await axios.get(`/api/template/${id}`,)

        dispatch({
            type: TEMPLATE_PURCHASE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TEMPLATE_PURCHASE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const payTemplate = (id,paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type:  PAY_TEMPLATE_REQUEST
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
            `/api/${id}/template/pay/`,
            {},
            config
        )

        dispatch({
            type:  PAY_TEMPLATE_SUCCESS,
            payload: data
        })



    } catch (error) {
        dispatch({
            type:  PAY_TEMPLATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const paidTemplate = (id)=> async (dispatch,getState)=>{
    try {
        dispatch({ type:  PAID_TEMPLATE_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/template/${id}`,config)

        dispatch({
            type:  PAID_TEMPLATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type:  PAID_TEMPLATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createTemplateReview = (templateId,review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REVIEW_TEMPLATE_REQUEST
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
            `/api/${templateId}/template/reviews/`,
            review,
            config
        )
        dispatch({
            type: REVIEW_TEMPLATE_SUCCESS,
            payload: data,
        })


       

    } catch (error) {
        dispatch({
            type: REVIEW_TEMPLATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listTopTemplate = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: TEMPLATES_TOP_REQUEST
        })

      

        const { data } = await axios.get(
            `/api/templates/top/rated/`,
        )
        dispatch({
            type: TEMPLATES_TOP_SUCCESS,
            payload: data,
        })


       

    } catch (error) {
        dispatch({
            type: TEMPLATES_TOP_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


