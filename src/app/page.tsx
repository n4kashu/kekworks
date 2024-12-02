/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
// Commented out unused imports
// import ThisTerminal from '@/components/ThisTerminal';
// import GlyphTypeout from '@/app/components/GlyphTypeout';
import ReportWindow from '@/app/components/ReportWindow';

// Dynamically import client-side components
const ClientHome = dynamic(() => Promise.resolve(() => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousState, setPreviousState] = useState({
    position: { x: 80, y: 0 },
    size: { width: 0, height: 0 }
  });

  const [position, setPosition] = useState({
    x: 15,
    y: 80
  });

  const [memesisPosition, setMemesisPosition] = useState({
    x: 15,
    y: 80
  });

  const [size, setSize] = useState({
    width: 500,
    height: 450
  });

  const [memesisSize, setMemesisSize] = useState({
    width: 500,
    height: 450
  });

  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [isMemesisResizing, setIsMemesisResizing] = useState(false);
  const [isMemesisDragging, setIsMemesisDragging] = useState(false);
  const [memesisDragOffset, setMemesisDragOffset] = useState({ x: 0, y: 0 });
  
  // Commented out unused variables
  // const memesisWindowTitle = 'ANKH (The Analytical Nexus of Kek Hermeneutics)';
  // const terminalRef = useRef<HTMLDivElement>(null);
  // const memesisRef = useRef<HTMLDivElement>(null);

  const calculateInitialPosition = () => {
    if (typeof window === 'undefined') {
      return {
        x: 400,
        y: 200,
        width: 600,
        height: 400
      };
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    return {
      x: Math.max(0, Math.min(400, windowWidth - 600)),
      y: Math.max(0, Math.min(200, windowHeight - 400)),
      width: Math.min(600, windowWidth * 0.7),
      height: Math.min(400, windowHeight * 0.5)
    };
  };

  const calculateTerminalInitialPosition = () => {
    if (typeof window === 'undefined') {
      return {
        x: 80,
        y: 0,
        width: 600,
        height: 400
      };
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    return {
      x: Math.max(0, Math.min(80, windowWidth - 600)),
      y: Math.max(0, Math.min(0, windowHeight - 400)),
      width: Math.min(600, windowWidth * 0.7),
      height: Math.min(400, windowHeight * 0.5)
    };
  };

  const [initialState, setInitialState] = useState({
    terminal: calculateTerminalInitialPosition(),
    memesis: calculateInitialPosition()
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setInitialState({
          terminal: calculateTerminalInitialPosition(),
          memesis: calculateInitialPosition()
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        if (!isMaximized) {
          const { terminal } = initialState;
          setPosition(terminal);
          setSize({
            width: terminal.width,
            height: terminal.height
          });
          setPreviousState({ 
            position: { x: terminal.x, y: terminal.y }, 
            size: { width: terminal.width, height: terminal.height } 
          });
        } else {
          setSize({ width: window.innerWidth, height: window.innerHeight });
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isMaximized, initialState]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        if (!isMaximized) {
          const { memesis } = initialState;
          setMemesisPosition(memesis);
          setMemesisSize({
            width: memesis.width,
            height: memesis.height
          });
        } else {
          setMemesisSize({ width: window.innerWidth, height: window.innerHeight });
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isMaximized, initialState]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { terminal, memesis } = initialState;
      
      // Set terminal position and size
      setPosition(terminal);
      setSize({
        width: terminal.width,
        height: terminal.height
      });
      
      // Set Memesis position and size
      setMemesisPosition(memesis);
      setMemesisSize({
        width: memesis.width,
        height: memesis.height
      });
      
      // Store previous state for potential maximization
      setPreviousState({
        position: { x: terminal.x, y: terminal.y },
        size: { width: terminal.width, height: terminal.height }
      });
    }
  }, [initialState]);

  // Commented out unused functions
  // const toggleMaximize = () => {
  //   if (!isMaximized) {
  //     const currentState = {
  //       position: { ...position },
  //       size: { ...size }
  //     };
  //     setPreviousState(currentState);
  //     setPosition({ x: 0, y: 0 });
  //     setSize({ 
  //       width: window.innerWidth,
  //       height: window.innerHeight
  //     });
  //   } else {
  //     const prevState = previousState;
  //     setPosition(prevState.position);
  //     setSize(prevState.size);
  //   }
  //   setIsMaximized(!isMaximized);
  // };

  // const handleMouseDown = (e: React.MouseEvent, windowType: 'terminal' | 'memesis', action: 'drag' | 'resize') => {
  //   e.stopPropagation(); // Prevent event bubbling
  // };

  // const handleMouseMove = (e: React.MouseEvent) => {
  //   // Mouse move logic
  // };

  // const handleMouseUp = () => {
  //   // Mouse up logic
  // };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ReportWindow />
      {/* Commented out existing windows
      <ThisTerminal 
        position={position}
        size={size}
        isMaximized={isMaximized}
      />
      <div 
        className="memesis-window"
        style={{
          position: 'absolute',
          left: `${memesisPosition.x}px`,
          top: `${memesisPosition.y}px`,
          width: `${memesisSize.width}px`,
          height: `${memesisSize.height}px`
        }}
      >
        <h2>{memesisWindowTitle}</h2>
        <GlyphTypeout />
      </div>
      */}
    </main>
  );
}), { ssr: false });

export default function Home() {
  return <ClientHome />;
}
