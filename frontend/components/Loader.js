import React from 'react';
import styles from '../public/static/styles/loader.module.css';

const Loader = () => {
    return (  
        <div className={styles.sk_chase}>
            <div className={styles.sk_chase_dot}></div>
            <div className={styles.sk_chase_dot}></div>
            <div className={styles.sk_chase_dot}></div>
            <div className={styles.sk_chase_dot}></div>
            <div className={styles.sk_chase_dot}></div>
            <div className={styles.sk_chase_dot}></div>
        </div>
    );
}

export default Loader;