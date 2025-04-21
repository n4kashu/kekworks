'use client';

import React, { useState, useRef, useEffect } from 'react';

interface BaseWindowProps {
  title: string;
  initialPosition: { x: number; y: number };
  initialSize: { width: number; height: number };
  opacity?: number;
  zIndex?: number;
  onClose?: () => void;
  children?: React.ReactNode;
}

export default function BaseWindow({
  title,
  initialPosition,
  initialSize,
  opacity = 1,
  zIndex = 1,
  onClose,
  children
}: BaseWindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState({
    width: Math.max(initialSize.width, 400),
    height: Math.max(initialSize.height, 300)
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [currentZIndex, setCurrentZIndex] = useState(zIndex);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      } else if (isResizing) {
        const newWidth = Math.max(400, resizeStart.width + (e.clientX - resizeStart.x));
        const newHeight = Math.max(300, resizeStart.height + (e.clientY - resizeStart.y));
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const titleBar = windowRef.current?.querySelector('.title-bar');
    if (titleBar && titleBar.contains(e.target as Node)) {
      const rect = windowRef.current!.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
      setCurrentZIndex(1000); // Bring to front when dragging
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setCurrentZIndex(1000); // Bring to front when resizing
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
  };

  // Log initial props for debugging
  useEffect(() => {
    console.log('BaseWindow Props:', {
      title,
      initialPosition,
      initialSize,
      zIndex,
      opacity
    });
  }, [title, initialPosition, initialSize, zIndex, opacity]);

  return (
    <div
      ref={windowRef}
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        backgroundColor: `rgba(0,0,0,${1 - opacity})`,
        borderRadius: '0.75rem',
        border: '1px solid rgba(57, 255, 20, 0.3)',
        color: 'rgba(57, 255, 20, 0.56)',
        textShadow: '0 0 5px rgba(157, 201, 20, 0.69)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 0 20px rgba(57, 255, 20, 0.2)',
        transition: isDragging || isResizing ? 'none' : 'all 0.3s ease',
        overflow: 'hidden',
        zIndex: currentZIndex,
        backdropFilter: 'blur(5px)',
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="title-bar"
        style={{
          height: '40px',
          backgroundColor: 'rgba(57, 255, 20, 0.1)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 15px',
          cursor: 'move',
          userSelect: 'none',
          borderBottom: '1px solid rgba(57, 255, 20, 0.2)'
        }}
      >
        <span style={{ flex: 1 }}>{title}</span>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              width: '24px',
              height: '24px',
              backgroundColor: 'transparent',
              border: '1px solid rgba(57, 255, 20, 0.3)',
              color: 'inherit',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          >
            ×
          </button>
        )}
      </div>

      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        {children}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '15px',
          height: '15px',
          cursor: 'nwse-resize',
          background: 'linear-gradient(135deg, transparent 50%, rgba(57, 255, 20, 0.3) 50%)',
          borderBottomRightRadius: '0.75rem'
        }}
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  );
}
