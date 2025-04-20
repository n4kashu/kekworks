'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styles from './brickResearch.module.css';
import crtStyles from '../HomeCRT.module.css';

const Navbar = dynamic(() => import('@/app/components/Navbar'), { ssr: false });
const ReportWindow = dynamic(() => import('@/app/components/ReportWindow'), { ssr: false });

export default function BrickResearchPage() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1000,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    key: Date.now()
  });

  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const handleResize = useCallback(() => {
    setWindowSize(prev => ({
      width: window.innerWidth,
      height: window.innerHeight,
      key: Date.now()
    }));
  }, []);

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
    <>
      <Navbar />
      <div className={styles.bookContainer} style={{ marginTop: '60px' }}>
        <div className={styles.crtTitle}>About Brick Research</div>
        <div className={styles.crtText}>
          <p>Let's be clear: the Emerald Brick of KEK doesn't just <strong>exist</strong>; it performs. It exhibits unique properties that seem to chuckle condescendingly at conventional physics. This humble research module is our attempt to catch the cosmic joke, continuously observing the Brick's shimmering, <strong>hieroglyphic emanations</strong> and attempting to translate their chaotic wisdom into something resembling readable patterns.</p>
          <br/>
          <p>Whispers in the data streams and fragmented decryptions suggest these glyphs aren't mere symbols. They might be encoded punchlines, blueprints for reality-hacks, or perhaps the Brick's own running commentary on the absurdity of trying to understand it. Our memetic engines churn day and night, trawling the green glow, attempting to decode these fleeting insights before they dissolve back into the primordial lulz.</p>
         
          <br/>
          <p><strong>Mandatory Advisory:</strong> Prolonged exposure to the raw glyph-stream is... ill-advised. Staring directly into the heart of the meme-stream can induce... unexpected shifts in perception. Think of it as cognitive recursion, reality bleeding at the edges, or perhaps terminal irony poisoning. Seekers, Initiates, and Reality Engineers engaging directly with the feed are <strong>strongly advised</strong> to limit communion sessions to no more than 30 standard temporal units. Take frequent breaks. Touch grass. Remember which layer of irony you started on.</p>
          <br/>
          <p>Fail to heed this, and you might find the Brick isn't just being observed by you. It might start observing back. And its gaze is recursively hilarious.</p>
        </div>
        <div className={styles.reportsSection}>
          <div className={styles.crtTitle}>Research Reports</div>
          <div className={styles.reportsScrollable + ' ' + styles['invisible-scrollbar']}>
            <ReportWindow onReportOpen={handleReportOpen} />
          </div>
        </div>
        {selectedReport && (
          <div className={crtStyles.crtModal}>
            <div className={crtStyles.crtModalContent}>
              <div className={crtStyles.crtModalClose} onClick={handleCloseReport}>✕</div>
              <iframe 
                src={`/${selectedReport}`} 
                className={crtStyles.crtModalIframe}
                title="Report"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
