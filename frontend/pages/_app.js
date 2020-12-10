import '../public/static/styles/main.css';
import ProductState from '../context/products/productState';
import CartState from '../context/cart/cartState';

function MyApp({ Component, pageProps }) {
  return (
    <ProductState>
      <CartState>
        <Component {...pageProps} />
      </CartState>
    </ProductState>
  )
}

export default MyApp
