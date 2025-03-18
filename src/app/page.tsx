'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

const ResizableDraggableWindow = dynamic(() => import('@/app/components/ResizableDraggableWindow'), { ssr: false });
const ThisTerminal = dynamic(() => import('@/components/ThisTerminal'), { ssr: false });
const Brick = dynamic(() => import('@/app/components/Brick'), { ssr: false });
const Navbar = dynamic(() => import('@/app/components/Navbar'), { ssr: false });

export default function Home() {
  const [showTerminal] = useState(false);
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

  const handleReportOpen = (reportHtml: string) => {
    setSelectedReport(reportHtml);
  };

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      backgroundColor: 'black', 
      color: 'rgba(57, 255, 20, 0.56)', 
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start', 
      alignItems: 'center', 
      padding: '0',
      boxSizing: 'border-box',
      paddingTop: '60px' // Add padding to account for fixed navbar
    }}>
      {/* Full-page background iframe */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden'
      }}>
        <iframe 
          src="/yhghh.HTML" 
          style={{ 
            width: '100%', 
            height: '100%', 
            border: 'none',
            backgroundColor: 'transparent'
          }}
          title="The Emerald Brick Of KEK"
        />
      </div>
      
      {/* Navbar - now appearing on top of the iframe background */}
      <Navbar />
      
      {/* Main content area - now empty but could contain other components in the future */}
      <div style={{
        width: '100%',
        height: 'calc(100% - 60px)', 
        position: 'relative',
        zIndex: 1
      }}>
        {/* This area is now empty but visible on top of the background */}
      </div>
      
      {/* Terminal (hidden) */}
      {showTerminal && (
        <ResizableDraggableWindow
          key={`terminal-${windowSize.key}`}
          title="Terminal"
          initialWidth={Math.min(600, windowSize.width * 0.45)}
          initialHeight={Math.min(500, windowSize.height * 0.6)}
          initialX={windowSize.width * 0.1}
          initialY={windowSize.height * 0.1}
          zIndex={8}
          style={{ 
            width: Math.min(600, windowSize.width * 0.45),
            height: Math.min(500, windowSize.height * 0.6),
            margin: '0'
          }}
        >
          <ThisTerminal />
        </ResizableDraggableWindow>
      )}
      
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
