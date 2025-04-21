'use client';

import React from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/app/components/Navbar'), { ssr: false });

import styles from './about.module.css';



const AboutPage = () => (
  <div className={styles.mainContainer}>
    <div className={styles.bookContainer} style={{ marginTop: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '40vh' }}>
      <h1 style={{ textAlign: 'center', width: '100%' }}>Mortylen - Master Orchestrator Of Replication Technology</h1>
     
     
    </div>
  </div>
);

export default AboutPage;

