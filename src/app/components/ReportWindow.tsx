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
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '0',
      boxSizing: 'border-box',
      width: '100%'
    }}>
      {REPORTS.map((report) => (
        <div
          key={report.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 0',
            borderBottom: '1px solid rgba(57,255,20,0.12)',
            fontSize: '1rem',
            color: '#32FF32',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          <span
            style={{ flex: 1, fontWeight: 500 }}
            onClick={() => onReportOpen(report.html)}
          >
            {report.title}
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              togglePlay(`/${report.audio}`);
            }}
            style={{
              marginLeft: '16px',
              fontSize: '1.3em',
              userSelect: 'none',
              cursor: 'pointer',
              color: activeAudio === `/${report.audio}` ? '#b6ffb6' : '#32FF32',
              transition: 'color 0.2s'
            }}
          >
            {activeAudio === `/${report.audio}` ? '⏸' : '▶'}
          </span>
          <audio
            ref={(el) => {
              if (el) audioRefs.current[`/${report.audio}`] = el;
            }}
            src={`/${report.audio}`}
            style={{ display: 'none' }}
            onTimeUpdate={(e) => handleTimeUpdate(`/${report.audio}`, e)}
            onEnded={() => setActiveAudio(null)}
          />
        </div>
      ))}
    </div>
  );
}
