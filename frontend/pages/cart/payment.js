import React, {useEffect, useState, useContext} from 'react';
import {useRouter} from 'next/router';
import cartContext from '../../context/cart/cartContext';

import Layout from '../../components/layouts/Layout';
import CheckoutSteps from '../../components/CheckoutSteps';

const PaymentScreen = () => {

    const router = useRouter();
    const CartContext = useContext(cartContext);
    const { shippingAddress, savePaymentMethod } = CartContext;

    if(!shippingAddress) {
        router.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault();
        savePaymentMethod(paymentMethod);
        router.push('/cart/placeorder');
    }

    return (  
        <Layout>
            <div className="mx-auto px-24 sm:px-48 md:px-64">
                <CheckoutSteps step1 step2 step3 />
                <h2 className="text-4xl uppercase tracking-widest my-6 font-semibold">Payment Method</h2>

                <form onSubmit={submitHandler}>
                    <h3 className="text-3xl my-4 text-gray-600">Select Method</h3>
                    <div className="my-6 flex flex-col">
                        <label className="inline-block mb-2 text-gray-600">PayPal or Credit Card</label>
                        <input type="radio" name="paymentMethod" id="PayPal" value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)} />
                    </div>

                    <button type="submit" className="px-6 py-4 text-white bg-black uppercase">
                        Continue
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default PaymentScreen;