import React from 'react';
import Image from 'next/image';

const ProductCard = ({product}) => {
    return (  
        <div className="border-2 border-black rounded-lg">
            <div>
                <Image src={`/static${product.image}`} alt={product.name} width={300} height={250} />
            </div>
            <div>
                <p>{product.name}</p>
                <div>
                    <p>starts {product.numReviews} reviews</p>
                </div>
                <div>
                    <p>$ {product.price}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;