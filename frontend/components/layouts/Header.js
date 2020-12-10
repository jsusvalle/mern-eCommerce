import React from 'react';
import Link from 'next/link';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (  
        <header className="bg-gray-800">
            <div className="custom-container flex justify-between items-center">
                <div>
                    <Link href="/">
                        <h1 className="text-white text-3xl my-6 cursor-pointer">SHOPCART</h1>
                    </Link>
                </div>
                <nav className="flex text-white">
                    <Link href="/cart">
                        <div className="transition duration-500 ease-in-out flex items-center mr-5 hover:bg-gray-700 cursor-pointer p-2 rounded-lg">
                            <FontAwesomeIcon icon={faShoppingCart} style={{marginRight: '7px'}} />
                            <p>CART</p>
                        </div>
                    </Link>
        
                    <div className="transition duration-500 ease-in-out flex items-center hover:bg-gray-700 cursor-pointer p-2 rounded-lg">
                        <FontAwesomeIcon icon={faUser} style={{marginRight: '7px'}} />
                        <p>SIGN IN</p>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;