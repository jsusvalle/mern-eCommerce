import React, {useEffect, useState, useContext} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

import userContext from '../../context/user/userContext';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes, faCheck, faTrash, faUserEdit} from '@fortawesome/free-solid-svg-icons';

import Layout from '../../components/layouts/Layout';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const UsersAdminPage = () => {

    const UserContext = useContext(userContext);
    const {userInfo, getListUsers, userListScreen : {userList, loading: loadingUserList, success: successUserList, error: errorUserList }} = UserContext;

    const router = useRouter();

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            getListUsers();
        } else {
            router.push('/login')
        }
    }, [userInfo]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            // deleteUser(id)
        }
    }
    
    return (  
        <Layout>
            <div className="custom-container">
                <h2 className="text-4xl uppercase tracking-widest my-6 font-semibold">Users</h2>

                {loadingUserList ? (
                    <Loader />
                ) : errorUserList ? (
                    <Message color="red" variant="500">{errorUserList}</Message>
                ) : ( 
                    <table className="table p-4 bg-white shadow rounded-lg">
                        <thead>
                            <tr>
                                <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                                    #
                                </th>
                                <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                                    ID
                                </th>
                                <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                                    NAME
                                </th>
                                <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                                    EMAIL
                                </th>
                                <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                                    ADMIN
                                </th>
                                <th className="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                                    ACTIONS
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((user, index) => (
                                <tr className="text-gray-700" key={index}>
                                    <td className="border-b-2 p-4 dark:border-dark-5">
                                        {index + 1}
                                    </td>
                                    <td className="border-b-2 p-4 dark:border-dark-5">
                                        {user._id}
                                    </td>
                                    <td className="border-b-2 p-4 dark:border-dark-5">
                                        {user.name}
                                    </td>
                                    <td className="border-b-2 p-4 dark:border-dark-5">
                                        <Link href={`mailto:${user.email}`}>{user.email}</Link>
                                    </td>
                                    <td className="border-b-2 p-4 dark:border-dark-5">
                                        {user.isAdmin 
                                            ? <FontAwesomeIcon icon={faCheck} style={{color: '#22543d', marginLeft: '18px'}} />
                                            : <FontAwesomeIcon icon={faTimes} style={{color: '#c53030', marginLeft: '18px'}} />
                                        }
                                    </td>
                                    <td className="border-b-2 p-4 dark:border-dark-5">
                                        <div className="flex items-center">
                                            <Link href={`/admin/user/${user._id}/edit`}>
                                                <button type="button" className="w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2 border-r border-gray-300">
                                                    <FontAwesomeIcon icon={faUserEdit} style={{color: '#4a5568'}} />
                                                </button>
                                            </Link>
                                            <button type="button" className="w-full border-t border-b border-r text-base font-medium rounded-r-md text-black bg-white hover:bg-gray-100 px-4 py-2" onClick={() => deleteHandler(user._id)}>
                                                <FontAwesomeIcon icon={faTrash} style={{color: '#c53030'}} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                )}
            </div>
        </Layout>
    );
}

export default UsersAdminPage;