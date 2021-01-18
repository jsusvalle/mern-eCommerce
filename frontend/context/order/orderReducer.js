import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL
} from '../../types/orderConstants';

const OrderReducer = (state, action) => {
    switch(action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_CREATE_SUCCESS: 
            return {
                ...state,
                loading: false,
                loadingscreenorder: true,
                success: true,
                order: action.payload,
            }
        case ORDER_CREATE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loadingscreenorder: true
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loadingscreenorder: false,
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                ...state,
                loadingscreenorder: false,
                error: action.payload
            }
        default: {
            return state;
        }
    }
}

export default OrderReducer;
