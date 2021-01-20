import React, {useEffect, useState, useContext} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import userContext from '../../context/user/userContext';
import orderContext from '../../context/order/orderContext';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

import Layout from '../../components/layouts/Layout';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const ProfileScreen = () => {
    const UserContext = useContext(userContext);
    const {getUserDetails, updateUserProfile, userDetails, userInfo, loading, error, success} = UserContext;

    const OrderContext = useContext(orderContext);
    const { myOrdersList, loading: loadingOrders, error: errorOrders, getMyListOrders } = OrderContext;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const router = useRouter();

    useEffect(() => {
        if(!userInfo) {
            router.push('/login');
        } else {
            if(Object.keys(userDetails).length === 0) {
                getUserDetails('profile');
                getMyListOrders(userInfo);
            } else {
                setName(userDetails.name)
                setEmail(userDetails.email)
            }
        }
    }, [userDetails, router, userInfo]);

    const submitHandler = e => {
        e.preventDefault();

        if(password !== confirmpassword) {
            setMessage('Passwords do not match');
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } else {
            updateUserProfile({id: userDetails._id, name, email, password});
            setName(userDetails.name)
            setEmail(userDetails.email)
            setConfirmPassword('');
            setPassword('');
        }
    } 

    //TODO * FIX RESPONSIVE TABLE

    return (  
        <Layout>
            <div className="grid gap-10 md:grid-cols-5 custom-container">
                <div className="col-span-2">
                    <h2 className="text-4xl uppercase tracking-widest my-6 font-semibold">Profile</h2>
                    {message && <Message color='red' variant='500'>{message}</Message>}
                    {error && <Message color='red' variant='600'>{error}</Message>}
                    {success && <Message color='green' variant='700'>Profile Updated</Message>}
                    {loading && <Loader />}

                    <form onSubmit={submitHandler}>
                        <div className="my-6 flex flex-col">
                            <label className="inline-block mb-2 text-gray-600">Name Adress</label>
                            <input className="block py-4 px-6 bg-gray-300" 
                            type="name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="my-6 flex flex-col">
                            <label className="inline-block mb-2 text-gray-600">Email Adress</label>
                            <input className="block py-4 px-6 bg-gray-300" 
                            type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="my-6 flex flex-col">
                            <label className="inline-block mb-2 text-gray-600">Password Adress</label>
                            <input className="block py-4 px-6 bg-gray-300" 
                            type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="my-6 flex flex-col">
                            <label className="inline-block mb-2 text-gray-600">Confirm Password</label>
                            <input className="block py-4 px-6 bg-gray-300" 
                            type="password" placeholder="Confirm password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>

                        <button type="submit" className="px-6 py-4 text-white bg-black uppercase">
                            Update Profile
                        </button>
                    </form>
                </div>

                <div className="mt-4 col-span-3">
                    <h3 className="text-4xl uppercase tracking-widest my-6 font-semibold">My Orders</h3>       
                    {loadingOrders ? <Loader /> : errorOrders ? <Message color="red" variant="500">{errorOrders}</Message> : (
                        <div>
                            <div className="shadow overflow-hidden rounded border-b border-gray-200">
                                <table className="min-w-full bg-white">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Id</th>
                                            <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Date</th>
                                            <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Total</th>
                                            <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Paid</th>
                                            <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Delivered</th>
                                            <th className="text-left py-3 px-2 uppercase font-semibold text-sm">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-700">
                                        {myOrdersList.map((order, index) => (
                                            <tr key={index}>
                                                <td className="text-left py-3 px-2 break-words">{order._id}</td>
                                                <td className="text-left py-3 px-2">{order.createdAt.substring(0, 10)}</td>
                                                <td className="text-left py-3 px-2">{order.totalPrice}</td>
                                                <td className="text-left py-3 px-2">
                                                    { order.isPaid ? (
                                                        order.paidAt.substring(0, 10)
                                                    ) : (
                                                        <FontAwesomeIcon icon={faTimes} style={{color: '#c53030', marginTop: '12px', marginLeft: '25px'}} />
                                                    )}
                                                </td>
                                                <td className="text-left py-3 px-2">
                                                    { order.isDelivered ? (
                                                        order.deliveredAt.substring(0, 10)
                                                    ) : (
                                                        <FontAwesomeIcon icon={faTimes} style={{color: '#c53030', marginTop: '12px', marginLeft: '25px'}} />
                                                    )}
                                                </td>
                                                <td className="text-left py-3 px-2">
                                                    <Link href={{pathname: '/order/[id]',
                                                        query: { id: order._id }}} as={`/order/${order._id}`} 
                                                    >
                                                        <button>
                                                            Details
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default ProfileScreen;