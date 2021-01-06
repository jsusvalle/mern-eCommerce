import React from 'react';
import styles from '../public/static/styles/loader.module.css';

const Loader = () => {
    return (
        <div className="flex justify-center content-center h-screen">
            <div className="lds_dual_ring"></div>
        </div>
    );
}

export default Loader;