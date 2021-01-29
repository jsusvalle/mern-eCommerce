import React, {useState, useContext} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown, faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';

import userContext from '../../context/user/userContext'; 

const DropdownMenuProfile = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const UserContext = useContext(userContext);
    const { logOut } = UserContext;

    const router = useRouter();

    const logOutUser = () => {
        router.push('/login');
        logOut();
    }

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className='flex items-center justify-center w-full rounded-md px-4 py-2 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500'
                    id="options-menu"
                >
                    {props.label}

                    <FontAwesomeIcon icon={faAngleDown} style={{marginLeft: '7px'}} />
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                    <div
                        className='py-1 divide-y divide-gray-100'
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        <div className='cursor-pointer'>
                            <Link
                                href='/profile'
                            >
                                <div className={`flex items-center px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600`}>
                                    <FontAwesomeIcon icon={faUser} style={{marginRight: '10px'}} />

                                    <span className="flex flex-col">
                                        <span>Profile</span>
                                    </span>
                                </div>
                            </Link>
                        </div>

                        <div className='cursor-pointer'>
                            <button
                                onClick={logOutUser}
                                className='w-full'
                            >
                                <div className={`flex items-center px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600`}>
                                    <FontAwesomeIcon icon={faSignOutAlt} style={{marginRight: '10px'}} />

                                    <span className="flex flex-col">
                                        <span>LogOut</span>
                                    </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropdownMenuProfile;