'use client';

import React, { useState, useRef, useEffect } from 'react';
import ThisTerminal from '@/components/ThisTerminal';

export default function Home() {
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousState, setPreviousState] = useState({
    position: { x: 80, y: 0 },
    size: { width: 0, height: 0 }
  });
  const [position, setPosition] = useState({ 
    x: 80,
    y: 0
  });
  const [size, setSize] = useState({ 
    width: 1000,
    height: 450 
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const terminalRef = useRef<HTMLDivElement>(null);

  const calculateInitialPosition = () => {
    const width = window.innerWidth - 160; // 80px margins on each side
    const height = Math.min(450, window.innerHeight * 0.45); // Increased height by 50% (from 300 to 450)
    const x = 80;
    // Calculate y position to maintain 80px margin from bottom
    const y = window.innerHeight - height - 80;
    
    return {
      position: { x, y },
      size: { width, height }
    };
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!isMaximized) {
        const { position: newPosition, size: newSize } = calculateInitialPosition();
        setPosition(newPosition);
        setSize(newSize);
        setPreviousState({ position: newPosition, size: newSize });
      } else {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMaximized]);

  // Initial setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialState = calculateInitialPosition();
      setPosition(initialState.position);
      setSize(initialState.size);
      setPreviousState(initialState);
    }
  }, []);

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

  const handleMouseDown = (e: React.MouseEvent, action: 'drag' | 'resize') => {
    if (isMaximized) return;
    if (action === 'resize') {
      setIsResizing(true);
    } else {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      // Constrain dragging within viewport bounds with margins
      const newX = Math.max(80, Math.min(window.innerWidth - size.width - 80, e.clientX - dragOffset.x));
      const newY = Math.max(0, Math.min(window.innerHeight - size.height - 80, e.clientY - dragOffset.y));
      setPosition({
        x: newX,
        y: newY
      });
    }
    if (isResizing) {
      // Constrain resizing within viewport bounds with margins
      const maxWidth = window.innerWidth - position.x - 80;
      const maxHeight = window.innerHeight - position.y - 80;
      const newWidth = Math.max(300, Math.min(maxWidth, e.clientX - position.x));
      const newHeight = Math.max(300, Math.min(maxHeight, e.clientY - position.y));
      setSize({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  return (
    <div 
      className="relative min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Layer */}
      <div className="fixed inset-0 flex items-center justify-center" style={{ height: '66vh' }}>
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
          onMouseDown={(e) => handleMouseDown(e, 'drag')}
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
            onMouseDown={(e) => handleMouseDown(e, 'resize')}
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
