import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL
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
        default: {
            return state;
        }
    }
}

export default UserReducer;
