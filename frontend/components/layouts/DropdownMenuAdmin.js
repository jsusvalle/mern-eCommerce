import React, {useState} from 'react';
import Link from 'next/link';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';

const DropdownMenuAdmin = (props) => {

    const [isOpen, setIsOpen] = useState(false);

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
                        {props.items.map((item, index) => (
                            <div className='cursor-pointer' key={index} >
                                <Link
                                    href={item.link || '#'}
                                >
                                    <div className='block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600`}'>

                                        <span className="flex flex-col">
                                            <span>{item.label}</span>
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropdownMenuAdmin;