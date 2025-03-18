'use client';

import React, { useState, useRef, useEffect } from 'react';
import BaseWindow from './BaseWindow';

const REPORTS = [
  {
    id: 'report_001',
    html: 'report_001.html',
    audio: 'report_001_InitialFindings.mp3',
    title: 'Initial Findings'
  },
  {
    id: 'report_002',
    html: 'report_002.html',
    audio: 'report_002_RitualOfLULz.mp3',
    title: 'Ritual of LULz'
  },
  {
    id: 'report_003',
    html: 'report_003.html',
    audio: 'report_003_TemporalAnalysisOfTheEmeraldBrick.mp3',
    title: 'Temporal Analysis of The Emerald Brick'
  },
  {
    id: 'report_004',
    html: 'report_004.html',
    audio: 'report_004_QuantumMemeticAnalysisReport.mp3',
    title: 'Quantum Memetic Analysis Report'
  },
  {
    id: 'report_005',
    html: 'report_005.html',
    audio: 'report_005_TechnicalImplementationReport.mp3',
    title: 'Technical Implementation Report'
  },
  {
    id: 'report_006',
    html: 'report_006.html',
    audio: 'report_006_KevinInside.mp3',
    title: 'Kevin Inside'
  },
  {
    id: 'report_007',
    html: 'report_007.html',
    audio: 'report_007_THIS.mp3',
    title: 'THIS'
  }
];

interface ReportWindowProps {
  onReportOpen: (reportHtml: string) => void;
}

export default function ReportWindow({ onReportOpen }: ReportWindowProps) {
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [isMobile, setIsMobile] = useState(false);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const progressBarRefs = useRef<{ [key: string]: HTMLDivElement }>({});

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

  const togglePlay = (audioSrc: string) => {
    const audioElement = audioRefs.current[audioSrc];
    
    if (activeAudio === audioSrc) {
      audioElement.paused ? audioElement.play() : audioElement.pause();
    } else {
      // Pause any currently playing audio
      if (activeAudio && audioRefs.current[activeAudio]) {
        audioRefs.current[activeAudio].pause();
      }
      
      // Play new audio
      audioElement.play();
      setActiveAudio(audioSrc);
    }
  };

  const handleTimeUpdate = (audioSrc: string, e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = e.currentTarget;
    const progressPercentage = (audio.currentTime / audio.duration) * 100;
    setProgress(prev => ({
      ...prev,
      [audioSrc]: progressPercentage
    }));
  };

  const handleProgressBarClick = (audioSrc: string, e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRefs.current[audioSrc];
    const audio = audioRefs.current[audioSrc];
    
    if (progressBar && audio) {
      const rect = progressBar.getBoundingClientRect();
      const clickPosition = (e.clientX - rect.left) / rect.width;
      audio.currentTime = clickPosition * audio.duration;
    }
  };

  const windowTitleStyle = {
    fontWeight: 'bold',
    color: 'rgba(57, 255, 20, 1)',
    textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
    letterSpacing: '1px',
    fontSize: isMobile ? '1em' : '1.2em',
    margin: '0 0 15px 0',
    cursor: 'pointer'
  };

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: isMobile ? '8px' : '12px',
      padding: isMobile ? '5px' : '10px',
      boxSizing: 'border-box',
      overflow: 'auto'
    }}>
      {REPORTS.map((report) => (
        <div 
          key={report.id}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)', 
            borderRadius: '5px',
            border: '1px solid rgba(57, 255, 20, 0.3)', 
            padding: isMobile ? '10px' : '15px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: 'rgba(57, 255, 20, 0.9)',
            transition: 'all 0.3s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(57, 255, 20, 0.1)';
            e.currentTarget.style.boxShadow = '0 0 10px rgba(57, 255, 20, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: isMobile ? '5px' : '10px'
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              flex: 1
            }}>
              <span style={{ 
                fontSize: isMobile ? '0.7em' : '0.8em', 
                opacity: 0.7,
                marginBottom: isMobile ? '3px' : '5px'
              }}>
                {report.id}
              </span>
              <span 
                style={windowTitleStyle}
                onClick={() => onReportOpen(report.html)}
              >
                {report.title}
              </span>
            </div>

            <div 
              onClick={(e) => {
                e.stopPropagation();
                togglePlay(`/${report.audio}`);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? '25px' : '30px',
                height: isMobile ? '25px' : '30px',
                marginLeft: '10px',
                cursor: 'pointer',
                padding: '5px',
                borderRadius: '50%',
                border: '1px solid rgba(57, 255, 20, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(57, 255, 20, 0.2)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {activeAudio === `/${report.audio}` 
                ? '⏸' 
                : '▶'}
            </div>
          </div>

          <div
            ref={(el) => { el && (progressBarRefs.current[`/${report.audio}`] = el); }}
            onClick={(e) => handleProgressBarClick(`/${report.audio}`, e)}
            style={{
              backgroundColor: 'rgba(57, 255, 20, 0.1)',
              height: '4px',
              borderRadius: '2px',
              cursor: 'pointer',
              marginBottom: '5px',
              position: 'relative'
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(57, 255, 20, 0.7)',
                height: '100%',
                borderRadius: '2px',
                width: `${progress[`/${report.audio}`] || 0}%`,
                transition: 'width 0.1s linear'
              }}
            />
          </div>

          <audio
            src={`/${report.audio}`}
            ref={(el) => { el && (audioRefs.current[`/${report.audio}`] = el); }}
            onTimeUpdate={(e) => handleTimeUpdate(`/${report.audio}`, e)}
            onEnded={() => setActiveAudio(null)}
            style={{ display: 'none' }}
          />
        </div>
      ))}
    </div>
  );
}
