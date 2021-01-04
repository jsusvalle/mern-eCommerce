import React, { useReducer } from 'react';
import axios from 'axios';

import UserContext from './userContext';
import UserReducer from './userReducer';

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
} from '../../types/userConstants';

const UserState = props => {
    let userInfoFromStorage = {};

    if (typeof window !== 'undefined') {
        userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    }

    const initialState = {
        userInfo: userInfoFromStorage,
        loading: false,
        error: '',
    }

    const [state, dispatch] = useReducer(UserReducer, initialState);

    //* Login User
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
                localStorage.setItem('userInfo', JSON.stringify(data))
            }
        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response && error.response.data.message 
                            ? error.response.data.message 
                            : error.message
            })
        }
    } 

    const logOut = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('userInfo');
        }
        dispatch({ type: USER_LOGOUT })
    }

    //* Register User
    const register = async (name, email, password) => {
        try {
            dispatch({
                type: USER_REGISTER_REQUEST
            })

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.post('http://localhost:5000/api/users', {name, email, password}, config);

            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data
            })

            if (typeof window !== 'undefined') {
                localStorage.setItem('userInfo', JSON.stringify(data))
            }
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: error.response && error.response.data.message 
                            ? error.response.data.message 
                            : error.message
            })
        }
    } 

    return (
        <UserContext.Provider
            value={{
                userInfo: state.userInfo,
                loading: state.loading,
                error: state.error,
                login,
                logOut,
                register
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;