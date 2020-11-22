import Layout from '../components/layouts/Layout';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Home = ({products}) => {
  return (
    <Layout>
      <section className="custom-container">
        <h2 className="text-4xl uppercase tracking-widest my-6 font-semibold">Latest Products</h2>

        <div className="grid gap-4 grid-cols-1 mv:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => ((
            <ProductCard product={product} key={product._id} />
          )))}
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  let {data} = await axios.get('http://localhost:5000/api/products');
  return {
    props: {products: data}
  }
}

export default Home;
