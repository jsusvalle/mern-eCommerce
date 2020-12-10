import {
    PRODUCT_BY_ID_REQUEST,
    PRODUCT_BY_ID_SUCCESS,
    PRODUCT_BY_ID_FAIL
} from '../../types/productConstants';

const ProductReducer = (state, action) => {
    switch(action.type) {
        case PRODUCT_BY_ID_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_BY_ID_SUCCESS: 
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case PRODUCT_BY_ID_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: {
            return state;
        }
    }
}

export default ProductReducer;
