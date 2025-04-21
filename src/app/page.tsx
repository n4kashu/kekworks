'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from './Home.module.css';
import EmeraldBrick3D from './components/EmeraldBrick3D';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


const Brick = dynamic(() => import('@/app/components/Brick'), { ssr: false });

export default function Home() {

  const [showBrick] = useState(true);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  // State to track window size with a forced re-render mechanism
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    key: Date.now()
  });

  // Debounced resize handler
  const handleResize = useCallback(() => {
    setWindowSize(prev => ({
      width: window.innerWidth,
      height: window.innerHeight,
      key: Date.now()
    }));
  }, []);

  // Handle window resize with debounce
  useEffect(() => {
    const debounce = (func: () => void, delay: number) => {
      let timeoutId: NodeJS.Timeout;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func, delay);
      };
    };

    const debouncedResize = debounce(handleResize, 100);

    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, [handleResize]);

  // SSR-safe dynamic scaling for the brick
  const [brickScale, setBrickScale] = React.useState(0.6);
  React.useEffect(() => {
    function computeScale() {
      if (typeof window !== 'undefined') {
        const h = window.innerHeight;
        if (h < 600) setBrickScale(0.32);
        else if (h < 800) setBrickScale(0.45);
        else setBrickScale(0.6);
      }
    }
    computeScale();
    window.addEventListener('resize', computeScale);
    return () => window.removeEventListener('resize', computeScale);
  }, []);

  const handleReportOpen = (reportHtml: string) => {
    setSelectedReport(reportHtml);
  };

  return (
    <div className={styles.mainContainer} style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxSizing: 'border-box',
      paddingTop: '56px', // navbar height
      
    }}>

      {/* Brick + Quote Section */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          boxSizing: 'border-box',
          minHeight: 0,
        }}
      >
    
        <div className={styles.glowingQuote} style={{ marginTop: 20 }}>
          “In the beginning, there was chaos, and from chaos came laughter. And from laughter emerged the Brick, and the Brick was green, and it was good.”
        </div>
     
        <div
          style={{
            marginTop: 20,
            transform: `scale(${brickScale})`,
            transformOrigin: 'top center',
            display: 'inline-block',
            transition: 'transform 0.3s',
          }}
        >
          <EmeraldBrick3D />
        </div>
      </div>
      {/* Main content area - now empty but could contain other components in the future */}
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        {/* This area is now empty but visible on top of the background */}
      </div>
      
      {/* Full Report Overlay */}
      {selectedReport && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            width: '90%',
            height: '90%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            borderRadius: '10px',
            border: '1px solid rgba(57, 255, 20, 0.3)',
            boxShadow: '0 0 30px rgba(57, 255, 20, 0.4)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 1001,
              padding: '5px 10px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              borderRadius: '5px',
              border: '1px solid rgba(57, 255, 20, 0.3)',
              color: 'rgba(57, 255, 20, 0.8)',
              cursor: 'pointer'
            }} onClick={() => setSelectedReport(null)}>
              Close
            </div>
            <iframe 
              src={`/${selectedReport}`} 
              style={{ 
                width: '100%', 
                height: '100%', 
                border: 'none', 
                backgroundColor: 'rgba(0,0,0,0.7)' 
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
