'use client';

import React, { useState, useRef, useEffect } from 'react';

const REPORTS = [
  'report_001.html',
  'report_002.html',
  'report_003.html'
];

export default function ReportWindow() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 30, y: 30 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
      
      // Ensure this window is on top
      windowRef.current.style.zIndex = '20';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && windowRef.current) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReportClick = (report: string) => {
    setSelectedReport(report === selectedReport ? null : report);
  };

  useEffect(() => {
    if (selectedReport && iframeRef.current) {
      const iframe = iframeRef.current;
      
      // Inject custom CSS to style the HTML content
      const styleContent = `
        <style>
          body {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none;  /* Internet Explorer 10+ */
            overflow-y: scroll;
            font-family: inherit;
          }
          body::-webkit-scrollbar {
            width: 0px;
            background: transparent; /* Chrome/Safari/Webkit */
          }
          * {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
        </style>
      `;

      // Modify iframe content
      iframe.onload = () => {
        if (iframe.contentDocument) {
          // Inject our custom styles
          const styleEl = iframe.contentDocument.createElement('style');
          styleEl.textContent = styleContent.replace('<style>', '').replace('</style>', '');
          iframe.contentDocument.head.appendChild(styleEl);

          // Ensure smooth scrolling
          iframe.contentDocument.documentElement.style.scrollBehavior = 'smooth';
        }
      };
    }
  }, [selectedReport]);

  return (
    <div 
      style={{
        position: 'fixed',
        top: '15px',
        left: '15px',
        right: '15px',
        bottom: '15px',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '0.75rem',
        padding: '20px',
        color: 'rgba(57, 255, 20, 0.56)',
        textShadow: '0 0 5px rgba(157, 201, 20, 0.69), 0 0 10px rgba(157, 257, 20, 0.69), 0 0 15px rgba(157, 25, 20, 0.69), 0 0 20px rgba(157, 255, 20, 0.69)',
        animation: 'glowAnimation 2s ease-in-out infinite',
        fontFamily: '"consolas", monospace',
        overflow: 'auto',
        userSelect: 'none',
        cursor: 'default'
      }}
    >
      {!selectedReport ? (
        <div>
          <h2>RESEARCH REPORTS</h2>
          {REPORTS.map((report) => (
            <div 
              key={report} 
              onClick={() => handleReportClick(report)}
              style={{
                cursor: 'pointer',
                marginBottom: '10px',
                padding: '5px',
                borderBottom: '1px solid rgba(57, 255, 20, 0.2)',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(57, 255, 20, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {report}
            </div>
          ))}
        </div>
      ) : (
        <div 
          ref={windowRef}
          style={{
            position: 'fixed',
            top: position.y,
            left: position.x,
            width: 'calc(100% - 60px)',
            height: 'calc(100% - 60px)',
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            boxShadow: '0 0 25px rgba(255,128,0,0.5)',
            border: '2px solid rgba(255,128,0,0.3)',
            zIndex: isDragging ? 20 : 10,
            transition: isDragging ? 'none' : 'all 0.3s ease-in-out'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Title Bar */}
          <div 
            style={{
              height: '32px',
              backgroundColor: 'rgba(255,128,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 10px',
              userSelect: 'none',
              cursor: 'grab'
            }}
          >
            <span 
              style={{ 
                color: '#ffa500', 
                fontSize: '0.875rem', 
                flexGrow: 1 
              }}
            >
              {selectedReport}
            </span>
            <button
              onClick={() => setSelectedReport(null)}
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffa500',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          {/* Content Area */}
          <div 
            style={{
              height: 'calc(100% - 32px)',
              backgroundColor: 'rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}
          >
            <iframe 
              ref={iframeRef}
              src={`/${selectedReport}`} 
              style={{
                width: '100%', 
                height: '100%', 
                border: 'none',
                backgroundColor: 'transparent',
                color: 'rgba(57, 255, 20, 0.56)',
                fontFamily: '"Hieratic Numerals", monospace',
                overflow: 'scroll',
                scrollBehavior: 'smooth'
              }}
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      )}
    </div>
  );
}
