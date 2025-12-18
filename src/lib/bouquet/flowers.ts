import { getPrng } from '../seed';
// We return SVG path strings or groups

export type FlowerType = 'rose' | 'daisy' | 'tulip' | 'fern' | 'eucalyptus' | 'butterfly' | 'ladybug';

// Helper to jitter points for organic feel
const perturbation = (val: number, prng: () => number, amount: number = 5) => {
    return val + (prng() - 0.5) * amount;
};

// -- FLOWER GENERATORS --

const generateRose = (id: string, seed: string, color: string, scale: number) => {
    const prng = getPrng(seed);
    const cx = 0;
    const cy = 0;

    let paths = '';

    // Layers of petals
    const layers = 3 + Math.floor(prng() * 3);
    for (let i = 0; i < layers; i++) {
        const petalsInLayer = 3 + i;
        const layerScale = scale * (0.3 + (i / layers) * 0.7);
        const rotationOffset = prng() * Math.PI * 2 + (prng() - 0.5);

        for (let j = 0; j < petalsInLayer; j++) {
            const angle = (j / petalsInLayer) * Math.PI * 2 + rotationOffset;

            const petalLen = layerScale * (0.8 + prng() * 0.4);

            const tipX = cx + Math.cos(angle) * petalLen;
            const tipY = cy + Math.sin(angle) * petalLen;

            const cp1X = cx + Math.cos(angle - 0.5) * (petalLen * 0.5);
            const cp1Y = cy + Math.sin(angle - 0.5) * (petalLen * 0.5);

            const cp2X = cx + Math.cos(angle + 0.5) * (petalLen * 0.5);
            const cp2Y = cy + Math.sin(angle + 0.5) * (petalLen * 0.5);

            const dTipX = perturbation(tipX, prng, 5);
            const dTipY = perturbation(tipY, prng, 5);

            paths += `<path d="M ${cx} ${cy} Q ${cp1X} ${cp1Y} ${dTipX} ${dTipY} Q ${cp2X} ${cp2Y} ${cx} ${cy}" fill="${color}" opacity="${0.7 + i * 0.1}" stroke="none" />`;
        }
    }

    // Center detail
    paths += `<circle cx="${cx}" cy="${cy}" r="${scale * 0.1}" fill="#ffe" opacity="0.8" />`;

    return `<g id="${id}">${paths}</g>`;
};

const generateDaisy = (id: string, seed: string, color: string, scale: number) => {
    const prng = getPrng(seed);
    const cx = 0;
    const cy = 0;
    let paths = '';

    const petalCount = 8 + Math.floor(prng() * 10);
    const petalLen = scale;

    for (let i = 0; i < petalCount; i++) {
        const angle = (i / petalCount) * Math.PI * 2;
        const tipX = cx + Math.cos(angle) * petalLen;
        const tipY = cy + Math.sin(angle) * petalLen;

        const w = scale * 0.15;
        const cp1X = cx + Math.cos(angle - 0.2) * (petalLen * 0.6);
        const cp1Y = cy + Math.sin(angle - 0.2) * (petalLen * 0.6);
        const cp2X = cx + Math.cos(angle + 0.2) * (petalLen * 0.6);
        const cp2Y = cy + Math.sin(angle + 0.2) * (petalLen * 0.6);

        const dTipX = perturbation(tipX, prng, 3);
        const dTipY = perturbation(tipY, prng, 3);

        paths += `<path d="M ${cx} ${cy} C ${cp1X} ${cp1Y}, ${dTipX - w} ${dTipY - w}, ${dTipX} ${dTipY} C ${dTipX + w} ${dTipY + w}, ${cp2X} ${cp2Y}, ${cx} ${cy}" fill="${color}" stroke="none"/>`;
    }

    paths += `<circle cx="${cx}" cy="${cy}" r="${scale * 0.25}" fill="#FFD700" stroke="none" />`;

    return `<g id="${id}">${paths}</g>`;
};

const generateTulip = (id: string, seed: string, color: string, scale: number) => {
    const prng = getPrng(seed);
    let paths = '';

    const w = scale * 0.5;
    const h = scale * 0.8;

    paths += `<path d="M ${-w} ${h * 0.2} C ${-w * 1.2} ${-h * 0.5}, ${w * 1.2} ${-h * 0.5}, ${w} ${h * 0.2} L ${0} ${h} L ${-w} ${h * 0.2}" fill="${color}" stroke="none" />`;

    return `<g id="${id}" transform="rotate(${prng() * 40 - 20})">${paths}</g>`;
};

const generateFern = (id: string, seed: string, color: string, scale: number) => {
    const prng = getPrng(seed);
    let paths = '';

    const curveDir = prng() > 0.5 ? 1 : -1;
    const h = scale * 1.2;
    const w = scale * 0.5 * curveDir;

    paths += `<path d="M 0 0 Q ${w * 0.5} ${-h * 0.5} ${w} ${-h}" stroke="${color}" stroke-width="2" fill="none" />`;

    const steps = 10;
    for (let i = 1; i < steps; i++) {
        const t = i / steps;
        const px = (1 - t) * (1 - t) * 0 + 2 * (1 - t) * t * (w * 0.5) + t * t * w;
        const py = (1 - t) * (1 - t) * 0 + 2 * (1 - t) * t * (-h * 0.5) + t * t * (-h);

        const leafSize = scale * 0.2 * (1 - Math.abs(t - 0.5));

        paths += `<ellipse cx="${px}" cy="${py}" rx="${leafSize}" ry="${leafSize / 3}" transform="rotate(${prng() * 360}, ${px}, ${py})" fill="${color}" opacity="0.8"/>`;
    }

    return `<g id="${id}">${paths}</g>`;
};

const generateEucalyptus = (id: string, seed: string, color: string, scale: number) => {
    const prng = getPrng(seed);
    let paths = '';
    const h = scale;

    paths += `<path d="M 0 0 L 0 ${-h}" stroke="${color}" stroke-width="1.5" />`;

    const nodes = 5;
    for (let i = 0; i < nodes; i++) {
        const y = -h * (i / nodes) - (scale * 0.2);
        const r = scale * 0.15 * (1 - i / (nodes * 1.5));

        paths += `<circle cx="0" cy="${y}" r="${r}" fill="${color}" opacity="0.9" />`;
        if (prng() > 0.6) {
            paths += `<circle cx="${scale * 0.1}" cy="${y - scale * 0.05}" r="${r * 0.8}" fill="${color}" opacity="0.8" />`;
        }
    }

    return `<g id="${id}" transform="rotate(${prng() * 40 - 20})">${paths}</g>`;
};

// -- FAUNA GENERATORS --

const generateButterfly = (id: string, seed: string, color: string, scale: number) => {
    const prng = getPrng(seed);
    const wingSize = scale;

    // Left Wing
    const leftWing = `<path d="M 0 0 C ${-wingSize} ${-wingSize} ${-wingSize * 1.5} ${wingSize * 0.5} 0 ${wingSize * 0.2} Z" fill="${color}" opacity="0.9" />`;
    // Right Wing
    const rightWing = `<path d="M 0 0 C ${wingSize} ${-wingSize} ${wingSize * 1.5} ${wingSize * 0.5} 0 ${wingSize * 0.2} Z" fill="${color}" opacity="0.9" />`;

    // Body
    const body = `<ellipse cx="0" cy="0" rx="${scale * 0.1}" ry="${scale * 0.4}" fill="#333" />`;

    const rot = prng() * 360;

    return `<g id="${id}" transform="rotate(${rot})">
        <g transform="scale(${0.8 + prng() * 0.4})"> 
            ${leftWing} ${rightWing} ${body}
        </g>
    </g>`;
};

const generateLadybug = (id: string, seed: string, _color: string, scale: number) => {
    const prng = getPrng(seed);
    const s = scale * 0.4;

    const spots = `
     <circle cx="${-s * 0.3}" cy="${-s * 0.3}" r="${s * 0.15}" fill="#000" />
     <circle cx="${s * 0.3}" cy="${-s * 0.3}" r="${s * 0.15}" fill="#000" />
     <circle cx="0" cy="${s * 0.2}" r="${s * 0.15}" fill="#000" />
   `;

    return `<g id="${id}" transform="rotate(${prng() * 360})">
      <circle cx="0" cy="0" r="${s}" fill="#e63946" />
      <line x1="0" y1="${-s}" x2="0" y2="${s}" stroke="#000" stroke-width="${s * 0.1}" opacity="0.5" />
      ${spots}
      <circle cx="0" cy="${-s * 0.8}" r="${s * 0.4}" fill="#000" /> 
   </g>`;
};


export const generateFlower = (
    seed: string,
    type: FlowerType,
    color: string,
    scale: number,
    x: number,
    y: number
) => {
    const flowerId = `flower-${seed}`;
    const prng = getPrng(seed);

    let svgContent = '';

    // Helper to wrap content in a group at x,y
    const rotation = (prng() - 0.5) * 60;

    // Special handling for fauna
    if (type === 'butterfly') {
        return `<g transform="translate(${x}, ${y})">${generateButterfly(flowerId, seed, color, scale)}</g>`;
    }
    if (type === 'ladybug') {
        // Pass color (though ladybug handles it as unused arg, prefixed with _)
        return `<g transform="translate(${x}, ${y})">${generateLadybug(flowerId, seed, color, scale)}</g>`;
    }

    switch (type) {
        case 'rose':
            svgContent = generateRose(flowerId, seed, color, scale);
            break;
        case 'daisy':
            svgContent = generateDaisy(flowerId, seed, color, scale);
            break;
        case 'tulip':
            svgContent = generateTulip(flowerId, seed, color, scale);
            break;
        case 'fern':
            svgContent = generateFern(flowerId, seed, color, scale);
            break;
        case 'eucalyptus':
            svgContent = generateEucalyptus(flowerId, seed, color, scale);
            break;
        default:
            svgContent = generateRose(flowerId, seed, color, scale);
    }

    return `<g transform="translate(${x}, ${y}) rotate(${rotation})">${svgContent}</g>`;
};
