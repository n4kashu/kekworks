'use client';

import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav style={{
      width: '100%',
      height: '60px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderBottom: '1px solid rgba(57, 255, 20, 0.3)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
    }}>
      {/* Left side - Title */}
      <div style={{
        fontFamily: 'monospace',
        fontWeight: 'bold',
        color: 'rgba(57, 255, 20, 0.9)',
        fontSize: '1.4rem',
        textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
        letterSpacing: '1px',
      }}>
        THIS - The Holistic Integration System
      </div>
      
      {/* Right side - Navigation items */}
      <div style={{
        display: 'flex',
        gap: '20px',
      }}>
        <Link href="/">
          <div style={{
            color: 'rgba(57, 255, 20, 0.8)',
            cursor: 'pointer',
            padding: '5px 10px',
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(57, 255, 20, 0.3)',
            fontSize: '0.9rem',
          }} className="nav-item">
            Home
          </div>
        </Link>
        <Link href="/reports">
          <div style={{
            color: 'rgba(57, 255, 20, 0.8)',
            cursor: 'pointer',
            padding: '5px 10px',
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(57, 255, 20, 0.3)',
            fontSize: '0.9rem',
          }} className="nav-item">
            Reports
          </div>
        </Link>
        <Link href="/brick-research">
          <div style={{
            color: 'rgba(57, 255, 20, 0.8)',
            cursor: 'pointer',
            padding: '5px 10px',
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(57, 255, 20, 0.3)',
            fontSize: '0.9rem',
          }} className="nav-item">
            Brick Research
          </div>
        </Link>
        <Link href="/info">
          <div style={{
            color: 'rgba(57, 255, 20, 0.8)',
            cursor: 'pointer',
            padding: '5px 10px',
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(57, 255, 20, 0.3)',
            fontSize: '0.9rem',
          }} className="nav-item">
            Info
          </div>
        </Link>
        <a href="https://stampverse.io" target="_blank" rel="noopener noreferrer">
          <div style={{
            color: 'rgba(57, 255, 20, 0.8)',
            cursor: 'pointer',
            padding: '5px 10px',
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(57, 255, 20, 0.3)',
            fontSize: '0.9rem',
          }} className="nav-item">
            Mint
          </div>
        </a>
      </div>
      
      {/* Global styles */}
      <style jsx global>{`
        .nav-item:hover {
          background-color: rgba(57, 255, 20, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(57, 255, 20, 0.3);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
