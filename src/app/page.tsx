'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  
  // Responsive state tracking
  const [dimensions, setDimensions] = useState({
    width: 1200,
    height: 800
  });

  // Responsive layout calculation
  const layout = useMemo(() => {
    const margin = 15;
    const availableWidth = dimensions.width - margin * 3;
    const availableHeight = dimensions.height - margin * 3;

    // Top half split calculation
    const topHeight = Math.floor(availableHeight / 2);
    const reportsWidth = Math.floor(availableWidth / 3);
    const glyphWidth = availableWidth - reportsWidth;

    return {
      margin,
      reports: {
        width: reportsWidth,
        height: topHeight,
        x: margin,
        y: margin
      },
      glyph: {
        width: glyphWidth,
        height: topHeight,
        x: reportsWidth + margin * 2,
        y: margin
      },
      terminal: {
        width: availableWidth,
        height: topHeight,
        x: margin,
        y: topHeight + margin * 2
      },
      fullReport: {
        width: availableWidth,
        height: availableHeight,
        x: margin,
        y: margin
      }
    };
  }, [dimensions]);

  // Effect for tracking window resize
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      // Add resize listener
      window.addEventListener('resize', handleResize);

      // Initial call
      handleResize();

      // Event listener for opening ANKH window
      const handleOpenAnkhWindow = () => {
        setShowGlyphTypeout(true);
      };
      window.addEventListener('open-ankh-window', handleOpenAnkhWindow);

      // Event listener for closing all windows
      const handleCloseAllWindows = () => {
        setShowReports(false);
        setShowGlyphTypeout(false);
        setShowTerminal(false);
      };
      window.addEventListener('close-all-windows', handleCloseAllWindows);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('open-ankh-window', handleOpenAnkhWindow);
        window.removeEventListener('close-all-windows', handleCloseAllWindows);
      };
    }
  }, []);

  const handleReportOpen = (reportHtml: string) => {
    setSelectedReport(reportHtml);
  };

  const handleReportClose = () => {
    setSelectedReport(null);
  };

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      backgroundColor: 'black', 
      color: 'rgba(57, 255, 20, 0.56)', 
      overflow: 'hidden' 
    }}>
      {showReports && (
        <ResizableDraggableWindow
          title="Reports"
          initialWidth={layout.reports.width}
          initialHeight={layout.reports.height}
          initialX={layout.reports.x}
          initialY={layout.reports.y}
          zIndex={10}
        >
          <ReportWindow onReportOpen={handleReportOpen} />
        </ResizableDraggableWindow>
      )}

      {showGlyphTypeout && (
        <ResizableDraggableWindow
          title="ANKH"
          initialWidth={layout.glyph.width}
          initialHeight={layout.glyph.height}
          initialX={layout.glyph.x}
          initialY={layout.glyph.y}
          zIndex={11}
        >
          <GlyphTypeout />
        </ResizableDraggableWindow>
      )}

      {showTerminal && (
        <ResizableDraggableWindow
          title="Terminal"
          initialWidth={layout.terminal.width}
          initialHeight={layout.terminal.height}
          initialX={layout.terminal.x}
          initialY={layout.terminal.y}
          zIndex={9}
        >
          <ThisTerminal />
        </ResizableDraggableWindow>
      )}

      {selectedReport && (
        <ResizableDraggableWindow
          title={`Report: ${selectedReport}`}
          initialWidth={layout.fullReport.width}
          initialHeight={layout.fullReport.height}
          initialX={layout.fullReport.x}
          initialY={layout.fullReport.y}
          zIndex={12}
          onClose={() => setSelectedReport(null)}
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
