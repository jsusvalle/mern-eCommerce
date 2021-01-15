import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

const Layout = props => {
    return (  
        <>
            <Head>
                <title>ShopCart Ecommerce</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta
                    name="description"
                    content="Ecommerce ShopCart"
                />
            </Head>

            <Header />

            <>
                {props.children}
            </>

            <Footer />
        </>
    );
}

export default Layout;