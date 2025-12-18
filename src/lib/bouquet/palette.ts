import { formatHex } from 'culori';
import { getPrng } from '../seed';

export interface Palette {
    flowerColors: string[];
    stemColor: string;
    leafColor: string;
    wrapColor: string;
    ribbonColor: string;
    backgroundColor: string;
}

// Curated base hues for romantic vibes
const BASE_HUES = [
    0,   // Red/Pink
    340, // Magenta/Rose
    30,  // Warm Orange/Peach
    260, // Deep Purple
    200, // Soft Blue (Forget-me-not)
    60,  // Yellow/Cream
];

export const generatePalette = (seed: string): Palette => {
    const prng = getPrng(seed);

    // Pick a dominant hue
    const baseHue = BASE_HUES[Math.floor(prng() * BASE_HUES.length)];

    // Generate flower colors (analogous or monochromatic variations)
    // We use OKLCH for better perceptual uniformity.
    const flowerColors: string[] = [];
    const count = 3 + Math.floor(prng() * 3); // 3 to 5 colors

    for (let i = 0; i < count; i++) {
        const hueShift = (prng() - 0.5) * 60; // +/- 30 degrees
        const aestheticColor = {
            mode: 'oklch',
            l: 0.6 + prng() * 0.3, // Lightness 0.6 - 0.9 (pastels/brights)
            c: 0.1 + prng() * 0.2, // Chroma 0.1 - 0.3 (not too neon)
            h: baseHue + hueShift
        };
        flowerColors.push(formatHex(aestheticColor));
    }

    // Stem & Leaf (Green variations)
    const stemColor = formatHex({
        mode: 'oklch',
        l: 0.3 + prng() * 0.1,
        c: 0.1 + prng() * 0.05,
        h: 130 + (prng() - 0.5) * 40 // Greens
    });

    const leafColor = formatHex({
        mode: 'oklch',
        l: 0.4 + prng() * 0.1,
        c: 0.12 + prng() * 0.05,
        h: 130 + (prng() - 0.5) * 40
    });

    // Paper wrap (Neutral warm or soft tint)
    const wrapColor = formatHex({
        mode: 'oklch',
        l: 0.90 + prng() * 0.08, // Very light
        c: 0.02,
        h: 40 // Warm beige
    });

    // Ribbon (Contrast or match)
    const ribbonColor = formatHex({
        mode: 'oklch',
        l: 0.5 + prng() * 0.2,
        c: 0.2,
        h: (baseHue + 180) % 360 // Complementary
    });

    // Background (Off-white / Warm Paper)
    const backgroundColor = '#fdfbf7'; // Fixed for now, or subtle shift

    return {
        flowerColors,
        stemColor,
        leafColor,
        wrapColor,
        ribbonColor: ribbonColor || '#ffaaaa',
        backgroundColor
    };
};
