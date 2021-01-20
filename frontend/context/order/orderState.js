import React, { useReducer } from 'react';
import instanceApi from '../../config/axiosConfig';

import OrderContext from './orderContext';
import OrderReducer from './orderReducer';

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
} from '../../types/orderConstants';

const OrderState = props => {
    const initialState = {
        order: {},
        loading: false,
        success: false,
        error: '',
        orderDetailsScreen: {
            loading: true,
            success: false,
            error: '' 
        }, 
        orderPay: {
            loading: false,
            success: false,
            error: '' 
        }
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(OrderReducer, initialState);

    //* Create Order
    const createOrder = async (order, userInfo) => {
        try {
            dispatch({ type: ORDER_CREATE_REQUEST });

            instanceApi.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;

            const { data: {createdOrder} } = await instanceApi.post(`api/orders`, order);

            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: createdOrder
            })

        } catch (error) {
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload: error.response && error.response.data.message 
                                ? error.response.data.message 
                                : error.message
            })
        }
    } 

    //* Get order by ID
    const getOrderDetails = async (orderID, userInfo) => {
        try {
            dispatch({ type: ORDER_DETAILS_REQUEST })

            instanceApi.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;

            const { data } = await instanceApi.get(`api/orders/${orderID}`);

            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: ORDER_DETAILS_FAIL,
                payload: error.response && error.response.data.message 
                                ? error.response.data.message 
                                : error.message
            })
        }
    } 

    //* Put order Pay
    const payOrder = async (orderID, paymentResult, userInfo) => {
        console.log(userInfo)
        try {
            dispatch({ type: ORDER_PAY_REQUEST })

            instanceApi.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;

            const { data } = await instanceApi.put(`api/orders/${orderID}/pay`,paymentResult);

            dispatch({ type: ORDER_PAY_SUCCESS })
        } catch (error) {
            dispatch({
                type: ORDER_PAY_FAIL,
                payload: error.response && error.response.data.message 
                                ? error.response.data.message 
                                : error.message
            })
        }
    } 

    const resetStateOrder = () => {
        dispatch({ type: ORDER_PAY_RESET });
    }

    return (
        <OrderContext.Provider
            value={{
                order: state.order,
                loading: state.loading,
                success: state.success,
                error: state.error,
                orderDetailsScreen: state.orderDetailsScreen,
                orderPay: state.orderPay,
                createOrder,
                getOrderDetails,
                payOrder,
                resetStateOrder
            }}
        >
            {props.children}
        </OrderContext.Provider>
    )
}

export default OrderState;