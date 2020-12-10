import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

import CartContext from './cartContext';
import CartReducer from './cartReducer';

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
} from '../../types/cartConstants';

const CartState = props => {
    let cartItemsFromStorage = [];

    if (typeof window !== 'undefined') {
        cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    }
    
    const initialState = {
        cartItems: cartItemsFromStorage,
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

    return (
        <CartContext.Provider
            value={{
                cartItems: state.cartItems,
                addToCart
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartState;