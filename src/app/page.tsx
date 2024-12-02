'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ThisTerminal from '@/components/ThisTerminal';
import GlyphTypeout from '@/app/components/GlyphTypeout';
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
  const memesisWindowTitle = 'ANKH (The Analytical Nexus of Kek Hermeneutics)';
  const terminalRef = useRef<HTMLDivElement>(null);
  const memesisRef = useRef<HTMLDivElement>(null);

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

  const toggleMaximize = () => {
    if (!isMaximized) {
      const currentState = {
        position: { ...position },
        size: { ...size }
      };
      setPreviousState(currentState);
      setPosition({ x: 0, y: 0 });
      setSize({ 
        width: window.innerWidth,
        height: window.innerHeight
      });
    } else {
      const prevState = previousState;
      setPosition(prevState.position);
      setSize(prevState.size);
    }
    setIsMaximized(!isMaximized);
  };

  const handleMouseDown = (e: React.MouseEvent, windowType: 'terminal' | 'memesis', action: 'drag' | 'resize') => {
    e.stopPropagation(); // Prevent event bubbling
    
    if (action === 'resize') {
      if (windowType === 'terminal') {
        setIsResizing(true);
      } else {
        setIsMemesisResizing(true);
      }
      return;
    }
    
    // Dragging logic
    if (windowType === 'terminal') {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    } else {
      setIsMemesisDragging(true);
      setMemesisDragOffset({
        x: e.clientX - memesisPosition.x,
        y: e.clientY - memesisPosition.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Terminal window dragging
    if (isDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x));
      const newY = Math.max(0, Math.min(window.innerHeight - size.height, e.clientY - dragOffset.y));
      setPosition({
        x: newX,
        y: newY
      });
    }
    
    // Terminal window resizing
    if (isResizing) {
      const newWidth = Math.max(300, e.clientX - position.x);
      const newHeight = Math.max(300, e.clientY - position.y);
      setSize({ width: newWidth, height: newHeight });
    }

    // Memesis window dragging
    if (isMemesisDragging) {
      const newX = Math.max(0, Math.min(window.innerWidth - memesisSize.width, e.clientX - memesisDragOffset.x));
      const newY = Math.max(0, Math.min(window.innerHeight - memesisSize.height, e.clientY - memesisDragOffset.y));
      setMemesisPosition({
        x: newX,
        y: newY
      });
    }
    
    // Memesis window resizing
    if (isMemesisResizing) {
      const newWidth = Math.max(300, e.clientX - memesisPosition.x);
      const newHeight = Math.max(300, e.clientY - memesisPosition.y);
      setMemesisSize({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setIsMemesisDragging(false);
    setIsMemesisResizing(false);
  };

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
