'use client';

import React, { useState, useRef, useEffect } from 'react';
import ThisTerminal from '@/components/ThisTerminal';
import GlyphTypeout from '@/app/components/GlyphTypeout';

export default function Home() {
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousState, setPreviousState] = useState({
    position: { x: 80, y: 0 },
    size: { width: 0, height: 0 }
  });
  const [position, setPosition] = useState({ 
    x: 15,
    y: 80
  });
  const [size, setSize] = useState({ 
    width: 500,
    height: 450 
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const terminalRef = useRef<HTMLDivElement>(null);

  const memesisRef = useRef<HTMLDivElement>(null);
  const [memesisPosition, setMemesisPosition] = useState({ 
    x: 15, 
    y: 80
  });
  const [memesisSize, setMemesisSize] = useState({ 
    width: 500,
    height: 450 
  });
  const [isMemesisDragging, setIsMemesisDragging] = useState(false);
  const [isMemesisResizing, setIsMemesisResizing] = useState(false);
  const [memesisDragOffset, setMemesisDragOffset] = useState({ x: 0, y: 0 });
  const [memesisWindowTitle, setMemesisWindowTitle] = useState('ANKH (The Analytical Nexus of Kek Hermeneutics)');

  const calculateInitialPosition = () => {
    const width = Math.min(1000, window.innerWidth - 160); // Reduced width
    const height = Math.min(450, window.innerHeight * 0.45);
    const x = 80;
    const y = 80;
    return { x, y, width: width / 2, height }; // Halve the width
  };

  const calculateTerminalInitialPosition = () => {
    const width = Math.min(1000, window.innerWidth - 160); // Reduced width
    const height = Math.min(450, window.innerHeight * 0.45);
    const x = 15; // 15px margin from left
    const y = window.innerHeight * 0.5 + 15; // 15px margin from top of previous window
    return { x, y, width: width / 2, height }; // Halve the width
  };

  const [initialState, setInitialState] = useState({
    terminal: calculateTerminalInitialPosition(),
    memesis: calculateInitialPosition()
  });

  useEffect(() => {
    const handleResize = () => {
      setInitialState({
        terminal: calculateTerminalInitialPosition(),
        memesis: calculateInitialPosition()
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle window resize
  useEffect(() => {
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
  }, [isMaximized, initialState]);

  // Handle window resize for Memesis
  useEffect(() => {
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
  }, [isMaximized, initialState]);

  // Initial setup
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
    <div 
      className="relative min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Layer */}
      <div className="fixed inset-0 flex items-center justify-center" >
        <iframe 
          src="./yhghh.HTML" 
          className="w-full h-full"
          style={{
            border: 'none',
            pointerEvents: 'none',
            transform: 'scale(1.1)',
            transformOrigin: 'center center'
          }}
        />
      </div>
      
      {/* Terminal Window */}
      <div 
        ref={terminalRef}
        className={`absolute z-10 bg-black/10 backdrop-blur-sm rounded-xl overflow-hidden
                   shadow-[0_0_15px_rgba(57,255,20,0.15)]
                   ${!isMaximized && isDragging ? 'cursor-grabbing' : !isMaximized ? 'cursor-grab' : ''}
                   ${(isDragging || isResizing) ? 'select-none' : ''}`}
        style={{
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
          transition: isDragging || isResizing ? 'none' : 'all 0.3s ease-in-out',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          msUserSelect: 'none'
        }}
      >
        {/* Title Bar */}
        <div 
          className="h-8 bg-black/30 flex items-center px-4 select-none"
          onMouseDown={(e) => handleMouseDown(e, 'terminal', 'drag')}
        >
          <span className="text-[#39ff14] text-sm flex-grow">kek.works terminal</span>
          <button
            onClick={toggleMaximize}
            className="w-6 h-6 flex items-center justify-center text-[#39ff14] hover:bg-[#39ff14]/20 rounded transition-colors"
          >
            {isMaximized ? '↓' : '↑'}
          </button>
        </div>

        {/* Terminal Content */}
        <div className="h-[calc(100%-32px)]">
          <ThisTerminal />
        </div>

        {/* Resize Handle */}
        {!isMaximized && (
          <div 
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
            onMouseDown={(e) => handleMouseDown(e, 'terminal', 'resize')}
            style={{
              background: 'linear-gradient(135deg, transparent 50%, rgba(57, 255, 20, 0.2) 100%)',
            }}
          />
        )}
      </div>

      {/* Memesis Window */}
      <div 
        ref={memesisRef}
        className={`absolute z-10 bg-black/10 backdrop-blur-sm rounded-xl overflow-hidden
                   shadow-[0_0_15px_rgba(57,255,20,0.15)]
                   ${!isMaximized && isMemesisDragging ? 'cursor-grabbing' : !isMaximized ? 'cursor-grab' : ''}
                   ${(isMemesisDragging || isMemesisResizing) ? 'select-none' : ''}`}
        style={{
          left: `${memesisPosition.x}px`,
          top: `${memesisPosition.y}px`,
          width: `${memesisSize.width}px`,
          height: `${memesisSize.height}px`,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Window Header */}
        <div 
          className="h-8 bg-black/30 flex items-center px-4 select-none"
          onMouseDown={(e) => handleMouseDown(e, 'memesis', 'drag')}
        >
          <div 
            className="window-title flex items-center justify-between w-full"
            style={{ 
              userSelect: 'none',
              fontSize: 'inherit' // Use the same font size as the console
            }}
          >
            {memesisWindowTitle}
          </div>
          <button
            onClick={toggleMaximize}
            className="w-6 h-6 flex items-center justify-center text-[#39ff14] hover:bg-[#39ff14]/20 rounded transition-colors"
          >
            {isMaximized ? '↓' : '↑'}
          </button>
        </div>

        {/* Memesis Content */}
        <div 
          className="h-[calc(100%-32px)]"
          onMouseDown={(e) => handleMouseDown(e, 'memesis', 'drag')}
        >
          <GlyphTypeout speed={50} maxCharacters={5000} />
        </div>

        {/* Resize Handle */}
        {!isMaximized && (
          <div 
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
            onMouseDown={(e) => handleMouseDown(e, 'memesis', 'resize')}
            style={{
              background: 'linear-gradient(135deg, transparent 50%, rgba(57, 255, 20, 0.2) 100%)',
            }}
          />
        )}
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        *::-webkit-scrollbar {
          display: none;
        }
        .select-none * {
          user-select: none !important;
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
        }
      `}</style>
    </div>
  );
}
