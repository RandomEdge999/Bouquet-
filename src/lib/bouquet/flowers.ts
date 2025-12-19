import { getPrng } from '../seed';
import { adjustColor } from '../utils/colors';

export type FlowerType = 'rose' | 'daisy' | 'tulip' | 'peony' | 'lily' | 'carnation' | 'fern' | 'eucalyptus' | 'butterfly' | 'ladybug';

export const generateFlower = (
  seed: string,
  type: FlowerType,
  color: string,
  scale: number,
  x: number,
  y: number
): string => {
  const prng = getPrng(seed);

  // Random rotation for natural feel
  const rotation = (prng() - 0.5) * 60; // +/- 30 degrees

  // Slight random offset
  const dx = (prng() - 0.5) * 10;
  const dy = (prng() - 0.5) * 10;

  const content = getFlowerContent(type, color, prng);

  // Add animation class based on type
  const animClass = (type === 'fern' || type === 'eucalyptus') ? 'flower-sway' : 'flower-bloom';
  const animDelay = prng() * 0.5;

  return `
    <g transform="translate(${x + dx}, ${y + dy}) scale(${scale / 100}) rotate(${rotation})" 
       class="${animClass}" style="animation-delay: -${animDelay}s">
      ${content}
    </g>
  `;
};

const getFlowerContent = (type: FlowerType, color: string, prng: () => number): string => {
  switch (type) {
    case 'rose':
      return generateRose(color, prng);
    case 'daisy':
      return generateDaisy(color, prng);
    case 'tulip':
      return generateTulip(color, prng);
    case 'peony':
      return generatePeony(color, prng);
    case 'lily':
      return generateLily(color, prng);
    case 'carnation':
      return generateCarnation(color, prng);
    case 'fern':
      return generateFern(color, prng);
    case 'eucalyptus':
      return generateEucalyptus(color, prng);
    case 'butterfly':
      return generateButterfly(color, prng);
    case 'ladybug':
      return generateLadybug(color, prng);
    default:
      return generateRose(color, prng);
  }
};

const generateRose = (color: string, _prng: () => number): string => {
  // Artistic Rose with multiple overlapping petals
  return `
    <g>
      <!-- Outer Petals -->
      <path d="M -20 -20 Q 0 -45 20 -20 Q 45 0 20 20 Q 0 45 -20 20 Q -45 0 -20 -20" 
            fill="${adjustColor(color, -20)}" />
      
      <!-- Middle Spiral -->
      <path d="M -15 -10 Q 0 -35 15 -10 Q 30 5 10 15 Q -10 30 -15 10" 
            fill="${color}" />
            
      <!-- Inner bud -->
      <path d="M -8 -5 Q 0 -20 8 -5 Q 15 5 0 12 Q -15 5 -8 -5" 
            fill="${adjustColor(color, 30)}" />
            
      <!-- Center tight swirl -->
      <path d="M -3 0 Q 0 -8 3 0 Q 5 5 0 8 Q -5 5 -3 0" 
            fill="${adjustColor(color, 50)}" />
    </g>
  `;
};

const generateDaisy = (color: string, prng: () => number): string => {
  let petals = '';
  const numPetals = 12 + Math.floor(prng() * 8);

  for (let i = 0; i < numPetals; i++) {
    const angle = (360 / numPetals) * i;
    petals += `
      <ellipse cx="0" cy="-25" rx="5" ry="20" fill="${color}"
               transform="rotate(${angle})" />
    `;
  }

  return `
    <g>
      ${petals}
      <!-- Center -->
      <circle cx="0" cy="0" r="12" fill="#ffd700" stroke="#eda000" stroke-width="2"/>
      <circle cx="-3" cy="-3" r="3" fill="#ffec80" opacity="0.6"/>
    </g>
  `;
};

const generateTulip = (color: string, _prng: () => number): string => {
  return `
    <g transform="translate(0, -20)">
      <!-- Left Petal -->
      <path d="M 0 40 Q -30 20 -20 -20 Q -10 -40 0 -30" 
            fill="${color}" stroke="${adjustColor(color, -30)}" stroke-width="1"/>
            
      <!-- Right Petal -->
      <path d="M 0 40 Q 30 20 20 -20 Q 10 -40 0 -30" 
            fill="${color}" stroke="${adjustColor(color, -30)}" stroke-width="1"/>
            
      <!-- Center Petal -->
      <ellipse cx="0" cy="0" rx="15" ry="35" fill="${adjustColor(color, 20)}" />
    </g>
  `;
};

const generateFern = (color: string, _prng: () => number): string => {
  // Simple Fern Leaf
  let leaves = '';
  for (let i = 0; i < 8; i++) {
    const y = -10 - i * 8;
    const w = 20 - i * 2;
    leaves += `
      <path d="M 0 ${y} L ${w} ${y - 5} L 0 ${y - 10} L -${w} ${y - 5} Z" fill="${color}" />
    `;
  }
  return `
    <g>
      <path d="M 0 0 Q 5 -40 0 -80" stroke="${adjustColor(color, -40)}" stroke-width="2" fill="none"/>
      ${leaves}
    </g>
  `;
};

const generateEucalyptus = (color: string, prng: () => number): string => {
  let leaves = '';
  for (let i = 0; i < 5; i++) {
    const y = -20 - i * 15;
    leaves += `
      <circle cx="${(i % 2 === 0 ? 10 : -10)}" cy="${y}" r="8" fill="${color}" />
    `;
  }
  return `
    <g>
      <path d="M 0 0 Q ${prng() * 10 - 5} -50 0 -100" stroke="#5d7265" stroke-width="2" fill="none"/>
      ${leaves}
    </g>
  `;
};

const generateButterfly = (color: string, _prng: () => number): string => {
  return `
    <g>
      <!-- Wings -->
      <path d="M 0 0 Q -30 -30 -10 -50 Q 10 -30 0 0" fill="${color}" opacity="0.9"/>
      <path d="M 0 0 Q 30 -30 10 -50 Q -10 -30 0 0" fill="${color}" opacity="0.9"/>
      <path d="M 0 0 Q -25 25 -5 40 Q 5 25 0 0" fill="${adjustColor(color, -20)}" opacity="0.9"/>
      <path d="M 0 0 Q 25 25 5 40 Q -5 25 0 0" fill="${adjustColor(color, -20)}" opacity="0.9"/>
      <!-- Body -->
      <path d="M 0 -10 L 0 10" stroke="#333" stroke-width="2"/>
    </g>
  `;
};

const generateLadybug = (_color: string, _prng: () => number): string => {
  return `
    <g>
      <circle cx="0" cy="0" r="10" fill="red" />
      <path d="M 0 -10 L 0 10" stroke="black" stroke-width="1"/>
      <circle cx="-5" cy="-3" r="2" fill="black"/>
      <circle cx="5" cy="3" r="2" fill="black"/>
      <circle cx="-3" cy="5" r="2" fill="black"/>
      <circle cx="0" cy="-12" r="3" fill="black"/> <!-- Head -->
    </g>
  `;
};

const generatePeony = (color: string, _prng: () => number): string => {
  // Large, ruffled, multi-layered bloom
  return `
    <g>
      <!-- Outer wide petals -->
      <path d="M -25 -10 Q 0 -45 25 -10 Q 50 15 20 35 Q -20 35 -50 15 Q -50 -5 -25 -10" 
            fill="${adjustColor(color, -20)}" />
      <!-- Middle ruffled layers -->
      <path d="M -15 -15 Q 0 -40 15 -15 Q 35 10 10 30 Q -10 30 -35 10 Q -35 -5 -15 -15" 
            fill="${color}" opacity="0.9" />
      <path d="M -10 -5 Q 5 -25 20 -5 Q 25 15 5 25 Q -15 25 -20 5" 
            fill="${adjustColor(color, 20)}" opacity="0.95" />
      <!-- Inner bud chaos -->
      <path d="M -5 0 Q 0 -15 5 0 Q 10 10 0 15 Q -10 10 -5 0" 
            fill="${adjustColor(color, 40)}" />
    </g>
  `;
};

const generateLily = (color: string, _prng: () => number): string => {
  // Star shape with distinct stamens
  return `
    <g>
      <!-- 6 Petals Star -->
      <path d="M 0 -35 Q 8 -15 0 0 Q -8 -15 0 -35" fill="${color}" />
      <path d="M 0 35 Q 8 15 0 0 Q -8 15 0 35" fill="${color}" />
      <path d="M -30 -15 Q -15 -5 0 0 Q -15 5 -30 15" fill="${color}" />
      <path d="M 30 -15 Q 15 -5 0 0 Q 15 5 30 15" fill="${color}" />
      <path d="M -25 25 Q -10 10 0 0 Q -5 15 -25 25" fill="${color}" />
      <path d="M 25 25 Q 10 10 0 0 Q 5 15 25 25" fill="${color}" />
      
      <!-- Stamen -->
      <line x1="0" y1="0" x2="-5" y2="-15" stroke="#ffeebb" stroke-width="1" />
      <line x1="0" y1="0" x2="5" y2="-15" stroke="#ffeebb" stroke-width="1" />
      <circle cx="-5" cy="-15" r="2" fill="#d2691e" />
      <circle cx="5" cy="-15" r="2" fill="#d2691e" />
    </g>
  `;
};

const generateCarnation = (color: string, _prng: () => number): string => {
  // Serrated edges, tight gathering
  return `
    <g>
       <path d="M -15 -20 L -12 -25 L -9 -20 L -6 -25 L -3 -20 L 0 -25 L 3 -20 L 6 -25 L 9 -20 L 12 -25 L 15 -20 
                Q 20 0 10 15 Q 0 25 -10 15 Q -20 0 -15 -20" 
             fill="${color}" stroke="${adjustColor(color, -10)}" stroke-width="0.5" />
       
       <path d="M -10 -15 L -8 -20 L -6 -15 L -4 -20 L -2 -15 L 0 -20 L 2 -15 L 4 -20 L 6 -15 L 8 -20 L 10 -15
                Q 15 0 0 10 Q -15 0 -10 -15"
             fill="${adjustColor(color, 20)}" />
    </g>
  `;
};

// Helper to adjust color hex brightness
// Moved to src/lib/utils/colors.ts
