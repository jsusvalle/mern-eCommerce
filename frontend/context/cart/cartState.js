import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

import CartContext from './cartContext';
import CartReducer from './cartReducer';

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS
} from '../../types/cartConstants';

const CartState = props => {
    let cartItemsFromStorage = [];
    let shippingAddressFromStorage = {};

    if (typeof window !== 'undefined') {
        cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
        shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};
    }
    
    const initialState = {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
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

        if (typeof window !== 'undefined') {
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        }
    }

    const removeFromCart = id => {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: id
        })

        if (typeof window !== 'undefined') {
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        }
    }

    const saveShippingAddress = (data) => {
        dispatch({
            type: CART_SAVE_SHIPPING_ADDRESS,
            payload: data,
        })

        typeof window !== 'undefined' && localStorage.setItem('shippingAddress', JSON.stringify(data))
    }

    return (
        <CartContext.Provider
            value={{
                cartItems: state.cartItems,
                shippingAddress: state.shippingAddress,
                addToCart,
                removeFromCart,
                saveShippingAddress
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartState;