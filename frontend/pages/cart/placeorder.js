import React, {useEffect, useState, useContext} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Image from 'next/image';

import cartContext from '../../context/cart/cartContext';
import orderContext from '../../context/order/orderContext';
import userContext from '../../context/user/userContext';

import Layout from '../../components/layouts/Layout';
import CheckoutSteps from '../../components/CheckoutSteps';
import Message from '../../components/Message';

import {addDecimals} from '../../utils/priceOperations';

const PlaceOrderScreen = () => {

    const router = useRouter();
    const CartContext = useContext(cartContext);
    const { cartItems, shippingAddress, paymentMethod } = CartContext;

    const OrderContext = useContext(orderContext);
    const { order, success, error, createOrder } = OrderContext;

    const UserContext = useContext(userContext);
    const { userInfo } = UserContext;

    //* Calculate Prices

    const itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0));

    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);

    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));

    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

    useEffect(() => {
        if(success) {
            router.push(`/order/${order._id}`);
        }
    }, [success])

    const placeOrderHandler = () => {
        createOrder(({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }), userInfo);
    }

    return (  
        <Layout>
            <div className="lg:grid lg:grid-cols-12 gap-4 custom-container">
                <div className="col-span-8">
                    <CheckoutSteps step1 step2 step3 step4 />
                    <div className="border-gray-300 border-b pb-8">
                        <h2 className="text-4xl uppercase tracking-widest my-6 font-semibold">Shipping</h2>

                        <p className="text-gray-700">
                            <strong>Address: </strong>
                            {`${shippingAddress.address} ${shippingAddress.postalCode} ${shippingAddress.postalCode}, ${shippingAddress.country}`}
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
                                    <div key={index} className="grid gap-2 grid-cols-6 items-center ml-4 mb-4 pb-4 border-gray-300 border-b">
                                        <div className="flex justify-center">
                                            <Image src={`/static${item.image}`} width={40} height={30} alt={item.product} />
                                        </div>
                                        <div className="col-start-2 col-span-3 text-gray-800">
                                            <Link href={{pathname: '/product/[id]',
                                                query: { id: item.product }}} as={`/product/${item.product}`} 
                                            >{item.name}</Link>
                                        </div>
                                        <div className="col-start-5 col-span-2">
                                            <p>{item.qty} x ${item.price} = {item.qty * item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-start-9 col-span-4">
                    <div className="border-gray-300 border pb-4 mt-4">
                        <div className="border-gray-300 border-b">
                            <h3 className="px-6 py-4 text-3xl uppercase tracking-widest text-gray-700 font-semibold">Order Summary</h3>
                        </div>
                        <div className="flex justify-between pb-4 border-gray-300 border-b">
                            <div>
                                <p className="pt-4 px-6 font-semibold text-gray-700">Items</p>
                            </div>
                            <div>
                                <p className="pt-4 px-6">
                                    ${itemsPrice}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between pb-4 border-gray-300 border-b">
                            <div>
                                <p className="pt-4 px-6 font-semibold text-gray-700">Shipping</p>
                            </div>
                            <div>
                                <p className="pt-4 px-6">
                                    ${shippingPrice}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between pb-4 border-gray-300 border-b">
                            <div>
                                <p className="pt-4 px-6 font-semibold text-gray-700">Tax</p>
                            </div>
                            <div>
                                <p className="pt-4 px-6">
                                    ${taxPrice}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="pt-4 px-6 font-semibold text-gray-700">Total</p>
                            </div>
                            <div>
                                <p className="pt-4 px-6">
                                    ${totalPrice}
                                </p>
                            </div>
                        </div>
                        <div>
                            {error && <Message color='red' variant='600'>{error}</Message>}
                            {success && <Message color='green' variant='700'>Order Success</Message>}
                        </div>
                    </div>
                    <div className="py-4 flex justify-center border-gray-300 border-b border-l border-r">
                        <button className="px-20 py-2 text-white bg-black uppercase" 
                            onClick={placeOrderHandler}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
            
        </Layout>
    );
}

export default PlaceOrderScreen;