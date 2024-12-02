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
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});
  const progressBarRefs = useRef<{ [key: string]: HTMLDivElement }>({});

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
    fontSize: '1.2em',
    margin: '0 0 15px 0',
    cursor: 'pointer'
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
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)', 
            borderRadius: '5px',
            border: '1px solid rgba(57, 255, 20, 0.3)', 
            padding: '15px',
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
            marginBottom: '10px'
          }}>
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
                marginLeft: '10px',
                cursor: 'pointer',
                padding: '5px',
                borderRadius: '3px',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(57, 255, 20, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {activeAudio === `/${report.audio}` 
                ? '⏸' 
                : '▶'}
            </div>
          </div>

          {/* Progress Bar */}
          <div 
            ref={(el) => {
              if (el) progressBarRefs.current[`/${report.audio}`] = el;
            }}
            onClick={(e) => handleProgressBarClick(`/${report.audio}`, e)}
            style={{
              width: '100%', 
              height: '4px', 
              backgroundColor: 'rgba(57, 255, 20, 0.2)',
              borderRadius: '2px',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
          >
            <div 
              style={{
                width: `${progress[`/${report.audio}`] || 0}%`, 
                height: '100%', 
                backgroundColor: 'rgba(57, 255, 20, 0.8)',
                transition: 'width 0.1s linear'
              }}
            />
          </div>

          {/* Hidden Audio Elements */}
          <audio
            ref={(el) => {
              if (el) audioRefs.current[`/${report.audio}`] = el;
            }}
            src={`/${report.audio}`}
            style={{ display: 'none' }}
            onTimeUpdate={(e) => handleTimeUpdate(`/${report.audio}`, e)}
          />
        </div>
      ))}
    </div>
  );
}
