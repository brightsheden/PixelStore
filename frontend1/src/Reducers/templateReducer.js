import { TEMPLATE_LIST_REQUEST,
    TEMPLATE_LIST_SUCCESS,
    TEMPLATE_LIST_FAIL,

    TEMPLATE_DETAILS_REQUEST,
    TEMPLATE_DETAILS_SUCCESS,
    TEMPLATE_DETAILS_FAIL,

    CREATE_TEMPLATE_REQUEST,
    CREATE_TEMPLATE_SUCCESS,
    CREATE_TEMPLATE_FAIL,
    CREATE_TEMPLATE_RESET,

    MY_TEMPLATE_REQUEST,
    MY_TEMPLATE_SUCCESS,
    MY_TEMPLATE_FAIL,
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
    TEMPLATE_PURCHASE_RESET,

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
    TEMPLATES_TOP_REQUEST,
    TEMPLATES_TOP_SUCCESS,
    TEMPLATES_TOP_FAIL,

 
 } from "../Constants/templateConstant"

export const templatesListReducer = (state= {templates : []}, action)=>{
    switch (action.type) {
        case TEMPLATE_LIST_REQUEST:
            return {loading: true, templates:[]}
            
        case TEMPLATE_LIST_SUCCESS:
            return {loading: false,
                templates:action.payload.templates, 
                page:action.payload.page, 
                pages:action.payload.pages
            }

        case TEMPLATE_LIST_FAIL:
            return {loading: false, error:action.payload}    

        default:
            return state;
    }
}


export const templateDetailsReducer = (state= {template : {reviews: []}} , action)=>{
    switch (action.type) {
        case TEMPLATE_DETAILS_REQUEST:
            return {loading: true, ...state}


        case TEMPLATE_DETAILS_SUCCESS :
            return {loading:false, template:action.payload}
        
        case TEMPLATE_DETAILS_FAIL :
            return {loading: false, error:action.payload}

        default:
            return state
    }

}


export const templateCreateReducer = (state= {}, action)=>{
    switch (action.type) {
        case CREATE_TEMPLATE_REQUEST:
            return {loading: true, }
            
        case CREATE_TEMPLATE_SUCCESS:
            return {loading: false, success: true,
                 templates:action.payload
            }

        case CREATE_TEMPLATE_FAIL:
            return {loading: false, error:action.payload}  

        case CREATE_TEMPLATE_RESET:
            return {}
        default:
            return state;
    }
}


export const templateListMyReducer = (state={templates: []}, action)=>{
    switch (action.type) {
        case MY_TEMPLATE_REQUEST:
            return {loading: true, }
            
        case MY_TEMPLATE_SUCCESS:
            return {loading: false, 
                templates:action.payload
              
            }

        case MY_TEMPLATE_FAIL:
            return {loading: false, error:action.payload}   
            
            
        case MY_TEMPLATE_RESET:
            return { templates: []}

        default:
            return state;
    }
}


export const templateUpdateReducer = (state= {template : {}}, action)=>{
    switch (action.type) {
        case UPDATE_TEMPLATE_REQUEST:
            return {loading: true, }
            
        case UPDATE_TEMPLATE_SUCCESS:
            return {loading: false, success: true,
                 template:action.payload
            }

        case UPDATE_TEMPLATE_FAIL:
            return {loading: false, error:action.payload}  

        case UPDATE_TEMPLATE_RESET:
            return {}
        default:
            return state;
    }
}


export const templateDeleteReducer = (state= {} , action)=>{
    switch (action.type) {
        case DELETE_TEMPLATE_REQUEST:
            return {loading: true}


        case DELETE_TEMPLATE_SUCCESS :
            return {loading:false, success:true}
        
        case DELETE_TEMPLATE_FAIL :
            return {loading: false, error:action.payload}

        default:
            return state
    }

}


export const templatePurchaseReducer = (state= {templatePurchase : {}} , action)=>{
    switch (action.type) {
        case TEMPLATE_PURCHASE_REQUEST:
            return {loading: true, ...state}


        case TEMPLATE_PURCHASE_SUCCESS :
            return {loading:false, templatePurchase :action.payload}
        
        case TEMPLATE_PURCHASE_FAIL :
            return {loading: false, error:action.payload}

        case TEMPLATE_PURCHASE_RESET:
            return {}

        default:
            return state
    }

}








export const templatePayReducer = (state= {} , action)=>{
    switch (action.type) {
        case  PAY_TEMPLATE_REQUEST:
            return {loading: true, }


        case  PAY_TEMPLATE_SUCCESS :
            return {loading:false, success:true}
        
        case PAY_TEMPLATE_FAIL :
            return {loading: false, error:action.payload}

        case PAY_TEMPLATE_RESET:
            return {}

        default:
            return state
    }

}

export const purchasedTemplateReducer = (state= {purchaseTemplate : {}} , action)=>{
    switch (action.type) {
        case PAID_TEMPLATE_REQUEST:
            return {loading: true, ...state}


        case PAID_TEMPLATE_SUCCESS :
            return {loading:false,
                success:true,
                 purchaseTemplate :action.payload}
        
        case PAID_TEMPLATE_FAIL :
            return {loading: false, error:action.payload}

        case PAID_TEMPLATE_RESET:
            return {}

        default:
            return state
    }

}

export const templateCreateReviewReducer = (state= { } , action)=>{
    switch (action.type) {
        case REVIEW_TEMPLATE_REQUEST:
            return {loading: true}


        case REVIEW_TEMPLATE_SUCCESS :
            return {loading:false, success:true, }


        case REVIEW_TEMPLATE_FAIL :
            return {loading:false, error:action.payload}

        case REVIEW_TEMPLATE_RESET :
            return {}

        default:
            return state
    }

}

export const templateTopReducer = (state={templates: []}, action)=>{
    switch (action.type) {
        case TEMPLATES_TOP_REQUEST:
            return {loading: true, }
            
        case TEMPLATES_TOP_SUCCESS:
            return {loading: false, 
                templates:action.payload
              
            }

        case TEMPLATES_TOP_FAIL:
            return {loading: false, error:action.payload}   
            
            
       
        default:
            return state;
    }
}