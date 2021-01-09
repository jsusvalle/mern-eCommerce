import React from 'react';
import Link from 'next/link';

const CheckoutSteps = ({step1, step2, step3, step4}) => {
    return (  
        <div className="flex justify-around pt-6">
            <div className="hover:border-gray-800 border-b-2 transition duration-500 ease-in-out">
                {step1 ? (
                    <Link href="/login">
                        <p className="text-xl cursor-pointer select-none">Sign In</p>
                    </Link>
                ) : (
                    <p className="text-xl text-gray-600 select-none">Sign In</p>
                )}
            </div>

            <div className="hover:border-gray-800 border-b-2 transition duration-500 ease-in-out">
                {step2 ? (
                    <Link href="/cart/shipping">
                        <p className="text-xl cursor-pointer select-none">Shipping</p>
                    </Link>
                ) : (
                    <p className="text-xl text-gray-600 select-none">Shipping</p>
                )}
            </div>

            <div className="hover:border-gray-800 border-b-2 transition duration-500 ease-in-out">
                {step3 ? (
                    <Link href="/cart/payment">
                        <p className="text-xl cursor-pointer select-none">Payment</p>
                    </Link>
                ) : (
                    <p className="text-xl text-gray-600 select-none">Payment</p>
                )}
            </div>

            <div className="hover:border-gray-800 border-b-2 transition duration-500 ease-in-out">
                {step4 ? (
                    <Link href="/cart/placeorder">
                        <p className="text-xl cursor-pointer select-none">Place Order</p>
                    </Link>
                ) : (
                    <p className="text-xl text-gray-600 select-none">Place Order</p>
                )}
            </div>
        </div>
    );
}

export default CheckoutSteps;