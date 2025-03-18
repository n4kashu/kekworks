'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const GlyphTypeout = dynamic(() => import('@/app/components/GlyphTypeout'), { ssr: false });
const Navbar = dynamic(() => import('@/app/components/Navbar'), { ssr: false });

export default function BrickResearchPage() {
  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      backgroundColor: 'black', 
      color: 'rgba(57, 255, 20, 0.56)', 
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start', 
      alignItems: 'center', 
      padding: '0',
      boxSizing: 'border-box',
      paddingTop: '60px' // Add padding to account for fixed navbar
    }}>
      {/* Navbar */}
      <Navbar />
      
      {/* Brick Research Content */}
      <div style={{
        width: '100%',
        height: 'calc(100% - 60px)',
        padding: '40px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}>
          {/* Glyph Typeout Section */}
          <div style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '10px',
            border: '1px solid rgba(57, 255, 20, 0.3)',
            padding: '20px',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}>
            <div style={{
              fontWeight: 'bold',
              color: 'rgba(57, 255, 20, 1)',
              textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
              letterSpacing: '1px',
              fontSize: '1.5em',
              marginBottom: '20px'
            }}>
              Brick Analysis Data
            </div>
            <div style={{ height: 'calc(100% - 50px)', overflow: 'hidden' }}>
              <GlyphTypeout speed={30} fontSize="1.1rem" />
            </div>
          </div>
          
          {/* Description Section */}
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '10px',
            border: '1px solid rgba(57, 255, 20, 0.3)',
            padding: '20px',
            boxSizing: 'border-box',
          }}>
            <div style={{
              fontWeight: 'bold',
              color: 'rgba(57, 255, 20, 1)',
              textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
              letterSpacing: '1px',
              fontSize: '1.2em',
              marginBottom: '15px'
            }}>
              About Brick Research
            </div>
            <div style={{
              color: 'rgba(57, 255, 20, 0.8)',
              lineHeight: '1.6',
              fontSize: '1rem'
            }}>
              <p>
                The Emerald Brick of KEK exhibits unique properties that defy conventional physics. 
                This research module continuously analyzes the brick&apos;s hieroglyphic emanations and translates 
                them into readable patterns.
              </p>
              <p>
                Research suggests the glyphs may contain encoded information related to the brick&apos;s 
                origin and purpose. Our systems continuously monitor and decode these patterns in real-time.
              </p>
              <p>
                <strong>Warning:</strong> Prolonged exposure to the glyph patterns may induce altered states of consciousness. 
                Research staff are advised to limit viewing sessions to 30-minute intervals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
