'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

const ResizableDraggableWindow = dynamic(() => import('@/app/components/ResizableDraggableWindow'), { ssr: false });
const ThisTerminal = dynamic(() => import('@/components/ThisTerminal'), { ssr: false });
const GlyphTypeout = dynamic(() => import('@/app/components/GlyphTypeout'), { ssr: false });
const ReportWindow = dynamic(() => import('@/app/components/ReportWindow'), { ssr: false });
const Brick = dynamic(() => import('@/app/components/Brick'), { ssr: false });

export default function Home() {
  const [showTerminal] = useState(false);
  const [showGlyphTypeout] = useState(true);
  const [showReports] = useState(true);
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
      boxSizing: 'border-box'
    }}>
      {/* Top half for Brick - now displaying yhghh.HTML in iframe */}
      {showBrick && (
        <div style={{
          width: '100%',
          height: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            border: '1px solid rgba(57, 255, 20, 0.3)',
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
        </div>
      )}
      
      {/* Bottom half split between reports and glyph typeout */}
      <div style={{
        width: '100%',
        height: '50%',
        display: 'flex',
        flexDirection: 'row',
        boxSizing: 'border-box'
      }}>
        {/* Left half - Reports */}
        {showReports && (
          <div style={{
            width: '50%',
            height: '100%',
            padding: '20px',
            boxSizing: 'border-box'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '10px',
              border: '1px solid rgba(57, 255, 20, 0.3)',
              padding: '10px',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              <div style={{
                fontWeight: 'bold',
                color: 'rgba(57, 255, 20, 1)',
                textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
                letterSpacing: '1px',
                fontSize: '1.2em',
                marginBottom: '10px'
              }}>
                Reports
              </div>
              <div style={{ height: 'calc(100% - 30px)', overflow: 'hidden' }}>
                <ReportWindow onReportOpen={handleReportOpen} />
              </div>
            </div>
          </div>
        )}
        
        {/* Right half - Glyph Typeout */}
        {showGlyphTypeout && (
          <div style={{
            width: '50%',
            height: '100%',
            padding: '20px',
            boxSizing: 'border-box'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '10px',
              border: '1px solid rgba(57, 255, 20, 0.3)',
              padding: '10px',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              <div style={{
                fontWeight: 'bold',
                color: 'rgba(57, 255, 20, 1)',
                textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
                letterSpacing: '1px',
                fontSize: '1.2em',
                marginBottom: '10px'
              }}>
                Glyph Typeout
              </div>
              <div style={{ height: 'calc(100% - 30px)', overflow: 'hidden' }}>
                <GlyphTypeout speed={30} fontSize="0.9rem" />
              </div>
            </div>
          </div>
        )}
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
