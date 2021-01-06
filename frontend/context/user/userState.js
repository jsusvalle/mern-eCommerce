import React, { useReducer } from 'react';
import instanceApi from '../../config/axiosConfig';

import UserContext from './userContext';
import UserReducer from './userReducer';

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
} from '../../types/userConstants';

const UserState = props => {
    let userInfoFromStorage = {};

    if (typeof window !== 'undefined') {
        userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    }

    const initialState = {
        userInfo: userInfoFromStorage,
        userDetails: {},
        loading: false,
        success: false,
        error: '',
    }

    const [state, dispatch] = useReducer(UserReducer, initialState);

    //* Login User
    const login = async (email, password) => {
        try {
            dispatch({
                type: USER_LOGIN_REQUEST
            })

            const { data } = await instanceApi.post('/api/users/login', {email, password});

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

            const { data } = await instanceApi.post('/api/users', {name, email, password});

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
    
    //* User Details
    const getUserDetails = async (id) => {
        try {
            dispatch({
                type: USER_DETAILS_REQUEST
            })

            const { userInfo } = state;

            instanceApi.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;

            const { data } = await instanceApi.get(`api/users/${id}`);

            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: data
            })

        } catch (error) {
            dispatch({
                type: USER_DETAILS_FAIL,
                payload: error.response && error.response.data.message 
                                ? error.response.data.message 
                                : error.message
            })
        }
    } 

    //* Update User Profile
    const updateUserProfile = async (user) => {
        try {
            dispatch({
                type: USER_UPDATE_PROFILE_REQUEST
            })

            const { userInfo } = state;

            instanceApi.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;

            const { data } = await instanceApi.put(`api/users/profile`, user);

            dispatch({
                type: USER_UPDATE_PROFILE_SUCCESS,
                payload: data
            })

            if (typeof window !== 'undefined') {
                localStorage.setItem('userInfo', JSON.stringify(data))
            }

            setTimeout(() => {
                dispatch({
                    type: USER_UPDATE_PROFILE_RESET
                })
            }, 3000);
        } catch (error) {
            dispatch({
                type: USER_DETAILS_FAIL,
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
                userDetails: state.userDetails,
                loading: state.loading,
                error: state.error,
                success: state.success,
                login,
                logOut,
                register,
                getUserDetails,
                updateUserProfile,
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;