import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart, faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';

import userContext from '../../context/user/userContext'; 

const Header = () => {

    const UserContext = useContext(userContext);
    const { userInfo, logOut } = UserContext;

    const [stateuser, setStateUser] = useState({});

    const router = useRouter();

    useEffect(() => {
        setStateUser(userInfo);
    }, [userInfo, stateuser])

    const logOutUser = () => {
        router.push('/login');
        logOut();
    }

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
                        <Link href="/profile">
                            <div className="transition duration-500 ease-in-out flex items-center hover:bg-gray-700 cursor-pointer p-2 rounded-lg mr-5">
                                <p>{userInfo.name} Profile</p>
                            </div>
                        </Link>

                        <button onClick={logOutUser} className="transition duration-500 ease-in-out flex items-center hover:bg-gray-700 cursor-pointer p-2 rounded-lg">
                            <FontAwesomeIcon icon={faSignOutAlt} style={{marginRight: '7px'}} />
                            <p>Logout</p>
                        </button>
                    </>
                    )
                    }
                </nav>
            </div>
        </header>
    );
}

export default Header;