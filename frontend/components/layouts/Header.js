import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons';

import userContext from '../../context/user/userContext'; 
import DropdownMenuProfile from './DropdownMenuProfile';
import DropdownMenuAdmin from './DropdownMenuAdmin';

const Header = () => {

    const itemsDropdownMenuAdmin = [
        {
            label: 'Users',
            link: '/admin/users'
        }, {
            label: 'Products',
            link: '/admin/products'
        },
        {
            label: 'Orders',
            link: '/admin/orders'
        }
    ]

    const UserContext = useContext(userContext);
    const { userInfo } = UserContext;

    const [stateuser, setStateUser] = useState({});

    useEffect(() => {
        setStateUser(userInfo);
    }, [userInfo, stateuser])

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

                    {Object.keys(stateuser).length === 0 ? (
                        <>
                            <Link href="/login">
                                <div className="transition duration-500 ease-in-out flex items-center hover:bg-gray-700 cursor-pointer p-2 rounded-lg">
                                    <FontAwesomeIcon icon={faUser} style={{marginRight: '7px'}} />
                                    <p>SIGN IN</p>
                                </div>
                            </Link>
                        </>
                    ) : (
                        <>
                            <DropdownMenuProfile label={userInfo.name} />
                        
                            {userInfo.isAdmin && <DropdownMenuAdmin label='Admin' items={itemsDropdownMenuAdmin} /> }
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;