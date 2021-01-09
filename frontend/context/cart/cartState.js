import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

import CartContext from './cartContext';
import CartReducer from './cartReducer';

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from '../../types/cartConstants';

const CartState = props => {
    let cartItemsFromStorage = [];
    let shippingAddressFromStorage = {};
    let paymentMethodFromStorage = '';

    if (typeof window !== 'undefined') {
        cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
        shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
        paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : '';
    }
    
    const initialState = {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
    }

    const [state, dispatch] = useReducer(CartReducer, initialState);

    //*
    const addToCart = async (id, qty) => {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })

        typeof window !== 'undefined' && localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }

    const removeFromCart = id => {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: id
        })

        typeof window !== 'undefined' && localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }

    const saveShippingAddress = (data) => {
        dispatch({
            type: CART_SAVE_SHIPPING_ADDRESS,
            payload: data,
        })

        typeof window !== 'undefined' && localStorage.setItem('shippingAddress', JSON.stringify(data));
    }

    const savePaymentMethod = (data) => {
        dispatch({
            type: CART_SAVE_PAYMENT_METHOD,
            payload: data,
        })

        typeof window !== 'undefined' && localStorage.setItem('paymentMethod', JSON.stringify(data));
    }

    return (
        <CartContext.Provider
            value={{
                cartItems: state.cartItems,
                shippingAddress: state.shippingAddress,
                paymentMethod: state.paymentMethod,
                addToCart,
                removeFromCart,
                saveShippingAddress,
                savePaymentMethod
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartState;