'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/app/components/Navbar'), { ssr: false });

export default function InfoPage() {
  return (
    <div style={{ 
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
      paddingTop: '60px' // Account for navbar
    }}>
      {/* Navbar */}
      <Navbar />
      
      {/* Info Content */}
      <div style={{
        width: '80%',
        maxWidth: '800px',
        padding: '40px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '10px',
        border: '1px solid rgba(57, 255, 20, 0.3)',
        margin: '40px auto',
        boxShadow: '0 0 20px rgba(57, 255, 20, 0.2)'
      }}>
        <h1 style={{
          color: 'rgba(57, 255, 20, 0.9)',
          textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          Information
        </h1>
        
        <div style={{
          lineHeight: '1.6',
          fontSize: '1.1rem',
          color: 'rgba(57, 255, 20, 0.8)'
        }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
          </p>
          <p>
            Suspendisse in orci enim. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse in orci enim.
          </p>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          </p>
          <p>
            Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.
          </p>
          <p>
            THIS - The Holistic Integration System is a groundbreaking framework designed to seamlessly merge digital and conceptual realms. By incorporating advanced algorithmic principles with memetic theory, THIS creates a self-evolving system capable of transcending traditional computational boundaries.
          </p>
        </div>
        
        <div style={{
          marginTop: '40px',
          textAlign: 'center'
        }}>
          <Link href="/">
            <button style={{
              backgroundColor: 'transparent',
              color: 'rgba(57, 255, 20, 0.8)',
              border: '1px solid rgba(57, 255, 20, 0.3)',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}>
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
