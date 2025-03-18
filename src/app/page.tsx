'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/app/components/Navbar'), { ssr: false });
const ThisTerminal = dynamic(() => import('@/components/ThisTerminal'), { ssr: false });
const Brick = dynamic(() => import('@/app/components/Brick'), { ssr: false });
const ResizableDraggableWindow = dynamic(() => import('@/app/components/ResizableDraggableWindow'), { ssr: false });

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(0.7);
  const [showTerminal] = useState(false);
  const [showBrick] = useState(true);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  // Mobile detection
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

  // Set initial scale based on device
  useEffect(() => {
    setScale(isMobile ? 0.5 : 0.7);
  }, [isMobile]);

  // Handle scale change
  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

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
      padding: '0',
      boxSizing: 'border-box',
    }}>
      {/* Navbar - positioned fixed at top */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100
      }}>
        <Navbar />
      </div>
      
      {/* Full-page iframe displaying the brick */}
      <iframe 
        src="/yhghh.HTML" 
        style={{ 
          width: '100%', 
          height: '100%', 
          border: 'none',
          backgroundColor: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
          marginTop: isMobile ? '50px' : '60px', // Match navbar height
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          pointerEvents: 'auto'
        }}
        title="The Emerald Brick Of KEK"
        allowFullScreen={true}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
      
      {/* Mobile controls overlay */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderTop: '1px solid rgba(57, 255, 20, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 90,
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%',
          marginBottom: '5px',
          textAlign: 'center',
          fontSize: isMobile ? '0.8rem' : '0.9rem',
          color: 'rgba(57, 255, 20, 0.9)'
        }}>
          Scale Control: {scale.toFixed(1)}
        </div>
        <input 
          type="range" 
          min="0.1" 
          max="1.0" 
          step="0.1" 
          value={scale} 
          onChange={handleScaleChange}
          style={{
            width: '80%',
            maxWidth: '300px',
            appearance: 'none',
            height: '4px',
            backgroundColor: 'rgba(57, 255, 20, 0.3)',
            borderRadius: '4px',
            outline: 'none',
            cursor: 'pointer'
          }}
        />
        <style jsx global>{`
          input[type=range]::-webkit-slider-thumb {
            appearance: none;
            width: 15px;
            height: 15px;
            background: rgba(57, 255, 20, 0.9);
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 5px rgba(57, 255, 20, 0.7);
          }
          input[type=range]::-moz-range-thumb {
            width: 15px;
            height: 15px;
            background: rgba(57, 255, 20, 0.9);
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 5px rgba(57, 255, 20, 0.7);
            border: none;
          }
        `}</style>
      </div>
      
      {/* Main content area - now empty but could contain other components in the future */}
      <div style={{
        width: '100%',
        height: 'calc(100% - 60px)', 
        position: 'relative',
        zIndex: 1,
        marginTop: '60px',
        pointerEvents: 'none' 
      }}>
        {/* This area is now empty but visible on top of the background */}
      </div>
      
      {/* Terminal (hidden) */}
      {showTerminal && (
        <ResizableDraggableWindow
          key={`terminal-${Date.now()}`}
          title="Terminal"
          initialWidth={Math.min(600, window.innerWidth * 0.45)}
          initialHeight={Math.min(500, window.innerHeight * 0.6)}
          initialX={window.innerWidth * 0.1}
          initialY={window.innerHeight * 0.1}
          zIndex={8}
          style={{ 
            width: Math.min(600, window.innerWidth * 0.45),
            height: Math.min(500, window.innerHeight * 0.6),
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
