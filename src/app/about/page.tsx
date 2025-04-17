'use client';

import React from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/app/components/Navbar'), { ssr: false });

export default function AboutPage() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
        color: 'rgba(57, 255, 20, 0.56)',
        overflow: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '0',
        boxSizing: 'border-box',
        paddingTop: '60px', // Account for navbar
      }}
    >
      <Navbar />
      <div
        style={{
          width: '80%',
          maxWidth: '800px',
          padding: '40px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '10px',
          border: '1px solid rgba(57, 255, 20, 0.3)',
          margin: '40px auto',
          boxShadow: '0 0 20px rgba(57, 255, 20, 0.2)',
        }}
      >
        <h1
          style={{
            color: 'rgba(57, 255, 20, 0.9)',
            textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          About
        </h1>
        <div
          style={{
            lineHeight: '1.6',
            fontSize: '1.1rem',
            color: 'rgba(57, 255, 20, 0.8)',
            textAlign: 'center',
          }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div
          style={{
            marginTop: '40px',
            textAlign: 'center',
          }}
        >
          <Link href="/">
            <button
              style={{
                backgroundColor: 'transparent',
                color: 'rgba(57, 255, 20, 0.8)',
                border: '1px solid rgba(57, 255, 20, 0.3)',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
              }}
            >
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
