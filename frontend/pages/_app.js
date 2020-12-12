import '../public/static/styles/main.css';
import UserState from '../context/user/userState';
import ProductState from '../context/products/productState';
import CartState from '../context/cart/cartState';

function MyApp({ Component, pageProps }) {
  return (
    <UserState>
      <ProductState>
        <CartState>
          <Component {...pageProps} />
        </CartState>
      </ProductState>
    </UserState>
  )
}

export default MyApp
