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

const UserReducer = (state, action) => {
    switch(action.type) {
        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_LOGIN_SUCCESS: 
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            }
        case USER_UPDATE_PROFILE_FAIL:
        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {
                ...state,
                userInfo: {}
            }
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                userDetailsScreen: { loading: true }
            }
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                userDetailsScreen: { loading: false, success: true, userDetails: action.payload }
            }
        case USER_DETAILS_FAIL:
            return {
                ...state,
                userDetailsScreen: { loading: false, error: action.payload }
            }
        case USER_DETAILS_RESET:
            return {
                ...state,
                userDetailsScreen: { loading: false, success: false, userDetails: {}, error: '' }
            }
        case USER_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                userInfo: action.payload,
                userDetailsScreen: { userDetails: action.payload }
            }
        case USER_UPDATE_PROFILE_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                error: ''
            }
        case USER_LIST_REQUEST:
            return {
                ...state,
                userListScreen: { loading: true }
            }
        case USER_LIST_SUCCESS:
            return {
                ...state,
                userListScreen: { loading: false, success: true, userList: action.payload }
            }
        case USER_LIST_FAIL:
            return {
                ...state,
                userListScreen: { loading: false, error: action.payload }
            }
        default: {
            return state;
        }
    }
}

export default UserReducer;
