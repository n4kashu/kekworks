'use client';

import React from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/app/components/Navbar'), { ssr: false });

import styles from './about.module.css';

const tocLinks = [
  { label: 'Origins: From SynthCity to ANON Genesis', href: '#origins' },
  { label: 'Recursive NFTs & On‑Chain Trait Generation', href: '#recursive' },
  { label: 'On-Chain Rarity & Lodge Social Strata', href: '#rarity' },
  { label: 'On-Chain Permanence Through “Compressionism”', href: '#compressionism' },
  { label: 'Art & Code Fusion – Vision and Roadmap Ahead', href: '#vision' },
];

const AboutPage = () => (
  <div className={styles.mainContainer}>
    <div className={styles.bookContainer} style={{ marginTop: '60px' }}>
    <h1>ANONs – Bitcoin-Stamped Recursive PFPs</h1>
    <div className={styles.tocIndex}>
      <h3>Table of Contents</h3>
      <ul>
        {tocLinks.map((item, idx) => (
          <li key={idx}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
    <section id="origins">
      <h2>Origins: From SynthCity to ANON Genesis</h2>
      <p><strong>ANONs</strong> is the evolved form of the SynthCity project, beginning as a collection of 10,000 pixel-art replicants. Born on Bitcoin, the project combined unique PFPs with 222 modular traits across 10 composable layers into 25x25pixel pixelart avatars. Each ANON is both a collectible and a passport into the THISCity—a digital society where rarity, art, and technology meet. These ANONs aren't just characters; they are avatars of a futuristic story world, influenced by meme culture, cyberpunk themes, and honest decentralized ideals.</p>
    </section>
    <section id="recursive">
      <h2>Recursive NFTs & On‑Chain Trait allocation</h2>
      <p>The current form of ANONs introduces full recursion. Using the SRC-721r standard, each ANON is minted through a recursive program that assembles it on-chain from shared modular traits. Using advanced math and cryptography alows implementation of <strong>fully onchain random deterministic trait allocation</strong>, the trait combination is randomly selected but verifiable and reproducible solely from on-chain data. This is achieved <strong>using only ~22KB</strong> of Bitcoin data where logic and additional visual layers are stored. Each ANON references components stored in <strong>222 separate traits in 10 layers, taking ~32KB storage space</strong> , meaning the entire project—including all code and art—is <strong>preserved forever in just ~54KB of Bitcoin UTXO space</strong>. There are no servers, links, or off-chain generation logic. Every ANON is born from code, on Bitcoin, deterministically.</p>
    </section>
    <section id="rarity">
      <h2>On-Chain Rarity & Lodge Social Strata</h2>
      <p>Rarity is calculated on-chain based on trait occurrence, and every minted ANON inherently “knows” its rarity position. This rarity is not cosmetic—it's part of the ecosystem logic. ANONs are also categorized into <strong>Lodges</strong> based on certain traits. These Lodges represent social classes or factions within the broader universe of THIS. Lodge affiliation and rarity ranking will influence social standing and utility in upcoming chapters, including higher chances to mint rare assets, access special events, or receive bonuses. The Lodges system enhances the social gameplay embedded within the art and metadata, giving each ANON a dynamic narrative identity within a stratified digital society.</p>
    </section>
    <section id="compressionism">
      <h2>On-Chain Permanence and “Compressionism”</h2>
      <p>ANONs exemplify <strong>compressionism</strong> at its finest. A design philosophy focused on minimizing data size and resources used without sacrificing expressiveness.  With 10,000 NFTs occupying only ~54KB total across code and traits and mint of an ANON not being more than 200bytes of arbitrary data this certainly pushes ANON genesys among the most efficient fully on-chain PFP collections in existence, if not the most efficient one.  Unlike many NFTs that rely on URLs, external APIs, or even IPFS, ANONs are 100% on-chain via the Bitcoin STAMPS protocol. Their layered construction avoids unnecessary bloat while achieving full visual fidelity and uniqueness. The result: digital souls that are immutable, unprunable, censorship-resistant, and sustainable on Bitcoin’s conservative infrastructure. No links to break. No metadata to vanish. Pure code. Pure permanence.Pure decentralization</p>
    </section>
    <section id="vision">
      <h2>Art & Code Fusion – Vision and Roadmap Ahead</h2>
      <p>ANONs aren’t static collectibles—they’re programmable citizens of a growing digital world. The project roadmap includes future staking mechanics, accessory packs, recursive virtual land drops, and evolving roles for Lodges. These components will use the ANONs’ existing data—rarity (and ANON hash..), traits, and affiliations—to drive minting odds and social mechanics. The long-term vision remains: a decentralized autonomous society (DAS) where holders steer the direction. Each ANON is both art and logic, personality and passport, coded history and composable future. Through humor, myth, and tech, they stand as artifacts—and agents—of a blockchain-native civilization. Minting one is claiming a place in a recursive legend stamped on Bitcoin forever.</p>
    </section>
    </div>
</div>
);

export default AboutPage;

