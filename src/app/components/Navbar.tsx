'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles['navbar-inner']}>
        <div className={styles.logo}>
          
        </div>
        <div className={styles['nav-links']}>
          <Link href="/">
            <div className={styles['nav-item']}>THIS</div>
          </Link>
          <Link href="/brick-research">
            <div className={styles['nav-item']}>Brick Research</div>
          </Link>

          <Link href="/lore">
            <div className={styles['nav-item']}>Lore</div>
          </Link>
          <Link href="/info">
            <div className={styles['nav-item']}>Info</div>
          </Link>
          <Link href="/about">
            <div className={styles['nav-item']}>WhoAmI?</div>
          </Link>

          <a href="https://stampverse.io" target="_blank" rel="noopener noreferrer">
            <div className={styles['nav-item']}>Mint</div>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
