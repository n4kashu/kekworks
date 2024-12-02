'use client';

import React, { useMemo, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

const ResizableDraggableWindow = dynamic(() => import('@/app/components/ResizableDraggableWindow'), { ssr: false });
const ThisTerminal = dynamic(() => import('@/components/ThisTerminal'), { ssr: false });
const GlyphTypeout = dynamic(() => import('@/app/components/GlyphTypeout'), { ssr: false });
const ReportWindow = dynamic(() => import('@/app/components/ReportWindow'), { ssr: false });

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [showGlyphTypeout, setShowGlyphTypeout] = useState(true);
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

  // Responsive layout calculation
  const layout = useMemo(() => {
    const MARGIN = 15;
    const availableWidth = windowSize.width - MARGIN * 4; // Increased margin for better spacing
    const availableHeight = windowSize.height - MARGIN * 4; // Increased margin for better spacing

    // Always divide into 3 equal vertical sections
    const windowHeight = Math.floor(availableHeight / 3);

    return {
      margin: MARGIN,
      glyph: {
        width: availableWidth,
        height: windowHeight,
        x: MARGIN * 2,
        y: MARGIN * 2
      },
      reports: {
        width: availableWidth,
        height: windowHeight,
        x: MARGIN * 2,
        y: MARGIN * 2 + windowHeight + MARGIN
      },
      terminal: {
        width: availableWidth,
        height: windowHeight,
        x: MARGIN * 2,
        y: MARGIN * 2 + windowHeight * 2 + MARGIN * 2
      },
      fullReport: {
        width: availableWidth,
        height: availableHeight,
        x: MARGIN * 2,
        y: MARGIN * 2
      }
    };
  }, [windowSize]);

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
      {/* Background iframe */}
      <iframe
        src="/yhghh.HTML"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          zIndex: 0,
          backgroundColor: 'black'
        }}
      />

      {/* Background glow effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, rgba(57, 255, 20, 0.1) 0%, rgba(0, 0, 0, 0.9) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Windows Container */}
      <div 
        key={windowSize.key}
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', 
          gap: '15px',
          height: '100%', // Ensure full height
          overflowY: 'auto' // Allow scrolling if content overflows
        }}
      >
        {/* Glyph Window - Top */}
        {showGlyphTypeout && (
          <ResizableDraggableWindow
            key={`glyph-${windowSize.key}`}
            title="ANKH"
            initialWidth={layout.glyph.width}
            initialHeight={layout.glyph.height}
            initialX={layout.glyph.x}
            initialY={layout.glyph.y}
            zIndex={11}
            style={{ 
              width: '100%',
              maxWidth: layout.glyph.width,
              margin: '0'
            }}
          >
            <GlyphTypeout />
          </ResizableDraggableWindow>
        )}

        {/* Reports Window - Middle */}
        {showReports && (
          <ResizableDraggableWindow
            key={`reports-${windowSize.key}`}
            title="Reports"
            initialWidth={layout.reports.width}
            initialHeight={layout.reports.height}
            initialX={layout.reports.x}
            initialY={layout.reports.y}
            zIndex={10}
            style={{ 
              width: '100%',
              maxWidth: layout.reports.width,
              margin: '0'
            }}
          >
            <ReportWindow onReportOpen={handleReportOpen} />
          </ResizableDraggableWindow>
        )}

        {/* Terminal Window - Bottom */}
        {showTerminal && (
          <ResizableDraggableWindow
            key={`terminal-${windowSize.key}`}
            title="Terminal"
            initialWidth={layout.terminal.width}
            initialHeight={layout.terminal.height}
            initialX={layout.terminal.x}
            initialY={layout.terminal.y}
            zIndex={9}
            style={{ 
              width: '100%',
              maxWidth: layout.terminal.width,
              margin: '0'
            }}
          >
            <ThisTerminal />
          </ResizableDraggableWindow>
        )}

        {/* Full Report Overlay */}
        {selectedReport && (
          <ResizableDraggableWindow
            key={`report-${windowSize.key}`}
            title={`Report: ${selectedReport}`}
            initialWidth={layout.fullReport.width}
            initialHeight={layout.fullReport.height}
            initialX={layout.fullReport.x}
            initialY={layout.fullReport.y}
            zIndex={12}
            onClose={() => setSelectedReport(null)}
            style={{ 
              width: '100%',
              maxWidth: layout.fullReport.width,
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
    </div>
  );
}
