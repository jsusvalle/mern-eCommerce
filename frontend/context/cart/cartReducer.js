import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
} from '../../types/cartConstants';

const CartReducer = (state, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;

            const existItem = state.cartItems.find(x => x.product === item.product)

            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM: 
            return state;
        default: {
            return state;
        }
    }
}

export default CartReducer;
