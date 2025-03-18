'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ReportWindow = dynamic(() => import('@/app/components/ReportWindow'), { ssr: false });
const Navbar = dynamic(() => import('@/app/components/Navbar'), { ssr: false });

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

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
      paddingTop: '60px' // Add padding to account for fixed navbar
    }}>
      {/* Navbar */}
      <Navbar />
      
      {/* Reports Content */}
      <div style={{
        width: '100%',
        height: 'calc(100% - 60px)',
        padding: '40px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
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
            Reports Archive
          </div>
          <div style={{ height: 'calc(100% - 50px)', overflow: 'hidden' }}>
            <ReportWindow onReportOpen={handleReportOpen} />
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
