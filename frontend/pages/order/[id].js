import React, {useEffect, useState, useContext} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Image from 'next/image';

import orderContext from '../../context/order/orderContext';
import userContext from '../../context/user/userContext';

import Layout from '../../components/layouts/Layout';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { addDecimals } from '../../utils/priceOperations';

const OrderScreen = () => {

    const router = useRouter();
    const { query: {id} } = router;

    const OrderContext = useContext(orderContext);
    const { order, loadingscreenorder, error, getOrderDetails } = OrderContext;

    const UserContext = useContext(userContext);
    const { userInfo } = UserContext;

    let itemsPrice;

    useEffect(() => {
        if(id) {
            getOrderDetails(id, userInfo);
        }
    }, [id]);

    if(!loadingscreenorder && Object.keys(order).length !== 0) {
        itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0));
    }

    return (  
        <Layout>
            { loadingscreenorder || Object.keys(order).length === 0 ? (
                <Loader />
            ) : error ? (
                <Message color='red' variant='danger'>{error}</Message>
            ) : ( 
                <>
                    <h1 className="text-4xl uppercase tracking-widest my-6 ml-12 font-semibold break-words">Order {order._id}</h1>
                    <div className="lg:grid lg:grid-cols-12 gap-4 custom-container text-gray-700">
                        <div className="col-span-8">
                            <h2 className="text-4xl uppercase tracking-widest my-6 font-semibold">Shipping</h2>
                            <div className="border-gray-300 border-b pb-8">
                                <p><strong>Name: </strong> {order.user.name}</p>
                                <p><strong>Email: </strong><Link href={`mailto:${order.user.email}`}>{order.user.email}</Link></p> 

                                <p>
                                    <strong>Address: </strong>
                                    {`${order.shippingAddress.address} ${order.shippingAddress.postalCode} ${order.shippingAddress.city}, ${order.shippingAddress.country}`}
                                </p>
                                {order.isDelivered ? <Message color="blue" variant="700">Delivered on {order.deliveredAt}</Message> :
                                    <Message color="red" variant="400">Not Delivered</Message>
                                }
                            </div>

                            <div className="border-gray-300 border-b pb-8">
                                <h2 className="text-4xl uppercase tracking-widest my-6 font-semibold">Payment Method</h2>

                                <p><strong>Method: </strong> {order.paymentMethod}</p>
                                {order.isPaid ? <Message color="blue" variant="700">Paid on {order.paidAt}</Message> :
                                    <Message color="red" variant="400">Not Paid</Message>
                                }
                            </div>
                            
                            <div className="border-gray-300 border-b pb-8">
                                <h2 className="text-4xl uppercase tracking-widest my-6 font-semibold">Order Items</h2>
                                {order.orderItems.lenght === 0 ? <Message> Order is empty</Message> : (
                                    <div>
                                        {order.orderItems.map((item, index) => (
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
                                        <p className="pt-4 px-6 font-semibold">Items</p>
                                    </div>
                                    <div>
                                        <p className="pt-4 px-6">
                                            ${itemsPrice}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between pb-4 border-gray-300 border-b">
                                    <div>
                                        <p className="pt-4 px-6 font-semibold">Shipping</p>
                                    </div>
                                    <div>
                                        <p className="pt-4 px-6">
                                            ${order.shippingPrice}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between pb-4 border-gray-300 border-b">
                                    <div>
                                        <p className="pt-4 px-6 font-semibold">Tax</p>
                                    </div>
                                    <div>
                                        <p className="pt-4 px-6">
                                            ${order.taxPrice}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="pt-4 px-6 font-semibold">Total</p>
                                    </div>
                                    <div>
                                        <p className="pt-4 px-6">
                                            ${order.totalPrice}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Layout>
    )
}

export default OrderScreen;