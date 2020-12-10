import React, { useReducer } from 'react';
import axios from 'axios';

import ProductContext from './productContext';
import ProductReducer from './productReducer';

import {
    PRODUCT_BY_ID_REQUEST,
    PRODUCT_BY_ID_SUCCESS,
    PRODUCT_BY_ID_FAIL
} from '../../types/productConstants';

const ProductState = props => {
    const initialState = {
        product: {},
        loading: false,
        error: '',
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(ProductReducer, initialState);

    //*
    const getProductById = async id => {
        try {
            dispatch({ type: PRODUCT_BY_ID_REQUEST })

            const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
            
            dispatch({
                type: PRODUCT_BY_ID_SUCCESS,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_BY_ID_FAIL,
                payload: error.response && error.response.data.message 
                            ? error.response.data.message 
                            : error.message
            })
        }
    }

    

    return (
        <ProductContext.Provider
            value={{
                product: state.product,
                loading: state.loading,
                error: state.error,
                getProductById,
            }}
        >
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductState;