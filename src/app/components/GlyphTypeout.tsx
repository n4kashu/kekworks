'use client';

import React, { useState, useEffect, useRef } from 'react';

function getRandomCharacter() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

interface GlyphTypeoutProps {
  speed?: number;
  maxCharacters?: number;
  /** 
   * MEMESIS: Memetic Emergence Monitoring & Enlightenment Synthesis Interface System
   * A dynamic, self-transforming textual interface that embodies memetic principles
   * of emergent knowledge generation and systemic awareness
   */
  description?: string;
  fontSize?: string;
}

export default function GlyphTypeout({ 
  speed = 50, 
  maxCharacters = 2000,
  fontSize = '1rem'
}: GlyphTypeoutProps) {
  const [glyphs, setGlyphs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWindowFilled, setIsWindowFilled] = useState(false);

  useEffect(() => {
    // Add global font face
    const style = document.createElement('style');
    style.innerHTML = `
      @font-face {
        font-family: 'Hieratic Numerals';
        src: url('/HieraticNumerals-vKgA.woff') format('woff');
        font-weight: normal;
        font-style: normal;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const typeInterval = setInterval(() => {
      setGlyphs(prev => {
        const newGlyphs = [...prev, getRandomCharacter()];
        
        // Check if window is filled
        if (containerRef.current) {
          const container = containerRef.current;
          const isOverflowing = container.scrollHeight > container.clientHeight;
          
          if (isOverflowing) {
            setIsWindowFilled(true);
          }
        }
        
        // If window is filled, remove first character to create rolling effect
        if (isWindowFilled) {
          return newGlyphs.slice(1);
        }
        
        // Otherwise, limit total characters
        return newGlyphs.slice(-maxCharacters);
      });

      // Always scroll to bottom
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, speed);

    // Cleanup interval on unmount
    return () => clearInterval(typeInterval);
  }, [speed, maxCharacters, isWindowFilled]);

  return (
    <div 
      ref={containerRef}
      className="overflow-hidden h-full"
      style={{
        fontFamily: '"Hieratic Numerals", monospace',
        fontWeight: 'normal',
        fontStyle: 'normal',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
        lineHeight: '1.5',
        padding: '10px',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: '0.75rem',
        fontSize: fontSize,
        color: 'rgba(57, 255, 20, 0.56)',
        textShadow: '0 0 5px rgba(157, 201, 20, 0.69), 0 0 10px rgba(157, 257, 20, 0.69), 0 0 15px rgba(157, 25, 20, 0.69), 0 0 20px rgba(157, 255, 20, 0.69)',
        animation: 'glowAnimation 2s ease-in-out infinite',
        userSelect: 'none',
        cursor: 'default'
      }}
    >
      {glyphs.join('')}
    </div>
  );
}
