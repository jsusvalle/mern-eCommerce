import React, {useEffect, useState, useContext} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import Layout from '../../components/layouts/Layout';
import Rating from '../../components/Rating';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

import productContext from '../../context/products/productContext';
import cartContext from '../../context/cart/cartContext';

const PageProduct = () => {

    const [qty, setQty] = useState(1);

    const ProductContext = useContext(productContext);
    const { product, loading, error, getProductById } = ProductContext;

    const CartContext = useContext(cartContext);
    const { addToCart } = CartContext;

    const router = useRouter();
    const { query: {id} } = router;

    useEffect(() => {
        if(id) {
            getProductById(id);
        }
    }, [id]);

    const addToCartHandler = () => {
        addToCart(id, Number(qty));
        router.push(`/cart`);
    }

    //TODO FIX SOME BUGS

    return (  
        <Layout>
            { loading ? (
                <Loader />
            ) : error ? (
                <Message color='red' variant='danger'>{error}</Message>
            ) : (
                    <div className="custom-container">
                        <div className="my-10">
                            <button onClick={() => router.back()}>
                                <p className="ml-5 uppercase hover:text-yellow-500 cursor-pointer font-semibold inline-block">Go Back</p>
                            </button>
                        </div>
    
                        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="md:col-span-2">
                                <Image src={`/static${product.image}`} alt={product.name} width={700} height={500} />
                            </div>
                            
                            <div className="text-gray-800">
                                <h3 className="text-4xl uppercase text-gray-700 leading-10 pb-5 border-b border-gray-300">{product.name}</h3>
                                
                                <Rating 
                                    value={product.rating} 
                                    text={`${product.numReviews} reviews`} 
                                    color={'#ecc94b'}
                                    classNames={'py-2'}
                                />
                                
                                <p className="border-b border-t border-gray-300 py-2">Price: ${product.price}</p>
    
                                <p className="pt-2" >Description: {product.description}</p>
                            </div>
                            
                            <div className="text-gray-800">
                                <div className="border-gray-400 border">
                                    <div className="border-gray-400 border-b flex justify-between">
                                        <div className="px-5 py-3">Price:</div>
                                        <div className="px-5 py-3">${product.price}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="px-5 py-3">Status:
                                        </div>
                                        <div className="px-5 py-3">{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</div>
                                    </div>

                                    {product.countInStock > 0 && (
                                        <div className="border-gray-400 border-t border-b flex justify-between">
                                            <div className="px-5 py-3">Qty:</div>
                                            <select className="inline-block mr-5 px-5 py-3" value={qty} onChange={(e) => setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
    
                                    <div>
                                        <div className="px-5 my-3 flex justify-center">
                                            <button className={`px-16 py-2 text-white ${product.countInStock === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-black'}`}
                                                onClick={addToCartHandler}
                                                disabled={product.countInStock === 0}
                                            >
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            )}
        </Layout>
    );
}

export default PageProduct;