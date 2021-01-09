import React from 'react';
import Link from 'next/link';

const CheckoutSteps = ({step1, step2, step3, step4}) => {
    return (  
        <div className="flex justify-around pt-6">
            <div>
                {step1 ? (
                    <Link href="/login">
                        <p className="text-xl cursor-pointer select-none">Sign In</p>
                    </Link>
                ) : (
                    <p className="text-xl text-gray-600 cursor-pointer select-none">Sign In</p>
                )}
            </div>

            <div>
                {step2 ? (
                    <Link href="/shipping">
                        <p className="text-xl cursor-pointer select-none">Shipping</p>
                    </Link>
                ) : (
                    <p className="text-xl text-gray-600 cursor-pointer select-none">Shipping</p>
                )}
            </div>

            <div>
                {step3 ? (
                    <Link href="/payment">
                        <p className="text-xl cursor-pointer select-none">Payment</p>
                    </Link>
                ) : (
                    <p className="text-xl text-gray-600 cursor-pointer select-none">Payment</p>
                )}
            </div>

            <div>
                {step4 ? (
                    <Link href="/placeorder">
                        <p className="text-xl cursor-pointer select-none">Place Order</p>
                    </Link>
                ) : (
                    <p className="text-xl text-gray-600 cursor-pointer select-none">Place Order</p>
                )}
            </div>
        </div>
    );
}

export default CheckoutSteps;