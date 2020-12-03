import React, {useEffect, useState, useContext} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import Layout from '../../components/layouts/Layout';
import Rating from '../../components/Rating';
import Loader from '../../components/Loader';

import productContext from '../../context/products/productContext';

const PageProduct = () => {

    const ProductContext = useContext(productContext);
    const { product, loading, error, getProductById } = ProductContext;

    const router = useRouter();
    const { query: {id} } = router;

    useEffect(() => {
        if(id) {
            getProductById(id);
        }
    }, [id]);

    return (  
        <Layout>
            { loading ? (
                <Loader />
            ) : (
                    <div className="custom-container">
                        <div className="my-10">
                            <Link href="/">
                                <p className="ml-5 uppercase hover:text-yellow-500 cursor-pointer font-semibold inline-block">Go Back</p>
                            </Link>
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
                                <table className="table-auto">
                                    <tbody className="border-gray-400 border">
                                        <tr className="border-gray-400 border">
                                            <td className="px-5 py-3">Price:</td>
                                            <td className="px-5 py-3">${product.price}</td>
                                        </tr>
                                        <tr className="border-gray-400 border">
                                            <td className="px-5 py-3">Status:
                                            </td>
                                            <td className="px-5 py-3">{product.countInStock > 0 ? 'In Stock' : 'No Stock'}</td>
                                        </tr>
    
                                        <tr>
                                            <td className="px-5 my-3">
                                                <button className="px-10 py-2 bg-black text-white">
                                                    Add to cart
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
            )}
        </Layout>
    );
}

export default PageProduct;