import { generatePalette, type Palette } from './palette';
import { generateFlower, type FlowerType } from './flowers';
import { getPrng } from '../seed';
import { adjustColor } from '../utils/colors';

export interface BouquetData {
  svg: string;
  seed: string;
  palette: Palette;
}

// Generate an elegant ribbon bow SVG
const generateRibbon = (x: number, y: number, color: string, prng: () => number): string => {
  const ribbonColor = color;
  const ribbonDark = adjustColor(color, -30);
  const ribbonLight = adjustColor(color, 30);

  // Bow loops
  const bowWidth = 60 + prng() * 20;
  const bowHeight = 35 + prng() * 10;

  return `
    <g transform="translate(${x}, ${y})">
      <!-- Left bow loop -->
      <ellipse cx="${-bowWidth / 2}" cy="0" rx="${bowWidth / 2.5}" ry="${bowHeight / 2}" 
        fill="${ribbonColor}" stroke="${ribbonDark}" stroke-width="1" 
        transform="rotate(-15)"/>
      <ellipse cx="${-bowWidth / 2 + 5}" cy="-3" rx="${bowWidth / 4}" ry="${bowHeight / 4}" 
        fill="${ribbonLight}" opacity="0.4"/>
      
      <!-- Right bow loop -->
      <ellipse cx="${bowWidth / 2}" cy="0" rx="${bowWidth / 2.5}" ry="${bowHeight / 2}" 
        fill="${ribbonColor}" stroke="${ribbonDark}" stroke-width="1"
        transform="rotate(15)"/>
      <ellipse cx="${bowWidth / 2 - 5}" cy="-3" rx="${bowWidth / 4}" ry="${bowHeight / 4}" 
        fill="${ribbonLight}" opacity="0.4"/>
      
      <!-- Center knot -->
      <ellipse cx="0" cy="0" rx="12" ry="10" fill="${ribbonDark}"/>
      <ellipse cx="0" cy="-2" rx="8" ry="6" fill="${ribbonColor}"/>
      
      <!-- Hanging tails -->
      <path d="M -8 8 Q -15 40 -20 70 Q -18 72 -12 68 Q -10 45 -5 15" 
        fill="${ribbonColor}" stroke="${ribbonDark}" stroke-width="0.5"/>
      <path d="M 8 8 Q 15 45 25 75 Q 27 73 22 68 Q 12 40 5 15" 
        fill="${ribbonColor}" stroke="${ribbonDark}" stroke-width="0.5"/>
        
      <!-- Tail highlights -->
      <path d="M -7 12 Q -12 35 -16 55" stroke="${ribbonLight}" stroke-width="3" fill="none" opacity="0.4"/>
      <path d="M 7 12 Q 12 40 18 60" stroke="${ribbonLight}" stroke-width="3" fill="none" opacity="0.4"/>
    </g>
  `;
};

// Adjust color brightness utility moved to utils/colors.ts

// Generate baby's breath filler flowers
const generateBabysBreath = (cx: number, cy: number, radius: number, count: number, prng: () => number): string => {
  let flowers = '';
  for (let i = 0; i < count; i++) {
    const angle = prng() * Math.PI * 2;
    const r = prng() * radius;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    const size = 2 + prng() * 3;
    flowers += `<circle cx="${x}" cy="${y}" r="${size}" fill="white" opacity="${0.7 + prng() * 0.3}"/>`;
    // Add tiny stems
    flowers += `<line x1="${x}" y1="${y}" x2="${x + (prng() - 0.5) * 5}" y2="${y + 8}" stroke="#7a9e7a" stroke-width="0.5" opacity="0.5"/>`;
  }
  return `<g>${flowers}</g>`;
};

export const generateBouquet = (seed: string): BouquetData => {
  const palette = generatePalette(seed);
  const prng = getPrng(seed);

  // Canvas dimensions
  const width = 600;
  const height = 800;

  // -- VASE GENERATION (Randomized Structure) --
  // Randomize dimensions for uniqueness
  const vaseWidth = 130 + prng() * 40; // 130-170
  const vaseHeight = 210 + prng() * 40; // 210-250
  const vaseX = width / 2;
  const vaseY = 520; // Raised from 580 to keep vase on table surface (mobile fix)

  // Randomize shape curvature
  const curve1 = 10 + prng() * 20;
  const curve2 = 10 + prng() * 20;

  // Glass path with unique shape per seed
  const vasePath = `
    M ${vaseX - vaseWidth / 2} ${vaseY - vaseHeight} 
    Q ${vaseX - vaseWidth / 2 - curve1} ${vaseY - vaseHeight / 2} ${vaseX - vaseWidth / 2 + 10} ${vaseY} 
    L ${vaseX + vaseWidth / 2 - 10} ${vaseY}
    Q ${vaseX + vaseWidth / 2 + curve2} ${vaseY - vaseHeight / 2} ${vaseX + vaseWidth / 2} ${vaseY - vaseHeight}
    Z
  `;

  // Water level
  const waterHeight = vaseHeight * (0.6 + prng() * 0.15);
  const waterPath = `
    M ${vaseX - vaseWidth / 2 + 5} ${vaseY - waterHeight}
    L ${vaseX + vaseWidth / 2 - 5} ${vaseY - waterHeight}
    L ${vaseX + vaseWidth / 2 - 10} ${vaseY}
    L ${vaseX - vaseWidth / 2 + 10} ${vaseY}
    Z
  `;

  // -- BOUQUET COMPOSITION --
  const stemsInside: string[] = [];
  const stemsAbove: string[] = [];
  const foliageBack: string[] = [];
  const foliageFront: string[] = [];
  const bloomingFlowers: string[] = [];
  const fillerLayer: string[] = [];

  // Bloom center mass (above vase)
  const bloomCy = vaseY - vaseHeight - 40;
  const bloomCx = width / 2;

  // 1. Foliage generation REMOVED - was causing stuck "pine cone" leaf bug
  // User confirmed this fixes the issue (leaf appeared at screen 0,0)

  // 2. Generate Main Flowers & Stems - OPTIMIZED
  const flowerCount = 40 + Math.floor(prng() * 20); // 40-60 flowers (Balanced for mobile)
  const spreadFactor = 0.9 + prng() * 0.3; // Slightly tighter spread

  // ... (Phyllotaxis distribution kept same, but less count)
  const goldenAngle = 2.39996 + (prng() - 0.5) * 0.1;

  const availableTypes: FlowerType[] = ['rose', 'tulip', 'peony', 'lily', 'carnation', 'daisy'];
  const dominantType = availableTypes[Math.floor(prng() * availableTypes.length)];
  const secondaryType = availableTypes[Math.floor(prng() * availableTypes.length)];

  for (let i = 0; i < flowerCount; i++) {
    const r = (15 + Math.sqrt(i) * 55) * spreadFactor;
    const theta = i * goldenAngle;
    // ... (coordinates calculation same)
    const x = bloomCx + r * Math.cos(theta);
    const y = bloomCy + r * Math.sin(theta) * 0.8 + (prng() - 0.5) * 40;

    // ... (Type selection same)
    let type: FlowerType = 'rose';
    let scale = 50;
    const distRatio = r / (250 * spreadFactor);
    if (distRatio < 0.3) {
      type = prng() > 0.3 ? dominantType : 'peony';
      scale = 80 + prng() * 40;
    } else if (distRatio < 0.7) {
      type = prng() > 0.5 ? dominantType : secondaryType;
      scale = 60 + prng() * 30;
    } else {
      type = availableTypes[Math.floor(prng() * availableTypes.length)];
      scale = 40 + prng() * 30;
    }
    const color = palette.flowerColors[Math.floor(prng() * palette.flowerColors.length)];

    // ... (Stem logic same)
    const neckX = vaseX + (prng() - 0.5) * 25;
    const neckY = vaseY - vaseHeight + 10;
    const cp1x = x + (prng() - 0.5) * 30;
    const cp1y = (y + neckY) * 0.5 + (prng() - 0.5) * 20;

    stemsAbove.push(`<path d="M ${x} ${y} Q ${cp1x} ${cp1y} ${neckX} ${neckY}" stroke="${palette.stemColor}" stroke-width="${2 + prng()}" fill="none" />`);

    const bottomX = vaseX + (prng() - 0.5) * 70;
    const bottomY = vaseY - 10;
    stemsInside.push(`<path d="M ${neckX} ${neckY} L ${bottomX} ${bottomY}" stroke="${palette.stemColor}" stroke-width="2" fill="none" opacity="0.4" />`);

    bloomingFlowers.push(generateFlower(seed + i, type, color, scale, x, y));
  }

  // 3. Filler - Reduced
  const fillerCount = 10 + Math.floor(prng() * 8);
  for (let i = 0; i < fillerCount; i++) {
    const angle = prng() * Math.PI * 2;
    const r = 40 + prng() * 140; // Tighter
    const x = bloomCx + Math.cos(angle) * r;
    const y = bloomCy + Math.sin(angle) * r * 0.7;
    fillerLayer.push(generateBabysBreath(x, y, 35, 12 + Math.floor(prng() * 10), prng));
  }

  // ... (Rest of logic)

  // ... (Dewdrops reduced)
  const dewdrops: string[] = [];
  for (let i = 0; i < 12; i++) { // Reduced count
    const angle = prng() * Math.PI * 2;
    const r = prng() * 120;
    const dx = bloomCx + Math.cos(angle) * r;
    const dy = bloomCy + Math.sin(angle) * r * 0.7;
    const size = 2 + prng() * 4;
    dewdrops.push(`
        <ellipse cx="${dx}" cy="${dy}" rx="${size}" ry="${size * 0.7}" 
          fill="url(#dewdrop-grad)" opacity="${0.6 + prng() * 0.3}"/>
      `);
  }

  // 4. Ribbon (Same)
  const ribbonColors = ['#e63946', '#d4a373', '#bc6c25', '#9d4edd', '#e07be0'];
  const ribbonColor = ribbonColors[Math.floor(prng() * ribbonColors.length)];
  const ribbon = generateRibbon(vaseX, vaseY - vaseHeight + 5, ribbonColor, prng);

  // 5. Fauna (Reduced count)
  const butterflyCount = Math.floor(prng() * 3) + 1; // 1-4 butterflies
  const faunaLayer: string[] = [];

  for (let i = 0; i < butterflyCount; i++) {
    const bx = bloomCx + (prng() - 0.5) * 200; // Tighter range (was 300)
    const by = bloomCy + (prng() - 0.5) * 180;
    const bColor = prng() > 0.5 ? '#f4a261' : '#e9c46a';
    faunaLayer.push(generateFlower(seed + 'bug' + i, 'butterfly', bColor, 25 + prng() * 15, bx, by));
  }

  // Ladybugs
  const ladybugCount = Math.floor(prng() * 3) + 1;
  for (let i = 0; i < ladybugCount; i++) {
    const r = prng() * 100;
    const theta = prng() * Math.PI * 2;
    const lx = bloomCx + Math.cos(theta) * r;
    const ly = bloomCy + Math.sin(theta) * r;
    faunaLayer.push(generateFlower(seed + 'lady' + i, 'ladybug', 'red', 10 + prng() * 4, lx, ly));
  }

  bloomingFlowers.reverse();

  // SVG Structure - REMOVED HEAVY FILTERS for performance
  const svg = `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" style="overflow: visible" preserveAspectRatio="xMidYMid meet">
       <defs>
         <style>
           @keyframes bloom {
             0% { transform: scale(0); opacity: 0; }
             40% { transform: scale(1.1); opacity: 0.8; }
             100% { transform: scale(1); opacity: 1; }
           }
           @keyframes sway {
             0%, 100% { transform: rotate(-3deg); }
             50% { transform: rotate(3deg); }
           }
           .flower-bloom { transform-origin: 0px 0px; }
           .flower-sway { transform-origin: 0px 0px; animation: sway 5s ease-in-out infinite; }
         </style>
         
         <!-- Optimized Filters: Removed complex turbulence/displacement -->
         
         <!-- Simple Specular (Kept as it's cheapish) -->
         <filter id="glass-specular">
             <feSpecularLighting result="specOut" specularExponent="30" lighting-color="#ffffff">
                 <fePointLight x="${width / 2 - 50}" y="${height / 2}" z="200"/>
             </feSpecularLighting>
             <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
         </filter>
 
         <!-- Removed Watercolor Filter (Laggy) -->
         
         <linearGradient id="water-grad" x1="0" x2="0" y1="0" y2="1">
             <stop offset="0%" stop-color="#d4f1f9" stop-opacity="0.4" />
             <stop offset="50%" stop-color="#a8daec" stop-opacity="0.55" />
             <stop offset="100%" stop-color="#7ec8e3" stop-opacity="0.7" />
         </linearGradient>
         
         <linearGradient id="vase-glass" x1="0" x2="1" y1="0" y2="0">
             <stop offset="0%" stop-color="#d0e8f5" stop-opacity="0.25" />
             <stop offset="25%" stop-color="#ffffff" stop-opacity="0.1" />
             <stop offset="50%" stop-color="#f0f8ff" stop-opacity="0.08" />
             <stop offset="75%" stop-color="#ffffff" stop-opacity="0.12" />
             <stop offset="100%" stop-color="#d0e8f5" stop-opacity="0.2" />
         </linearGradient>
         
         <radialGradient id="dewdrop-grad" cx="30%" cy="30%" r="70%">
             <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
             <stop offset="50%" stop-color="#e0f7ff" stop-opacity="0.6" />
             <stop offset="100%" stop-color="#b0e0ff" stop-opacity="0.3" />
         </radialGradient>
         
         <!-- Simple Shadow (Optimized) -->
         <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
             <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.1"/>
         </filter>
         
         <!-- Removed complex Glow filter -->
 
          <clipPath id="vase-clip">
             <path d="${vasePath}" />
          </clipPath>
       </defs>
 
       <!-- Vase Shadow -->
       <ellipse cx="${vaseX}" cy="${vaseY + 5}" rx="${vaseWidth / 2 + 25}" ry="18" fill="#000" opacity="0.12" />
 
       <g filter="url(#soft-shadow)">${foliageBack.join('')}</g>
 
       <g>
         <path d="${vasePath}" fill="url(#vase-glass)" stroke="rgba(200,220,240,0.4)" stroke-width="1.5" />
         <g clip-path="url(#vase-clip)">${stemsInside.join('')}</g>
         <path d="${waterPath}" fill="url(#water-grad)" clip-path="url(#vase-clip)" />
         <path d="M ${vaseX - vaseWidth / 2 + 5} ${vaseY - vaseHeight} Q ${vaseX} ${vaseY - vaseHeight - 3} ${vaseX + vaseWidth / 2 - 5} ${vaseY - vaseHeight}" stroke="rgba(255,255,255,0.6)" stroke-width="2" fill="none" stroke-linecap="round"/>
         <path d="M ${vaseX - vaseWidth / 2 + 12} ${vaseY - vaseHeight + 15} Q ${vaseX - vaseWidth / 2 + 5} ${vaseY - vaseHeight / 2} ${vaseX - vaseWidth / 2 + 18} ${vaseY - 25}" stroke="rgba(255,255,255,0.5)" stroke-width="3" fill="none" stroke-linecap="round"/>
         <path d="M ${vaseX + vaseWidth / 2 - 20} ${vaseY - vaseHeight + 25} L ${vaseX + vaseWidth / 2 - 15} ${vaseY - 35}" stroke="rgba(255,255,255,0.25)" stroke-width="5" fill="none" stroke-linecap="round"/>
       </g>
       
       <path d="M ${vaseX - vaseWidth / 2 + 15} ${vaseY - vaseHeight + 20} Q ${vaseX - vaseWidth / 2 + 10} ${vaseY - vaseHeight / 2} ${vaseX - vaseWidth / 2 + 20} ${vaseY - 30}" stroke="rgba(255,255,255,0.5)" stroke-width="4" fill="none" stroke-linecap="round"/>
       
       ${ribbon}
       <g>${stemsAbove.join('')}</g>
       <g>${fillerLayer.join('')}</g>
       <g>${foliageFront.join('')}</g>
       
       <!-- Main Blooms (No watercolor filter) -->
       <g filter="url(#soft-shadow)">${bloomingFlowers.join('')}</g>
       
       <!-- Dewdrops -->
       <g>${dewdrops.join('')}</g>
       
       <!-- Fauna -->
       <g>${faunaLayer.join('')}</g>
       
     </svg>
   `;


  return {
    svg,
    seed,
    palette
  };
};
