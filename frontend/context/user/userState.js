import React, { useReducer } from 'react';
import axios from 'axios';

import UserContext from './userContext';
import UserReducer from './userReducer';

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from '../../types/userConstants';

const UserState = props => {
    let userInfoFromStorage = [];

    if (typeof window !== 'undefined') {
        userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    }

    const initialState = {
        userInfo: userInfoFromStorage,
        loading: false,
        error: '',
    }

    // Crear dispatch y state
    const [state, dispatch] = useReducer(UserReducer, initialState);

    const login = async (email, password) => {
        try {
            dispatch({
                type: USER_LOGIN_REQUEST
            })

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.post('http://localhost:5000/api/users/login', {email, password}, config);

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })

            if (typeof window !== 'undefined') {
                localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
            }
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
        <UserContext.Provider
            value={{
                product: state.product,
                loading: state.loading,
                error: state.error,
                login,
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;