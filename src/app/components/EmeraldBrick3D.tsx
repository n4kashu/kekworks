// 3D Emerald Brick React Component
'use client';
import React, { useEffect, useRef } from 'react';
import styles from './EmeraldBrick3D.module.css';

// --- TextAnimator (from original HTML) ---
class TextAnimator {
  characters: Map<SVGElement, any>;
  maxOpacity = 0.99;
  minOpacity = 0.01;
  animationDuration = 5000;
  fadeOutThreshold = 0.4;
  constructor() {
    this.characters = new Map();
  }
  addCharacter(element: SVGElement) {
    const startTime = Math.random() * this.animationDuration;
    this.characters.set(element, {
      startTime: performance.now() - startTime,
      currentChar: element.textContent,
      opacity: Math.random(),
      fadeDirection: Math.random() > 0.5 ? 1 : -1
    });
  }
  animate(currentTime: number) {
    this.characters.forEach((data, element) => {
      const elapsed = (currentTime - data.startTime) % this.animationDuration;
      const progress = elapsed / this.animationDuration;
      const opacity = (Math.sin(progress * Math.PI * 2) * 0.5 + 0.5) *
        (this.maxOpacity - this.minOpacity) + this.minOpacity;
      if (opacity < this.fadeOutThreshold && data.currentChar === element.textContent) {
        element.textContent = getRandomCharacter();
        data.currentChar = element.textContent;
      }
      (element as any).style.opacity = opacity;
    });
  }
}

// --- End TextAnimator ---

function getRandomCharacter() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

function populateCharacters(
  container: SVGElement,
  isVerticalFace: boolean,
  isHorizontalFace: boolean
) {
  if (!container) return;
  container.innerHTML = '';
  const containerWidth = isVerticalFace ? 300 : 600;
  const containerHeight = isHorizontalFace ? 300 : 1000;
  const margin = 30;
  const actualCharsPerLine = isVerticalFace ? 8 : 16;
  const actualLineCount = isHorizontalFace ? 8 : 28;
  const charWidth = (containerWidth - margin * 2) / actualCharsPerLine;
  const lineHeight = (containerHeight - margin * 2) / actualLineCount;
  for (let i = 0; i < actualLineCount; i++) {
    const textElem = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElem.setAttribute('x', margin.toString());
    textElem.setAttribute('y', (margin + lineHeight + i * lineHeight).toString());
    textElem.setAttribute('class', styles.animatedText);
    const characters = Array.from({ length: actualCharsPerLine }, getRandomCharacter);
    characters.forEach((char, index) => {
      const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
      tspan.textContent = char;
      tspan.setAttribute('x', `${margin + index * charWidth}`);
      tspan.setAttribute('opacity', Math.random().toString());
      textElem.appendChild(tspan);
    });
    container.appendChild(textElem);
  }
}

const facesConfig = [
  { name: 'front', width: 600, height: 1000, isVertical: false, isHorizontal: false },
  { name: 'back', width: 600, height: 1000, isVertical: false, isHorizontal: false },
  { name: 'left', width: 300, height: 1000, isVertical: true, isHorizontal: false },
  { name: 'right', width: 300, height: 1000, isVertical: true, isHorizontal: false },
  { name: 'top', width: 600, height: 300, isVertical: false, isHorizontal: true },
  { name: 'bottom', width: 600, height: 300, isVertical: false, isHorizontal: true },
];

const EmeraldBrick3D: React.FC = () => {
  const brickRef = useRef<HTMLDivElement>(null);
  const facesRef = useRef<(SVGSVGElement | null)[]>([]);
  const animationRef = useRef<number>();
  const rotation = useRef({ x: 15, y: 45, zoom: 0.99 });
  const isDragging = useRef(false);
  const startCoords = useRef({ x: 0, y: 0 });
  const lastAutoRotateY = useRef(45);
  const autoRotate = useRef(true);

  // Populate characters for each face and setup animators
  useEffect(() => {
    // 1. Populate faces and collect tspans for animation
    const textAnimators: TextAnimator[] = [];
    facesConfig.forEach((face, idx) => {
      const svg = facesRef.current[idx];
      if (svg) {
        const g = svg.querySelector('g');
        if (g) {
          populateCharacters(g as SVGElement, face.isVertical, face.isHorizontal);
          // Collect tspans for TextAnimator
          const tspans = g.querySelectorAll('tspan');
          const animator = new TextAnimator();
          tspans.forEach(tspan => animator.addCharacter(tspan as SVGElement));
          textAnimators.push(animator);
        }
      }
    });

    // 2. LogoAnimator
    const logoGroup = document.querySelector(`.${styles.logo} g`);
    const logoPaths = logoGroup ? logoGroup.querySelectorAll('path') : [];
    const gaussianBlur = document.querySelector('#glow feGaussianBlur');
    const feFlood = document.querySelector('#glow feFlood');
    // 3. Animate loop
    let running = true;
    function animateAll(currentTime: number) {
      // Animate text
      textAnimators.forEach(anim => anim.animate(currentTime));
      // Animate logo
      if (logoPaths && logoPaths.length && gaussianBlur && feFlood) {
        const t = currentTime / 1000;
        const green = 200 + Math.sin(t * 0.7) * 55;
        const opacity = 0.69 + Math.sin(t * 0.3) * 0.3;
        const glow = 0.99 + Math.sin(t * 0.6) * 0.4;
        (gaussianBlur as any).setAttribute('stdDeviation', 2 + Math.sin(t * 0.4) * 2);
        (feFlood as any).setAttribute('flood-opacity', 0.5 + Math.sin(t * 0.3) * 0.3);
        logoPaths.forEach(path => {
          (path as any).style.fill = `rgba(0, ${green}, 0, ${opacity})`;
          (path as any).style.filter = `drop-shadow(0 0 ${15 + glow * 20}px rgba(0, 255, 0, ${glow}))`;
        });
      }
      // Animate face glows
      facesRef.current.forEach((svg, idx) => {
        if (!svg) return;
        const parentDiv = svg.parentElement;
        if (!parentDiv) return;
        const t = currentTime / 1000;
        const glowIntensity = 0.4 + Math.sin(t * 0.5) * 0.2;
        const shadowSize = 50 + Math.sin(t * 0.5) * 20;
        parentDiv.style.boxShadow = `0 0 ${shadowSize}px rgba(0, 150, 0, ${0.8 + glowIntensity}), inset 0 0 ${100 + Math.sin(t * 0.5) * 50}px rgba(0, 255, 0, ${0.4 + glowIntensity})`;
      });
      if (running) requestAnimationFrame(animateAll);
    }
    requestAnimationFrame(animateAll);
    return () => { running = false; };
  }, []);

  // Brick rotation and drag-to-rotate
  useEffect(() => {
    let animationId: number;
    function animateBrick() {
      if (autoRotate.current && brickRef.current) {
        lastAutoRotateY.current += 1;
        rotation.current.y = lastAutoRotateY.current;
      }
      if (brickRef.current) {
        brickRef.current.style.transform = `rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg) scale(${rotation.current.zoom})`;
      }
      animationId = requestAnimationFrame(animateBrick);
    }
    animationId = requestAnimationFrame(animateBrick);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Drag-to-rotate
  useEffect(() => {
    const brick = brickRef.current;
    if (!brick) return;
    function onMouseDown(e: MouseEvent) {
      if (!autoRotate.current) {
        isDragging.current = true;
        startCoords.current = { x: e.pageX - rotation.current.y, y: e.pageY - rotation.current.x };
        if (brick) {
          brick.style.cursor = 'grabbing';
        }
      }
    }
    function onMouseMove(e: MouseEvent) {
      if (isDragging.current && !autoRotate.current) {
        rotation.current.y = (e.pageX - startCoords.current.x) * 0.3;
        rotation.current.x = (e.pageY - startCoords.current.y) * 0.3;
        lastAutoRotateY.current = rotation.current.y;
        if (brickRef.current) {
          brickRef.current.style.transform = `rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg) scale(${rotation.current.zoom})`;
        }
      }
    }
    function onMouseUp() {
      isDragging.current = false;
      if (brick) brick.style.cursor = autoRotate.current ? 'default' : 'grab';
    }
    function onDblClick() {
      autoRotate.current = !autoRotate.current;
      brick.style.cursor = autoRotate.current ? 'default' : 'grab';
      if (autoRotate.current) {
        isDragging.current = false;
        lastAutoRotateY.current = rotation.current.y;
      }
    }
    brick.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    brick.addEventListener('dblclick', onDblClick);
    return () => {
      brick.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      brick.removeEventListener('dblclick', onDblClick);
    };
  }, []);

  return (
    <div className={styles.emeraldBrickContainer} style={{ userSelect: 'none' }}>
      <div className={styles.brick} ref={brickRef} style={{ userSelect: 'none' }}>
        {/* Front Face */}
        <div className={`${styles.face} ${styles.front}`}>
          <svg width="600" height="1000" ref={el => (facesRef.current[0] = el)}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feFlood floodColor="#00ff00" floodOpacity="0.5" result="green" />
                <feComposite in="green" in2="coloredBlur" operator="in" result="glowColor" />
                <feMerge>
                  <feMergeNode in="glowColor" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect x="15" y="15" width="600" height="1000" fill="none" stroke="rgba(0,255,0,0.1)" strokeWidth="2" />
            <g></g>
            <g className={styles.logo} style={{ pointerEvents: 'none', userSelect: 'none' }}>
              {/* Center and scale the logo group itself as in original */}
              <g transform="translate(0, 100)">
                {/* Emerald Logo SVG Path */}
                <path className={styles.fil1} d="M198.21 250.89c-5.07,3.21 -5.51,11.84 -5.87,17.2 -0.52,7.16 -0.47,13.91 -1.13,21.08 -0.8,8.72 -0.65,11 8.81,10.26 8.14,-0.4 1.9,4.67 0.14,10.07 -2.55,8.26 -6.3,32.71 3.26,37.39 5.57,2.73 15.47,-0.25 22.23,0.15 4.44,0.42 7.77,0.96 12.42,1.17 4.32,0.19 27.29,0.58 29.76,-1.73 2.63,-5.8 -7.29,-8.43 -4.86,-21.41 1.22,-6.57 4.03,-19.87 -1.66,-25.06 -5.55,-5.06 -15.38,5.73 -18.29,9.86 -6.69,9.5 -5.05,9.47 -7.57,19.99 -0.62,2.59 -1.22,4.98 -3.62,6.36 -4.23,1.71 -8.05,-6.27 -8.83,-9.53 -1.1,-4.62 -1.14,-9.71 -2.27,-14.89 -0.97,-4.47 -0.59,-9.09 -0.87,-13.67 -0.89,-10.49 -6.14,-3.88 -9.81,-4.96 -2.32,-0.68 -0.27,-9.3 2.06,-9.76 3.8,-0.75 3.85,3.84 13.34,0.83 7.93,-2.52 7.67,-20.47 2.3,-23.27 -2.63,-1.37 -3.16,3.16 -7.65,1.4 -5.31,-2.1 6.36,-2.77 7.4,-5.18 1.51,-3.48 -8.26,-8.95 -11.18,-9.74 -6.36,-1.74 -12.59,0.28 -18.11,3.44z" />
                <path className={styles.fil1} d="M297.56 329.5c-5.42,5.88 -10.56,9.56 -9.28,18.57 1.61,7.53 8.38,3.7 14.66,4.84 6.81,1.24 6.93,0.32 13.2,0.29 6.49,-0.04 11.46,1.07 18.12,0 8.76,-1.7 8.34,-0.74 16.53,-0.48 8.3,0.26 5.82,-2.12 6.6,-7.47 0.4,-5.6 -4.22,-20.14 -8.39,-23.98 -5.97,-5.52 -15.24,-8.72 -23.35,-7.75 -2.58,0.31 -4.87,0.82 -7.38,1.46 -8.67,2.42 -15.13,7.63 -20.71,14.52z" />
                <path className={styles.fil1} d="M390.71 315.07c-9.32,-7.76 -10.6,14.59 -3.82,15.22 3.76,0.35 8.38,-3.33 8.08,-7.76 -0.2,-2.9 -2.16,-5.59 -4.26,-7.46zm8.38 -33.88c2.86,-4.42 2.2,-4.47 -0.82,-9.6 -2.23,-3.78 -4.01,-4.32 -7.99,-5.76 7.18,-2.01 8.41,-7.23 7.74,-14.06 -0.72,-7.31 -6.77,-3.93 -6.54,-0.42 0.31,4.69 2.93,8.28 -3.18,12 -10.69,6.5 -11.44,-6.16 -5.12,-11.76 1.32,-1.17 4.26,-3.18 1.64,-4.89 -2.95,-1.93 -6.12,3.08 -6.98,5.48 -3.2,8.9 1.28,14.37 0.54,16.28 -1.89,4.88 -5.31,7.07 -3.67,13.74 2.37,6 8.79,3.64 2.69,9.57 -3.25,3.16 -3.33,5.63 -1.8,9.96 3.45,9.81 6.9,3.9 1.23,17.18 -6.62,15.54 10.64,14.25 7.41,20.77 -0.53,1.06 -1.58,2.49 -2.28,3.5 -3.79,5.6 -7.52,10 -1.82,15.64 4.58,3.91 7.48,0.61 6.94,-4.86 -0.56,-6.45 -0.86,-20.53 8.59,-10.36 4.16,4.49 4.57,9.25 -0.47,13.2l-1.24 0.74c-8.28,4.16 5.06,2.72 7.57,1.48 6.29,-4.35 4.14,-9.72 0.15,-14.98 -2.79,-3.66 -4.94,-5.18 -8.13,-8.13 -4.96,-4.59 5,-1.27 7.96,-7.84 1.86,-5.3 -0.2,-12.47 -3.65,-16.76 -3.53,-4.39 0.56,-2.52 3.36,-6.65 3.79,-5.59 -5.1,-13.14 -3.27,-21.14l1.14 -2.33zm-7.91 12.15c9.3,7.02 3.54,18.26 -4.38,13.74 -2.89,-1.65 -2.03,-5.69 -2.48,-9.05 -0.86,-6.51 0.92,-8.84 6.86,-4.69zm-9.91 -13.54c1.71,3.57 5.12,5.02 8.94,4.22 9.8,-2.07 0.91,-16.21 -6.59,-11.6 -2.72,1.68 -2.86,4.57 -2.35,7.38z" />
                <path className={styles.fil1} d="M295 250.11c-4.81,1.96 -2.94,6.38 -2.21,10.63 1.89,10.54 3.79,17.21 4,28.22 0.51,13.49 6.42,11.66 17.43,11.4 10.17,-0.24 18.81,-1.98 28.64,-2.6 5.16,-0.22 14.8,-0.2 8.83,-7.79 -1.98,-2.5 -3.75,-4.42 -5.75,-7.12 -6.32,-8.53 -8.57,-11.56 -17.61,-17.71 -4.33,-2.92 -7.52,-5.88 -12.19,-8.64 -3.47,-1.99 -11.07,-6.82 -14.72,-7.12 -2.09,-0.17 -4.37,0.33 -6.42,0.73z" />
                <path className={styles.fil1} d="M285.16 314.68c3.52,-4.67 7.25,-16 5.77,-21.99 -1.8,-8.26 0.45,-10.09 -0.36,-16.88 -0.54,-4.56 -3.07,-17.66 -4.61,-21.76 -2.73,-6.3 -8.73,-6.33 -8.72,1.73 0,3.87 0.93,9.03 1.15,13.34 0.7,14.32 0.19,25.96 -1.54,40.17 -0.47,3.86 -0.57,6.93 3.82,7.71 2.02,0.13 3.22,-0.95 4.49,-2.32z" />
                <path className={styles.fil1} d="M222.41 359.45c11.84,-0.23 22.12,-1.12 34.15,-0.56 0.53,0.02 16.68,0.64 8.63,-1.67 -4.9,-1.4 -13.77,-1.94 -18.9,-2.14 -9.33,-0.43 -16.02,-2.24 -25.58,-1.43 -5.38,0.47 -9.52,0.68 -14.9,0.8 -10.86,0.25 -3.28,3.96 2.14,4.72 4.7,0.66 9.71,0.38 14.46,0.28z" />
              </g>
            </g>
          </svg>
        </div>
        {/* Back Face */}
        <div className={`${styles.face} ${styles.back}`}>
          <svg width="600" height="1000" ref={el => (facesRef.current[1] = el)}>
            <rect x="15" y="15" width="600" height="1000" fill="none" stroke="rgba(0,255,0,0.1)" strokeWidth="2" />
            <g></g>
          </svg>
        </div>
        {/* Left Face */}
        <div className={`${styles.face} ${styles.left}`}>
          <svg width="300" height="1000" ref={el => (facesRef.current[2] = el)}>
            <rect x="15" y="15" width="300" height="1000" fill="none" stroke="rgba(0,255,0,0.1)" strokeWidth="2" />
            <g></g>
          </svg>
        </div>
        {/* Right Face */}
        <div className={`${styles.face} ${styles.right}`}>
          <svg width="300" height="1000" ref={el => (facesRef.current[3] = el)}>
            <rect x="15" y="15" width="300" height="1000" fill="none" stroke="rgba(0,255,0,0.1)" strokeWidth="2" />
            <g></g>
          </svg>
        </div>
        {/* Top Face */}
        <div className={`${styles.face} ${styles.top}`}>
          <svg width="600" height="300" ref={el => (facesRef.current[4] = el)}>
            <rect x="15" y="15" width="600" height="300" fill="none" stroke="rgba(0,255,0,0.1)" strokeWidth="2" />
            <g></g>
          </svg>
        </div>
        {/* Bottom Face */}
        <div className={`${styles.face} ${styles.bottom}`}>
          <svg width="600" height="300" ref={el => (facesRef.current[5] = el)}>
            <rect x="15" y="15" width="600" height="300" fill="none" stroke="rgba(0,255,0,0.1)" strokeWidth="2" />
            <g></g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default EmeraldBrick3D;
