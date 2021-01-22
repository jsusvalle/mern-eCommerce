import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS,
    ORDER_MY_LIST_FAIL,
    ORDER_MY_LIST_RESET,
} from '../../types/orderConstants';

const OrderReducer = (state, action) => {
    switch(action.type) {
        case ORDER_MY_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_MY_LIST_SUCCESS: 
            return {
                ...state,
                loading: false,
                myOrdersList: action.payload,
            }
        case ORDER_MY_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ORDER_MY_LIST_RESET:
            return {
                ...state,
                myOrdersList: []
            }
        case ORDER_CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ORDER_CREATE_SUCCESS: 
            return {
                ...state,
                loading: false,
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
                orderDetailsScreen: { loading: true, success: false }
            }
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                orderDetailsScreen: { loading: false, success: true },   
                order: action.payload
            }
        case ORDER_DETAILS_FAIL:
            return {
                ...state,
                orderDetailsScreen: { loading: false },
                error: action.payload
            }
        case ORDER_PAY_REQUEST:
            return {
                ...state,
                orderPay: { loading: true },
            }
        case ORDER_PAY_SUCCESS:
            return {
                ...state,
                orderPay: { loading: false, success: true },
            }
        case ORDER_PAY_FAIL:
            return {
                ...state,
                error: action.payload,
                orderPay: { loading: false }
            }
        case ORDER_PAY_RESET:
            return {
                ...state,
                orderPay: { loading: false, success: false }
            }
        default: {
            return state;
        }
    }
}

export default OrderReducer;
