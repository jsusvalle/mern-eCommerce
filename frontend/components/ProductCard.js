import React from 'react';
import Image from 'next/image';

const ProductCard = ({product}) => {
    return (  
        <div className="border border-gray-400 px-6 pt-6 pb-10 rounded-lg">
            <div>
                <Image src={`/static${product.image}`} alt={product.name} width={300} height={250} />
            </div>
            <div className="container mx-auto px-6 tracking-wider pt-4">
                <p className="">{product.name}</p>
                <div className="pt-3">
                    <p className="text-gray-800">starts {product.numReviews} reviews</p>
                </div>
                <div>
                    <p className="text-3xl pt-4">$ {product.price}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;