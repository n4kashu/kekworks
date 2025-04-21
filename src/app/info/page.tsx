'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/app/components/Navbar'), { ssr: false });

import styles from './info.module.css';
import { useEffect } from 'react';

export default function InfoPage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles['book-container']}>
        <h1 className={styles.infoH1}>ANON // ACCESS LOGS</h1>
      <div className={styles['toc-index']}>
        <h3 className={styles.infoH3}>-- DOCUMENT INDEX --</h3>
        <ul className={styles.infoUl}>
          <li className={styles.infoLi}><a className={styles.infoA} href="#origins">Origins // System Initialize</a></li>
          <li className={styles.infoLi}><a className={styles.infoA} href="#recursive">Recursive On-Chain Citizens // Self-Assembly Code</a></li>
          <li className={styles.infoLi}><a className={styles.infoA} href="#rarity">On-Chain Rarity & Lodge Social Strata // Hierarchy Protocol</a></li>
          <li className={styles.infoLi}><a className={styles.infoA} href="#permanence">On-Chain Permanence & "Compressionism" // Data Minimization</a></li>
          <li className={styles.infoLi}><a className={styles.infoA} href="#vision">Art & Code Fusion // Future State Projections</a></li>
        </ul>
      </div>
      <section id="origins" className={styles.infoSection}>
        <h2 className={styles.infoH2}>Origins:</h2>
        <p className={styles.infoP}>~ From SynthCity to THIS ~</p>
        <p className={styles.infoP}>ANON is the evolved form of the SynthCity project. It began as a collection of <strong>10,000 pixel-art replicants</strong>.</p>
        <p className={styles.infoP}>Born on <strong>Bitcoin</strong>, the project combined unique PFPs with <code className={styles.infoCode}>222 modular traits</code> across <code className={styles.infoCode}>10 composable layers</code> into <code className={styles.infoCode}>25x25 pixel</code> pixelart avatars.</p>
        <p className={styles.infoP}>Each ANON is both a collectible and a passport into the <strong>THISCity</strong> — a digital society where absurdity, art, and technology meet. These ANONs aren't just characters; they are avatars of a futuristic story world, influenced by meme culture, cyberpunk, honest decentralized ideals, and true immutability <strong>on-chain on Bitcoin</strong> using <em>UTXO based storage by bitcoinstamps</em>.</p>
      </section>
      <section id="recursive" className={styles.infoSection}>
        <h2 className={styles.infoH2}>Recursive On-Chain Citizens</h2>
        <p className={styles.infoP}>~ Built with SRC-721r Standard ~</p>
        <p className={styles.infoP}>The current form of ANONs introduces <strong>full recursion</strong>. Using the <code className={styles.infoCode}>SRC-721r standard</code>, each ANON is minted through a recursive program that assembles it <strong>on-chain</strong> from shared modular pool of traits and everything else is dynamically calculated onchain.</p>
        <p className={styles.infoP}>Using advanced math and cryptography allows implementation of <strong>fully onchain random deterministic trait allocation</strong>, the trait combination calculated onchain based on ANONID and seedkeys. Everything is verifiable and reproducible solely from <strong>on-chain data</strong>.</p>
        <pre className={styles.infoPre}>{`
-- On-Chain Data Footprint Analysis --

LOGIC + MAGIC         ............ ~22KB
222 TRAITS IN 10 LAYERS .......... ~32KB

TOTAL ON-CHAIN STORAGE (Project) : ~54KB

Per ANON Mint (Arbitrary Data) .. < ~200 bytes

-- All data immutably stored on Bitcoin --
`}</pre>
        <p className={styles.infoP}>This efficiency is achieved using only the amounts shown above, stored as Bitcoin data where logic and additional visual layers reside. Each ANON references components stored across these layers and traits.</p>
        <p className={styles.infoP}>There are no servers, links, or off-chain generation logic. Every ANON is born from code and image data stored on Bitcoin, deterministically, safely and immutably.</p>
      </section>
      <section id="rarity" className={styles.infoSection}>
        <h2 className={styles.infoH2}>On-Chain Rarity & Lodge Social Strata</h2>
        <p className={styles.infoP}>~ Ecosystem Mechanics // Protocol Functions ~</p>
        <p className={styles.infoP}>Rarity is calculated <strong>on-chain</strong> based on trait occurrence, and every minted ANON inherently “knows” its rarity position <em>(calculable function)</em>.</p>
        <p className={styles.infoP}>This rarity is not cosmetic—it's part of the <strong>ecosystem logic</strong>.</p>
        <p className={styles.infoP}>ANONs are also categorized into <strong>Lodges</strong> based on certain traits. These Lodges represent social classes or factions within the broader universe of THIS.</p>
        <pre className={styles.infoPre}>{`
-- Impact Assessment: Rarity & Lodges --

[ STATUS: INFLUENCE ]

>> Social Standing within THISCity
>> Utility Activation in Upcoming Chapters
>> Enhanced Probability for Rare Asset Minting
>> Prioritized Access to Special Events
>> Reception of System Bonuses / Perks

-- Hierarchical Layer Engaged --
`}</pre>
        <p className={styles.infoP}>The Lodges system enhances the social gameplay embedded within the art and metadata, giving each ANON a dynamic narrative identity within a stratified digital society.</p>
      </section>
      <section id="permanence" className={styles.infoSection}>
        <h2 className={styles.infoH2}>On-Chain Permanence and “Compressionism”</h2>
        <p className={styles.infoP}>~ Core Design Philosophy ~</p>
        <p className={styles.infoP}>ANONs exemplify <strong>compressionism</strong> at its finest. A design philosophy focused on minimizing data size and resources used without sacrificing expressiveness.</p>
        <p className={styles.infoP}>With 10,000 NFTs occupying only <code className={styles.infoCode}>~54KB total</code> across code and traits, and the mint of an ANON not being more than <code className={styles.infoCode}>~200 bytes</code> of arbitrary data, this certainly pushes ANONs among the most efficient fully on-chain PFP collections in existence, if not the most efficient one.</p>
        <h3 className={styles.infoH3}>Deployment Architecture:</h3>
        <ul className={styles.infoUl}>
          <li className={styles.infoLi}>100% On-Chain Deployment via <strong>Bitcoin STAMPS protocol</strong>.</li>
          <li className={styles.infoLi}>No Reliance on External URls <em>(eliminates link rot)</em>.</li>
          <li className={styles.infoLi}>No Dependency on External APIs <em>(ensures autonomy)</em>.</li>
          <li className={styles.infoLi}>Direct On-Chain Storage; No IPFS requirement <em>(guarantees presence)</em>.</li>
        </ul>
        <p className={styles.infoP}>Their layered construction avoids unnecessary bloat while achieving full visual fidelity and uniqueness. The result: digital souls that are <strong>immutable, unprunable, censorship-resistant, and sustainable</strong> on Bitcoin’s conservative infrastructure.</p>
        <p className={styles.infoP}><em>NO LINKS TO BREAK | NO METADATA TO VANISH | PURE CODE | PURE PERMANENCE | PURE DECENTRALIZATION</em></p>
      </section>
      <section id="vision" className={styles.infoSection}>
        <h2 className={styles.infoH2}>Art & Code Fusion – Vision and Roadmap Ahead</h2>
        <p className={styles.infoP}>~ Programmable Citizens of THISCity // Future State Projection ~</p>
        <p className={styles.infoP}>ANONs aren’t static collectibles—they’re <strong>programmable citizens</strong> of a growing digital world.</p>
        <p className={styles.infoP}>The project roadmap includes future mechanics leveraging the on-chain nature:</p>
        <ul className={styles.infoUl}>
          <li className={styles.infoLi}><strong>Staking Mechanics:</strong> System engagement for utility/rewards.</li>
          <li className={styles.infoLi}><strong>Accessory Packs:</strong> Expand cosmetic/utility attributes.</li>
          <li className={styles.infoLi}><strong>Recursive Virtual Land Drops:</strong> On-chain spatial allocation linked to ANON status.</li>
          <li className={styles.infoLi}><strong>Evolving Roles for Lodges:</strong> Dynamic social & utility differentiation protocols.</li>
        </ul>
        <p className={styles.infoP}>These components will use the ANONs’ existing on-chain data—rarity <em>(and ANON hash data)</em>, traits, and affiliations—to drive minting odds and social mechanics.</p>
        <h3 className={styles.infoH3}>The Long-Term Vision:</h3>
        <p className={styles.infoP}>Establishment of a <strong>Decentralized Autonomous Society (DAS)</strong> where protocol control resides with active holders.</p>
        <p className={styles.infoP}>Each ANON is both art and logic, personality and passport, coded history and composable future. Through humor, myth, and tech, they stand as artifacts—and agents—of a blockchain-native civilization.</p>
        <p className={styles.infoP}><strong>MINTING ONE IS CLAIMING A PLACE IN A RECURSIVE LEGEND STAMPED ON BITCOIN FOREVER — END TRANSMISSION</strong></p>
      </section>
      <div style={{ textAlign: 'center' }}>
        <Link href="/">
          <button className={styles.infoButton}>
            Return to Home
          </button>
        </Link>
      </div>
      </div>
    </div>
  );
}
