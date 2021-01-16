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
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_CREATE_SUCCESS: 
            return {
                ...state,
                loading: false,
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
        case ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload
            }
        default: {
            return state;
        }
    }
}

export default OrderReducer;
