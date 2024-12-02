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
  }
];

interface ReportWindowProps {
  onReportOpen: (reportHtml: string) => void;
}

export default function ReportWindow({ onReportOpen }: ReportWindowProps) {
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

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

  const windowTitleStyle = {
    fontWeight: 'bold',
    color: 'rgba(57, 255, 20, 1)',
    textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
    letterSpacing: '1px',
    fontSize: '1.2em',
    margin: '0 0 15px 0'
  };

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '10px',
      padding: '10px',
      boxSizing: 'border-box'
    }}>
      {REPORTS.map((report) => (
        <div 
          key={report.id}
          onClick={() => {
            onReportOpen(report.html);
            togglePlay(`/${report.audio}`);
          }}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)', 
            borderRadius: '5px',
            border: '1px solid rgba(57, 255, 20, 0.3)', 
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'rgba(57, 255, 20, 0.9)',
            cursor: 'pointer',
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
            flexDirection: 'column',
            flex: 1
          }}>
            <span style={{ 
              fontSize: '0.8em', 
              opacity: 0.7,
              marginBottom: '5px'
            }}>
              {report.id}
            </span>
            <span style={windowTitleStyle}>
              {report.title}
            </span>
          </div>

          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '10px'
            }}
          >
            {activeAudio === `/${report.audio}` 
              ? '⏸' 
              : '▶'}
          </div>

          {/* Hidden Audio Elements */}
          <audio
            ref={(el) => {
              if (el) audioRefs.current[`/${report.audio}`] = el;
            }}
            src={`/${report.audio}`}
            style={{ display: 'none' }}
          />
        </div>
      ))}
    </div>
  );
}
