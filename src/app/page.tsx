'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import ResizableDraggableWindow from '@/app/components/ResizableDraggableWindow';
import ThisTerminal from '@/components/ThisTerminal';
import GlyphTypeout from '@/app/components/GlyphTypeout';
import ReportWindow from '@/app/components/ReportWindow';

export default function Home() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [showGlyphTypeout, setShowGlyphTypeout] = useState(true);
  const [showReports, setShowReports] = useState(true);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  
  // Responsive state tracking
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
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

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleReportOpen = (reportHtml: string) => {
    setSelectedReport(reportHtml);
  };

  const handleReportClose = () => {
    setSelectedReport(null);
  };

  return (
    <main 
      style={{ 
        backgroundColor: 'black', 
        height: '100vh', 
        width: '100vw', 
        overflow: 'hidden',
        position: 'relative',
        display: 'grid',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: `${layout.margin}px`
      }}
    >
      {/* Background iframe */}
      <iframe
        src="/yhghh.html"
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

      {/* Top row grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: `${layout.margin}px`,
          zIndex: 10
        }}
      >
        {showReports && (
          <ResizableDraggableWindow
            title="Research Reports"
            initialWidth={layout.reports.width}
            initialHeight={layout.reports.height}
            initialX={layout.reports.x}
            initialY={layout.reports.y}
            onClose={() => setShowReports(false)}
            zIndex={15}
            opacity={0.8}
          >
            <ReportWindow onReportOpen={handleReportOpen} />
          </ResizableDraggableWindow>
        )}

        {showGlyphTypeout && (
          <ResizableDraggableWindow
            title="ANKH -  Analytical Nexus of Kek Hermeneutics"
            initialWidth={layout.glyph.width}
            initialHeight={layout.glyph.height}
            initialX={layout.glyph.x}
            initialY={layout.glyph.y}
            onClose={() => setShowGlyphTypeout(false)}
            zIndex={10}
            opacity={0.8}
          >
            <GlyphTypeout maxCharacters={5000} speed={100} />
          </ResizableDraggableWindow>
        )}
      </div>

      {/* Bottom row */}
      {showTerminal && (
        <ResizableDraggableWindow
          title="Terminal"
          initialWidth={layout.terminal.width}
          initialHeight={layout.terminal.height}
          initialX={layout.terminal.x}
          initialY={layout.terminal.y}
          onClose={() => setShowTerminal(false)}
          zIndex={5}
          opacity={0.8}
        >
          <ThisTerminal />
        </ResizableDraggableWindow>
      )}

      {selectedReport && (
        <ResizableDraggableWindow
          title="Report Viewer"
          initialWidth={layout.fullReport.width}
          initialHeight={layout.fullReport.height}
          initialX={layout.fullReport.x}
          initialY={layout.fullReport.y}
          onClose={handleReportClose}
          zIndex={100}
          opacity={0.8}
        >
          <iframe
            src={`/${selectedReport}`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.2)'
            }}
          />
        </ResizableDraggableWindow>
      )}
    </main>
  );
}
