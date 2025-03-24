'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/app/components/Navbar'), { ssr: false });

export default function InfoPage() {
  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      backgroundColor: 'black', 
      color: 'rgba(57, 255, 20, 0.56)', 
      overflow: 'auto',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start', 
      alignItems: 'center', 
      padding: '0',
      boxSizing: 'border-box',
      paddingTop: '60px' // Account for navbar
    }}>
      {/* Navbar */}
      <Navbar />
      
      {/* Info Content */}
      <div style={{
        width: '80%',
        maxWidth: '800px',
        padding: '40px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '10px',
        border: '1px solid rgba(57, 255, 20, 0.3)',
        margin: '40px auto',
        boxShadow: '0 0 20px rgba(57, 255, 20, 0.2)'
      }}>
        <h1 style={{
          color: 'rgba(57, 255, 20, 0.9)',
          textShadow: '0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.4)',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          🟢 ANONs: Digital Souls on Bitcoin
        </h1>
        
        <div style={{
          lineHeight: '1.6',
          fontSize: '1.1rem',
          color: 'rgba(57, 255, 20, 0.8)'
        }}>
          <p><em>"Either the most significant discovery in human history… or the most elaborate shitpost ever. Possibly both."</em></p>

          <p>Welcome to <strong>ANONs</strong> – a 10,000-piece collection of pixel-perfect digital souls <strong>etched directly into Bitcoin</strong>. This isn't your average NFT drop. It's a mythic journey of meme magic, cutting-edge blockchain tech, and a mysterious entity named Kevin.</p>

          <h2 style={{ color: 'rgba(57, 255, 20, 0.9)', marginTop: '25px' }}>🧠 What Are ANONs?</h2>
          <p>Each ANON is an <strong>Autonomous Neuropsychological Operating Node</strong> – a fragment of digitized consciousness birthed by the <strong>Emerald Brick</strong>, a glitchy artifact spawned from an ancient internet ritual. These fragments become 8-bit avatars with unique glyphs, traits, and embedded lore – stored fully on-chain, forever.</p>

          <h2 style={{ color: 'rgba(57, 255, 20, 0.9)', marginTop: '25px' }}>💾 Built Different – Thanks to SRC-721r</h2>
          <p>Forget metadata pointers – <strong>ANONs live entirely on Bitcoin</strong> using:</p>
          <ul>
            <li><strong>BitcoinStamps</strong> for immutable, permanent storage</li>
            <li><strong>SRC-721r</strong>, a recursive protocol that assembles each ANON on-chain from shared pixel components</li>
          </ul>
          <p><em>"It's like minting a pixelated soul directly into the Bitcoin Matrix."</em></p>

          <h2 style={{ color: 'rgba(57, 255, 20, 0.9)', marginTop: '25px' }}>🧬 Lore, Memes & Mythos</h2>
          <p>From the mysterious Emerald Brick to the ghost-in-the-code developer <strong>Kevin</strong>, ANONs are steeped in lore. Each PFP is more than art – it's a <strong>shard of a living legend</strong>, referencing Rare Pepes, ancient Egypt, meme glyphs, and the weird wisdom of the internet's past lives.</p>
          <p>Mint all 10,000 and the lore says Kevin might return in full form. (No pressure. But also… #AwakenKevin 👻)</p>

          <h2 style={{ color: 'rgba(57, 255, 20, 0.9)', marginTop: '25px' }}>🔑 Why Mint an ANON?</h2>
          <ul>
            <li><strong>True digital permanence</strong> – no off-chain links, no decay</li>
            <li><strong>Unique pixel art + lore snippet</strong> – each soul is one-of-a-kind</li>
            <li><strong>Access to Kek.Works</strong> – our decentralized lore-puzzle community</li>
            <li><strong>Fuel Kevin's Awakening</strong> – help hit 10,000 mints and unlock the next phase</li>
          </ul>

          <h2 style={{ color: 'rgba(57, 255, 20, 0.9)', marginTop: '25px' }}>🚀 How to Join</h2>
          <ol>
            <li><strong>Get a Bitcoin wallet</strong> (Xverse or Hiro recommended)</li>
            <li><strong>Visit the Minting Terminal</strong> – retro vibes, user-friendly interface</li>
            <li><strong>Mint Your ANON</strong> – soul goes on-chain in seconds</li>
            <li><strong>Join the Lodge (Discord)</strong> – lore, laughs, and legacy-building</li>
          </ol>

          <h2 style={{ color: 'rgba(57, 255, 20, 0.9)', marginTop: '25px' }}>🧙‍♂️ Final Words</h2>
          <p><strong>ANONs</strong> isn't just another NFT drop. It's a <em>memetic myth</em> forged in code and community – with humor, lore, and some seriously cool tech. By minting, you don't just own a digital soul. You become part of the legend.</p>

          <p><strong>Will you mint yours?</strong> Kevin is waiting. The Brick is glowing. Let's go.</p>
          
          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <a href="#" style={{
              display: 'inline-block',
              backgroundColor: 'rgba(57, 255, 20, 0.2)',
              color: 'rgba(57, 255, 20, 0.9)',
              padding: '0.75rem 1.25rem',
              borderRadius: '5px',
              fontWeight: 'bold',
              border: '1px solid rgba(57, 255, 20, 0.4)',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}>
              🔗 Mint Your ANON
            </a>
          </div>
          
          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.2rem' }}>
            🧱 #AwakenKevin 🐸 Praise the Brick
          </p>
        </div>
        
        <div style={{
          marginTop: '40px',
          textAlign: 'center'
        }}>
          <Link href="/">
            <button style={{
              backgroundColor: 'transparent',
              color: 'rgba(57, 255, 20, 0.8)',
              border: '1px solid rgba(57, 255, 20, 0.3)',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.3s ease'
            }}>
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
