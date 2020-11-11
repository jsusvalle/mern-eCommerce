import React from 'react';
import Image from 'next/image';
import Rating from './Rating';

const ProductCard = ({product}) => {
    return (  
        <div className="border border-gray-400 px-4 md:px-6 pt-6 pb-10 rounded-lg">
            <div>
                <Image src={`/static${product.image}`} alt={product.name} width={300} height={250} />
            </div>
            <div className="mx-auto px-4 md:px-6 tracking-wider pt-4">
                <p className="mv:text-sm" >{product.name}</p>
                
                <Rating 
                    value={product.rating} 
                    text={`${product.numReviews} reviews`} 
                    color={'#ecc94b'}
                />
                
                <div>
                    <p className="text-3xl pt-4">$ {product.price}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;