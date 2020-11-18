import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons';
import {faStar as faStarBlank} from '@fortawesome/free-regular-svg-icons';

const Rating = ({total=5, value, text, color}) => {

    const renderRating = () => {
        const stars = [];
        let increment = 0;
            
        for (let i = 1; i <= total; i++) {
            let dot = increment + 0.5;
            const iconSelect = value >= i ? faStar : value >= dot ? faStarHalfAlt : faStarBlank;
            stars.push(<FontAwesomeIcon icon={iconSelect} style={{color}} key={i} />);
            increment++;
        }
    
        return stars;
    };

    return (  
        <div className="pt-3">
            <p className="text-gray-800">
                {renderRating()} {text}
            </p>
        </div>
    );
}

export default Rating;