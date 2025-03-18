'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Check if device is mobile on client side
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav style={{
      width: '100%',
      height: isMobile ? '50px' : '60px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderBottom: '1px solid rgba(57, 255, 20, 0.3)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '0 10px' : '0 20px',
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
        fontSize: isMobile ? '0.9rem' : '1.4rem',
        textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
        letterSpacing: '1px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: isMobile ? '60%' : '70%',
      }}>
        THIS - The Holistic Integration System
      </div>
      
      {/* Mobile menu button */}
      {isMobile && (
        <div 
          onClick={toggleMenu}
          style={{
            cursor: 'pointer',
            padding: '5px',
            zIndex: 1001
          }}
        >
          <div style={{
            width: '25px',
            height: '3px',
            backgroundColor: 'rgba(57, 255, 20, 0.8)',
            margin: '4px 0',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            boxShadow: '0 0 5px rgba(57, 255, 20, 0.5)'
          }}></div>
          <div style={{
            width: '25px',
            height: '3px',
            backgroundColor: 'rgba(57, 255, 20, 0.8)',
            margin: '4px 0',
            transition: 'all 0.3s',
            opacity: menuOpen ? 0 : 1,
            boxShadow: '0 0 5px rgba(57, 255, 20, 0.5)'
          }}></div>
          <div style={{
            width: '25px',
            height: '3px',
            backgroundColor: 'rgba(57, 255, 20, 0.8)',
            margin: '4px 0',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            boxShadow: '0 0 5px rgba(57, 255, 20, 0.5)'
          }}></div>
        </div>
      )}
      
      {/* Right side - Navigation items */}
      <div style={{
        display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
        gap: isMobile ? '10px' : '20px',
        flexDirection: isMobile ? 'column' : 'row',
        position: isMobile ? 'absolute' : 'static',
        top: isMobile ? '50px' : 'auto',
        right: 0,
        backgroundColor: isMobile ? 'rgba(0, 0, 0, 0.9)' : 'transparent',
        padding: isMobile ? '15px' : 0,
        borderBottomLeftRadius: isMobile ? '10px' : 0,
        borderLeft: isMobile ? '1px solid rgba(57, 255, 20, 0.3)' : 'none',
        borderBottom: isMobile ? '1px solid rgba(57, 255, 20, 0.3)' : 'none',
        boxShadow: isMobile ? '0 5px 15px rgba(0, 0, 0, 0.5)' : 'none',
      }}>
        <Link href="/">
          <div style={{
            color: 'rgba(57, 255, 20, 0.8)',
            cursor: 'pointer',
            padding: '5px 10px',
            borderRadius: '4px',
            transition: 'all 0.3s ease',
            border: '1px solid rgba(57, 255, 20, 0.3)',
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            width: isMobile ? '120px' : 'auto',
            textAlign: 'center',
          }} className="nav-item">
            Home
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
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            width: isMobile ? '120px' : 'auto',
            textAlign: 'center',
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
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            width: isMobile ? '120px' : 'auto',
            textAlign: 'center',
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
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            width: isMobile ? '120px' : 'auto',
            textAlign: 'center',
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
        
        @media (max-width: 768px) {
          .nav-item:hover {
            transform: scale(1.05);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
