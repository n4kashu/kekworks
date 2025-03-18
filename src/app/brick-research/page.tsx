'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const GlyphTypeout = dynamic(() => import('@/app/components/GlyphTypeout'), { ssr: false });
const ReportWindow = dynamic(() => import('@/app/components/ReportWindow'), { ssr: false });
const Navbar = dynamic(() => import('@/app/components/Navbar'), { ssr: false });

export default function BrickResearchPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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
      paddingTop: isMobile ? '50px' : '60px' // Adjust padding based on device
    }}>
      {/* Navbar */}
      <Navbar />
      
      {/* Brick Research Content */}
      <div style={{
        width: '100%',
        height: 'calc(100% - 60px)',
        padding: isMobile ? '10px' : '20px',
        boxSizing: 'border-box',
        overflow: 'auto'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '15px' : '20px'
        }}>
          {/* Glyph Typeout Section */}
          <div style={{
            flex: 1,
            minHeight: isMobile ? '200px' : '300px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '10px',
            border: '1px solid rgba(57, 255, 20, 0.3)',
            padding: isMobile ? '15px' : '20px',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <div style={{
              fontWeight: 'bold',
              color: 'rgba(57, 255, 20, 1)',
              textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
              letterSpacing: '1px',
              fontSize: isMobile ? '1.2em' : '1.5em',
              marginBottom: isMobile ? '15px' : '20px'
            }}>
              Brick Analysis Data
            </div>
            <div style={{ height: isMobile ? '170px' : '250px', overflow: 'hidden' }}>
              <GlyphTypeout speed={30} fontSize={isMobile ? "0.9rem" : "1.1rem"} />
            </div>
          </div>
          
          {/* Description Section */}
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '10px',
            border: '1px solid rgba(57, 255, 20, 0.3)',
            padding: isMobile ? '15px' : '20px',
            boxSizing: 'border-box',
          }}>
            <div style={{
              fontWeight: 'bold',
              color: 'rgba(57, 255, 20, 1)',
              textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
              letterSpacing: '1px',
              fontSize: isMobile ? '1.1em' : '1.2em',
              marginBottom: isMobile ? '10px' : '15px'
            }}>
              About Brick Research
            </div>
            <div style={{
              color: 'rgba(57, 255, 20, 0.8)',
              lineHeight: '1.6',
              fontSize: isMobile ? '0.9rem' : '1rem'
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
          
          {/* Reports Section */}
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '10px',
            border: '1px solid rgba(57, 255, 20, 0.3)',
            padding: isMobile ? '15px' : '20px',
            boxSizing: 'border-box',
            minHeight: isMobile ? '220px' : '300px'
          }}>
            <div style={{
              fontWeight: 'bold',
              color: 'rgba(57, 255, 20, 1)',
              textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
              letterSpacing: '1px',
              fontSize: isMobile ? '1.1em' : '1.2em',
              marginBottom: isMobile ? '10px' : '15px'
            }}>
              Research Reports
            </div>
            <div style={{ height: isMobile ? '170px' : '250px', overflow: 'hidden' }}>
              <ReportWindow onReportOpen={handleReportOpen} />
            </div>
          </div>
        </div>
      </div>
      
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
          padding: isMobile ? '10px' : '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            width: isMobile ? '95%' : '90%',
            height: isMobile ? '95%' : '90%',
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
              cursor: 'pointer',
              fontSize: isMobile ? '0.8rem' : '1rem'
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
