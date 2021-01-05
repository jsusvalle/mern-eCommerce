import React, {useEffect, useState, useContext} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import userContext from '../../context/user/userContext';

import Layout from '../../components/layouts/Layout';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const LoginScreen = () => {

    const UserContext = useContext(userContext);
    const {login, userInfo, loading, error} = UserContext;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const router = useRouter();
    const redirect = router.query.redirect ? `/cart/${router.query.redirect}` : '/';

    useEffect(() => {
        if(Object.keys(userInfo).length !== 0) {
            router.push(`${redirect}`);
        }
    }, [router, userInfo, redirect]);

    const submitHandler = e => {
        e.preventDefault();

        login(email, password);
    } 

    return (  
        <Layout>
            <div className="mx-auto px-24 sm:px-48 md:px-64">
                <h2 className="text-4xl uppercase tracking-widest my-6 font-semibold">SIGN IN</h2>
                {error && <Message variant='600'>{error}</Message>}
                {loading && <Loader />}

                <form onSubmit={submitHandler}>
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

                    <button type="submit" className="px-6 py-4 text-white bg-black uppercase">
                        Sign In
                    </button>

                    <div className="mt-4">
                        <span className="text-gray-700">New Customer? <Link href="/login/register"><p className="inline-block font-black text-black cursor-pointer">Register</p></Link></span>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default LoginScreen;