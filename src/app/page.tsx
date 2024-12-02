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
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '0',
      boxSizing: 'border-box'
    }}>
      {/* Disable background iframe */}
      {showTerminal && (
        <ResizableDraggableWindow
          key={`terminal-${windowSize.key}`}
          title="Terminal"
          initialWidth={windowSize.width - 40}
          initialHeight={windowSize.height - 40}
          initialX={20}
          initialY={20}
          zIndex={8}
          style={{ 
            width: '100%',
            maxWidth: windowSize.width - 40,
            height: windowSize.height - 40,
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
          initialWidth={windowSize.width - 40}
          initialHeight={windowSize.height - 40}
          initialX={20}
          initialY={20}
          zIndex={9}
          style={{ 
            width: '100%',
            maxWidth: windowSize.width - 40,
            height: windowSize.height - 40,
            margin: '0'
          }}
        >
          <GlyphTypeout />
        </ResizableDraggableWindow>
      )}
      {showReports && (
        <ResizableDraggableWindow
          key={`reports-${windowSize.key}`}
          title="Reports"
          initialWidth={windowSize.width - 40}
          initialHeight={windowSize.height - 40}
          initialX={20}
          initialY={20}
          zIndex={10}
          style={{ 
            width: '100%',
            maxWidth: windowSize.width - 40,
            height: windowSize.height - 40,
            margin: '0'
          }}
        >
          <ReportWindow onReportOpen={handleReportOpen} />
        </ResizableDraggableWindow>
      )}
      {/* Full Report Overlay */}
      {selectedReport && (
        <ResizableDraggableWindow
          key={`report-${windowSize.key}`}
          title={`Report: ${selectedReport}`}
          initialWidth={windowSize.width - 40}
          initialHeight={windowSize.height - 40}
          initialX={20}
          initialY={20}
          zIndex={12}
          onClose={() => setSelectedReport(null)}
          style={{ 
            width: '100%',
            maxWidth: windowSize.width - 40,
            height: windowSize.height - 40,
            margin: '0'
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
