import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (  
        <header className="bg-gray-800">
            <div className="custom-container flex justify-between items-center">
                <div>
                    <h1 className="text-white text-3xl my-6">SHOPCART</h1>
                </div>
                <nav className="flex text-white">
                    <div className="transition duration-500 ease-in-out flex items-center mr-5 hover:bg-gray-700 cursor-pointer p-2 rounded-lg">
                        <FontAwesomeIcon icon={faShoppingCart} style={{marginRight: '7px'}} />
                        <p>CART</p>
                    </div>
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