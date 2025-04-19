'use client';

import React from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/app/components/Navbar'), { ssr: false });

const AboutPage = () => {
  return (
    <iframe 
      src="/about.html" 
      title="About Content"
      style={{ 
        width: '100%', 
        height: '100%', 
        border: 'none',
        display: 'block'
      }}
    />
  );
};

export default AboutPage;

