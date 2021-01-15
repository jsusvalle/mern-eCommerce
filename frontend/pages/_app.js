import '../public/static/styles/main.css';
import UserState from '../context/user/userState';
import ProductState from '../context/products/productState';
import CartState from '../context/cart/cartState';
import OrderState from '../context/order/orderState';

function MyApp({ Component, pageProps }) {
  return (
    <UserState>
      <ProductState>
        <CartState>
          <OrderState>
            <Component {...pageProps} />
          </OrderState>
        </CartState>
      </ProductState>
    </UserState>
  )
}

export default MyApp
