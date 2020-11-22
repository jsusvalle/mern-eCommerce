import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Rating from './Rating';

const ProductCard = ({product}) => {
    return (  
        <Link href={{pathname: '/product/[id]',
                    query: { id: product._id }}} as={`/product/${product._id}`}>
            <div className="border border-gray-400 px-4 md:px-6 pt-6 pb-10 rounded-lg cursor-pointer">
                <div>
                    <Image src={`/static${product.image}`} alt={product.name} width={300} height={250} />
                </div>
                <div className="mx-auto px-4 md:px-6 tracking-wider pt-4">
                    <p className="mv:text-sm" >{product.name}</p>
                    
                    <Rating 
                        value={product.rating} 
                        text={`${product.numReviews} reviews`} 
                        color={'#ecc94b'}
                        classNames={'pt-3'}
                    />
                    
                    <div>
                        <p className="text-3xl pt-4">$ {product.price}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;