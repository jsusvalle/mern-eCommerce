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
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
} from '../../types/userConstants';

import { ORDER_MY_LIST_RESET } from '../../types/orderConstants';

const UserState = props => {
    let userInfoFromStorage = {};

    if (typeof window !== 'undefined') {
        userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    }

    const initialState = {
        userInfo: userInfoFromStorage,
        userListScreen: {userList: [], loading: false, success: false, error: ''},
        userDetailsScreen: { userDetails: {}, loading: false, success: false, error: '' },
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

    //* Logout User
    const logOut = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('userInfo');
        }
        dispatch({ type: USER_LOGOUT })
        dispatch({ type: USER_DETAILS_RESET })
        dispatch({ type: ORDER_MY_LIST_RESET })
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
                type: USER_UPDATE_PROFILE_FAIL,
                payload: error.response && error.response.data.message 
                                ? error.response.data.message 
                                : error.message
            })
        }
    } 

    //* Get List Users
    //* User Details
    const getListUsers = async () => {
        try {
            dispatch({
                type: USER_LIST_REQUEST
            })

            const { userInfo } = state;

            instanceApi.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;

            const { data } = await instanceApi.get(`api/users`);

            dispatch({
                type: USER_LIST_SUCCESS,
                payload: data
            })

        } catch (error) {
            dispatch({
                type: USER_LIST_FAIL,
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
                userDetailsScreen: state.userDetailsScreen,
                userListScreen: state.userListScreen,
                loading: state.loading,
                error: state.error,
                success: state.success,
                login,
                logOut,
                register,
                getUserDetails,
                updateUserProfile,
                getListUsers
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;