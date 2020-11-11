import Layout from '../components/layouts/Layout';
import ProductCard from '../components/ProductCard';
import products from '../products';

const Home = () => {
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

// export async function getStaticProps() {
//   let result = await fetch(products);
//   return {
//     props: {products: products}
//   }
// }

export default Home;
