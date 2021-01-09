import React, {useEffect, useState, useContext} from 'react';
import {useRouter} from 'next/router';
import cartContext from '../../context/cart/cartContext';

import Layout from '../../components/layouts/Layout';
import CheckoutSteps from '../../components/CheckoutSteps';

const ShippingScreen = () => {

    const CartContext = useContext(cartContext);
    const { shippingAddress, saveShippingAddress } = CartContext;

    const [address, setAdress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();
        saveShippingAddress(({address, city, postalCode, country}));
        router.push('/cart/payment');
    }

    return (  
        <Layout>
            <div className="mx-auto px-24 sm:px-48 md:px-64">
                <CheckoutSteps step1 step2 />
                <h2 className="text-4xl uppercase tracking-widest my-6 font-semibold">Shipping</h2>

                <form onSubmit={submitHandler}>
                    <div className="my-6 flex flex-col">
                        <label className="inline-block mb-2 text-gray-600">Address</label>
                        <input className="block py-4 px-6 bg-gray-300" required 
                        type="text" placeholder="Enter Address" value={address} onChange={(e) => setAdress(e.target.value)} />
                    </div>
                    <div className="my-6 flex flex-col">
                        <label className="inline-block mb-2 text-gray-600">City</label>
                        <input className="block py-4 px-6 bg-gray-300" required
                        type="text" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="my-6 flex flex-col">
                        <label className="inline-block mb-2 text-gray-600">Postal Code</label>
                        <input className="block py-4 px-6 bg-gray-300" required
                        type="text" placeholder="Enter Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    </div>
                    <div className="my-6 flex flex-col">
                        <label className="inline-block mb-2 text-gray-600">Country</label>
                        <input className="block py-4 px-6 bg-gray-300" 
                        type="text" placeholder="Enter Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>

                    <button type="submit" className="px-6 py-4 text-white bg-black uppercase">
                        Continue
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default ShippingScreen;