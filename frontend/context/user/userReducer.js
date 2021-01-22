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
        case USER_DETAILS_FAIL:
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
                loading: true
            }
        case USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                userDetails: action.payload
            }
        case USER_DETAILS_RESET:
            return {
                ...state,
                userDetails: {}
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
                userDetails: action.payload
            }
        case USER_UPDATE_PROFILE_RESET:
            return {
                ...state,
                loading: false,
                success: false,
                error: ''
            }
        default: {
            return state;
        }
    }
}

export default UserReducer;
