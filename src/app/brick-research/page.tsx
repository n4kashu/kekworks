'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/app/components/Navbar'), { ssr: false });
const GlyphTypeout = dynamic(() => import('@/app/components/GlyphTypeout'), { ssr: false });
const ReportWindow = dynamic(() => import('@/app/components/ReportWindow'), { ssr: false });

export default function BrickResearchPage() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    key: Date.now()
  });

  const [selectedReport, setSelectedReport] = useState<string | null>(null);

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

  const handleCloseReport = () => {
    setSelectedReport(null);
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
      <Navbar />
      
      <div style={{
        width: '100%',
        height: 'calc(100% - 60px)', // Account for navbar height
        marginTop: '60px', // Match navbar height
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: '20px',
        overflow: 'auto'
      }}>
        {/* Top section - GlyphTypeout (1/3 of the height) */}
        <div style={{
          width: '100%',
          height: '33%',
          marginBottom: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '10px',
          border: '1px solid rgba(57, 255, 20, 0.3)',
          padding: '20px',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          <div style={{
            fontWeight: 'bold',
            color: 'rgba(57, 255, 20, 1)',
            textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
            letterSpacing: '1px',
            fontSize: '1.5em',
            marginBottom: '20px'
          }}>
            Brick Analysis Data
          </div>
          <div style={{ height: 'calc(100% - 40px)', overflow: 'hidden' }}>
            <GlyphTypeout />
          </div>
        </div>
        
        {/* Middle section - Info about research */}
        <div style={{
          width: '100%',
          marginBottom: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '10px',
          border: '1px solid rgba(57, 255, 20, 0.3)',
          padding: '20px',
          boxSizing: 'border-box',
        }}>
          <div style={{
            fontWeight: 'bold',
            color: 'rgba(57, 255, 20, 1)',
            textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
            letterSpacing: '1px',
            fontSize: '1.2em',
            marginBottom: '15px'
          }}>
            About Brick Research
          </div>
          <div style={{
            color: 'rgba(57, 255, 20, 0.8)',
            lineHeight: '1.6',
            fontSize: '1rem'
          }}>
            <p>
              The Emerald Brick of KEK exhibits unique properties that defy conventional physics. 
              This research module continuously analyzes the brick&apos;s hieroglyphic emanations and translates 
              them into readable patterns.
            </p>
            <p>
              Research suggests the glyphs may contain encoded information related to the brick&apos;s 
              origin and purpose. Our systems continuously monitor and decode these patterns in real-time.
            </p>
            <p>
              <strong>Warning:</strong> Prolonged exposure to the glyph patterns may induce altered states of consciousness. 
              Research staff are advised to limit viewing sessions to 30-minute intervals.
            </p>
          </div>
        </div>
        
        {/* Bottom section - Reports */}
        <div style={{
          width: '100%',
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '10px',
          border: '1px solid rgba(57, 255, 20, 0.3)',
          padding: '20px',
          boxSizing: 'border-box',
          minHeight: '250px',
          overflow: 'hidden'
        }}>
          <div style={{
            fontWeight: 'bold',
            color: 'rgba(57, 255, 20, 1)',
            textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
            letterSpacing: '1px',
            fontSize: '1.2em',
            marginBottom: '15px'
          }}>
            Research Reports
          </div>
          <div style={{ height: 'calc(100% - 40px)', overflow: 'hidden' }}>
            <ReportWindow onReportOpen={handleReportOpen} />
          </div>
        </div>
        
        {/* Selected Report Modal (conditionally rendered) */}
        {selectedReport && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            boxSizing: 'border-box'
          }}>
            <div style={{
              position: 'relative',
              width: '70%',
              height: '80%',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(57, 255, 20, 0.6)',
              boxShadow: '0 0 20px rgba(57, 255, 20, 0.3), 0 0 40px rgba(57, 255, 20, 0.2)',
              borderRadius: '10px',
              padding: '10px',
              boxSizing: 'border-box',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(57, 255, 20, 0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: 10,
                fontSize: '16px',
                color: 'rgba(57, 255, 20, 0.9)',
              }} onClick={handleCloseReport}>
                ✕
              </div>
              <iframe 
                src={`/${selectedReport}`} 
                style={{
                  width: '100%', 
                  height: '100%', 
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)'
                }}
                title="Report"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
