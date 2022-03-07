import { CREATE_SELLER_FORM_FAIL,
     CREATE_SELLER_FORM_REQUEST, 
     CREATE_SELLER_FORM_RESET,
      CREATE_SELLER_FORM_SUCCESS, 

      DELETE_SELLER_FORM_FAIL, 

      DELETE_SELLER_FORM_REQUEST, 

      DELETE_SELLER_FORM_SUCCESS, 

      SELLER_FORM_DETAILS_FAIL, 

      SELLER_FORM_DETAILS_REQUEST, 

      SELLER_FORM_DETAILS_RESET, 

      SELLER_FORM_DETAILS_SUCCESS, 

      SELLER_FORM_LIST_FAIL, 

      SELLER_FORM_LIST_REQUEST, 

      SELLER_FORM_LIST_SUCCESS, 

      SELLER_PAY_FAIL, 
      SELLER_PAY_REQUEST,
      SELLER_PAY_RESET,
      SELLER_PAY_SUCCESS} from "../Constants/sellerFormConstants"



 export const sellerFormCreateReducer = (state= {}, action)=>{
    switch (action.type) {
        case CREATE_SELLER_FORM_REQUEST:
            return {loading: true, }
            
        case CREATE_SELLER_FORM_SUCCESS:
            return {loading: false, success: true,
                 sellers:action.payload
            }

        case CREATE_SELLER_FORM_FAIL:
            return {loading: false, error:action.payload}  

        case CREATE_SELLER_FORM_RESET:
            return {}
        default:
            return state;
    }
}


export const sellerPayReducer = (state = { }, action) => {
    switch (action.type) {
        case SELLER_PAY_REQUEST:
            return {
                
                loading: true
            }

        case SELLER_PAY_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case SELLER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case SELLER_PAY_RESET:
            return  {}
            
    

        default:
            return state
    }
}


export const sellerDetailsReducer = (state = { seller: {} }, action) => {
    switch (action.type) {
        case SELLER_FORM_DETAILS_REQUEST:
            return { ...state, loading: true }

        case SELLER_FORM_DETAILS_SUCCESS:
            return { loading: false, seller: action.payload }

        case SELLER_FORM_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case SELLER_FORM_DETAILS_RESET:
            return { seller: {} }


        default:
            return state
    }
}

export const sellerListReducer = (state= {sellers : []}, action)=>{
    switch (action.type) {
        case SELLER_FORM_LIST_REQUEST:
            return {loading: true, sellers:[]}
            
        case SELLER_FORM_LIST_SUCCESS:
            return {loading: false,
                 sellers:action.payload
            }

        case SELLER_FORM_LIST_FAIL:
            return {loading: false, error:action.payload}    

        default:
            return state;
    }
}



export const sellerDeleteReducer = (state= {} , action)=>{
    switch (action.type) {
        case DELETE_SELLER_FORM_REQUEST:
            return {loading: true}


        case DELETE_SELLER_FORM_SUCCESS :
            return {loading:false, success:true}
        
        case DELETE_SELLER_FORM_FAIL :
            return {loading: false, error:action.payload}

        default:
            return state
    }

}

