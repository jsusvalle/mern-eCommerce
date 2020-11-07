import React from 'react'

const Header = () => {
    return (  
        <div className="bg-gray-800">
            <div className="container flex mx-auto px-10 justify-between items-center">
                <div>
                    <h1 className="text-white text-3xl my-6">SHOPCART</h1>
                </div>
                <div className="flex text-white">
                    <div className="transition duration-500 ease-in-out flex items-center mr-5 hover:bg-gray-700 cursor-pointer p-2 rounded-lg">
                        <i className="material-icons mr-1">shopping_cart</i>
                        <p>CART</p>
                    </div>
                    <div className="transition duration-500 ease-in-out flex items-center hover:bg-gray-700 cursor-pointer p-2 rounded-lg">
                        <i className="material-icons mr-1">account_circle</i>
                        <p>SIGN IN</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;