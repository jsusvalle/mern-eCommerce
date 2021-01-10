import React, {useEffect, useState, useContext} from 'react';
import {useRouter} from 'next/router';
import cartContext from '../../context/cart/cartContext';

import Layout from '../../components/layouts/Layout';
import CheckoutSteps from '../../components/CheckoutSteps';

const PlaceOrderScreen = () => {

    const router = useRouter();
    const CartContext = useContext(cartContext);
    const { cartItems, shippingAddress, paymentMethod } = CartContext;

    return (  
        <Layout>
            <div className="grid grid-cols-12 custom-container">
                <div className="col-span-8">
                    <CheckoutSteps step1 step2 step3 step4 />
                    <div className="border-gray-300 border-b pb-8">
                        <h2 className="text-4xl uppercase tracking-widest my-6 font-semibold">Shipping</h2>

                        <p className="text-gray-700">
                            <strong>Address: </strong>
                            {shippingAddress.address}, {shippingAddress.city}{' '} {shippingAddress.postalCode}, {' '}{shippingAddress.country}
                        </p>
                    </div>

                    <div className="border-gray-300 border-b pb-8">
                        <h2 className="text-4xl uppercase tracking-widest my-6 font-semibold">Payment Method</h2>

                        <strong className="text-gray-700">Method: {paymentMethod}</strong>
                    </div>
                    
                    <div className="border-gray-300 border-b pb-8">
                        <h2 className="text-4xl uppercase tracking-widest my-6 font-semibold">Order Items</h2>
                        {cartItems.lenght === 0 ? <Message> Your cart is empty</Message> : (
                            <div>
                                {cartItems.map((item, index) => (
                                    <div key={index}>
                                        <div>
                                            
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                    </div>
                    
                </div>
            </div>
            
        </Layout>
    );
}

export default PlaceOrderScreen;