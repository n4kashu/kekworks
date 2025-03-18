'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

const ResizableDraggableWindow = dynamic(() => import('@/app/components/ResizableDraggableWindow'), { ssr: false });
const ThisTerminal = dynamic(() => import('@/components/ThisTerminal'), { ssr: false });
const GlyphTypeout = dynamic(() => import('@/app/components/GlyphTypeout'), { ssr: false });
const ReportWindow = dynamic(() => import('@/app/components/ReportWindow'), { ssr: false });

export default function Home() {
  const [showTerminal] = useState(false);
  const [showGlyphTypeout] = useState(false);
  const [showReports, setShowReports] = useState(true);
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
      padding: '20px',
      boxSizing: 'border-box',
      gap: '20px'
    }}>
      {/* Main content container with grid layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gridGap: '20px',
        width: '100%',
        maxWidth: '1600px',
        height: 'calc(100% - 40px)',
        margin: '0 auto'
      }}>
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
        
        {showGlyphTypeout && (
          <ResizableDraggableWindow
            key={`glyph-${windowSize.key}`}
            title="Glyph Typeout"
            initialWidth={Math.min(500, windowSize.width * 0.4)}
            initialHeight={Math.min(400, windowSize.height * 0.5)}
            initialX={windowSize.width * 0.5}
            initialY={windowSize.height * 0.15}
            zIndex={9}
            style={{ 
              width: Math.min(500, windowSize.width * 0.4),
              height: Math.min(400, windowSize.height * 0.5),
              margin: '0'
            }}
          >
            <GlyphTypeout fontSize="0.9rem" />
          </ResizableDraggableWindow>
        )}
        
        {showReports && (
          <ResizableDraggableWindow
            key={`reports-${windowSize.key}`}
            title="Reports"
            initialWidth={Math.min(650, windowSize.width * 0.5)}
            initialHeight={Math.min(600, windowSize.height * 0.7)}
            initialX={windowSize.width * 0.25}
            initialY={windowSize.height * 0.15}
            zIndex={10}
            style={{ 
              width: Math.min(650, windowSize.width * 0.5),
              height: Math.min(600, windowSize.height * 0.7),
              margin: '0'
            }}
          >
            <ReportWindow onReportOpen={handleReportOpen} />
          </ResizableDraggableWindow>
        )}
      </div>
      
      {/* Full Report Overlay */}
      {selectedReport && (
        <ResizableDraggableWindow
          key={`report-${windowSize.key}`}
          title={`Report: ${selectedReport}`}
          initialWidth={Math.min(windowSize.width * 0.9, 1200)}
          initialHeight={Math.min(windowSize.height * 0.9, 800)}
          initialX={(windowSize.width - Math.min(windowSize.width * 0.9, 1200)) / 2}
          initialY={(windowSize.height - Math.min(windowSize.height * 0.9, 800)) / 2}
          zIndex={1000}
          onClose={() => setSelectedReport(null)}
          style={{ 
            width: Math.min(windowSize.width * 0.9, 1200),
            height: Math.min(windowSize.height * 0.9, 800),
            margin: '0',
            position: 'fixed',
            boxShadow: '0 0 30px rgba(57, 255, 20, 0.4)'
          }}
        >
          <iframe 
            src={`/${selectedReport}`} 
            style={{ 
              width: '100%', 
              height: '100%', 
              border: 'none', 
              backgroundColor: 'rgba(0,0,0,0.7)' 
            }} 
          />
        </ResizableDraggableWindow>
      )}
    </div>
  );
}
