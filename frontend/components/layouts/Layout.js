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
                <link href="https://fonts.googleapis.com/css2?family=Arvo:wght@400;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" /> 
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet" />
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