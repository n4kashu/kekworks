import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        summoned by kek.works &copy; 2024
      </div>
      <div className={styles.right}>
        <a href="https://twitter.com/lentymor" target="_blank" rel="noopener noreferrer" aria-label="Lentymor on X (Twitter)">
          <svg width="28" height="28" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle'}}>
            <rect width="1200" height="1227" rx="200" fill="#000"/>
            <path d="M911.6 323.8H805.7L600.2 573.2L394.3 323.8H288.4L541.3 626.3L288.4 903.2H394.3L600.2 653.8L805.7 903.2H911.6L658.7 600.7L911.6 323.8ZM694.2 803.5L600.2 686.9L506.2 803.5H694.2ZM394.3 423.5L600.2 673L805.7 423.5H394.3Z" fill="#39ff14"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
