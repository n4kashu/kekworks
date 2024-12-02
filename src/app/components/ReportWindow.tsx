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

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      {REPORTS.map((report) => (
        <div 
          key={report.id}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '5px',
            border: '1px solid rgba(57, 255, 20, 0.2)',
            padding: '15px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ 
            marginBottom: '10px', 
            fontSize: '0.9em', 
            opacity: 0.7,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{report.id}</span>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              {/* Play/Pause Button */}
              <button
                onClick={() => togglePlay(`/${report.audio}`)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeAudio === `/${report.audio}` ? '#39ff14' : 'inherit',
                  cursor: 'pointer',
                  fontSize: '1.2em',
                  transition: 'color 0.3s ease'
                }}
              >
                {activeAudio === `/${report.audio}` 
                  ? '⏸' 
                  : '▶'}
              </button>
            </div>
          </div>
          
          <button
            onClick={() => onReportOpen(report.html)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              backgroundColor: 'transparent',
              border: '1px solid rgba(57, 255, 20, 0.56)',
              color: 'inherit',
              cursor: 'pointer',
              borderRadius: '5px',
              textShadow: 'inherit',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(57, 255, 20, 0.1)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(57, 255, 20, 0.3)';
              return null;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.boxShadow = 'none';
              return null;
            }}
          >
            {report.title}
          </button>

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
