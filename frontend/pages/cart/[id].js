import React, {useContext, useEffect} from 'react';
import {useRouter} from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import cartContext from '../../context/cart/cartContext';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import Layout from '../../components/layouts/Layout';
import Message from '../../components/Message';

const CartScreen = () => {

    const CartContext = useContext(cartContext);
    const { cartItems, addToCart } = CartContext;

    const router = useRouter();
    const productId = router.query.id;
    const qty = router.query.qty ? router.query.qty : 1;

    useEffect(() => {
        if(productId) {
            addToCart(productId, Number(qty));
        }
    }, [addToCart, productId, qty]);

    const removeFromCartHandler = id => {

    }

    return (  
        <Layout>
            <div className="custom-container md:grid md:gap-8 md:grid-cols-6">
                <div className="col-span-4">
                    <h2 className="text-4xl uppercase tracking-widest my-6 font-semibold">Shopping Cart</h2>

                    {cartItems.length === 0 
                        ? <Message>None products in Cart</Message> 
                        : cartItems.map(item => (
                            <div key={item.product}>
                                <div className="grid gap-6 grid-cols-5 justify-items-center items-center pb-2 mb-4 border-gray-200 border-b text-gray-800">
                                    <div>
                                        <Image src={`/static${item.image}`} width={150} height={120} alt={item.product} />
                                    </div>
                                    <div>
                                        <Link href={{pathname: '/product/[id]',
                                            query: { id: item.product }}} as={`/product/${item.product}`} 
                                        >{item.name}</Link>
                                    </div>
                                    <div>
                                        <p>{item.price}</p>
                                    </div>
                                    <div>
                                        <select className="inline-block px-5 py-3" 
                                            value={item.qty}
                                            onChange={(e) => addToCart(item.product, Number(e.target.value))}
                                        >
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <button className="p-4"
                                            onClick={() => removeFromCartHandler(item.product)} 
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="col-start-5 col-span-2">
                    <div className="border-gray-300 border px-6 pb-4 mt-4">
                        <h3 className="pt-4 text-3xl uppercase tracking-widest text-gray-700 font-semibold">Subtotal ({cartItems.length}) items</h3>
                        <p className="pt-4">$</p>
                    </div>
                    <div className="py-4 flex justify-center border-gray-300 border-b border-l border-r">
                        <button className="px-20 py-2 text-white bg-black uppercase" 
                                    
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default CartScreen;