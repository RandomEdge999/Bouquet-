// Sound effects system using Web Audio API for bouquet reveal animation
// All sounds are synthesized - no audio files required

let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext;
};

// Helper to create noise buffer
const createNoiseBuffer = (duration: number): AudioBuffer => {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    return buffer;
};

/**
 * Scissor cutting sound - metallic snip effect
 */
export const playScissorSound = async (): Promise<void> => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') await ctx.resume();

    const now = ctx.currentTime;

    // High-pitched metallic oscillator
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = 'square';
    osc1.frequency.setValueAtTime(2400, now);
    osc1.frequency.exponentialRampToValueAtTime(800, now + 0.05);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(3200, now);
    osc2.frequency.exponentialRampToValueAtTime(600, now + 0.06);

    filter.type = 'highpass';
    filter.frequency.value = 1000;
    filter.Q.value = 5;

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.1);
    osc2.stop(now + 0.1);
};

/**
 * Multiple scissor snips in sequence
 */
export const playScissorSequence = async (count: number = 3): Promise<void> => {
    for (let i = 0; i < count; i++) {
        await playScissorSound();
        await new Promise(resolve => setTimeout(resolve, 180 + Math.random() * 120));
    }
};

/**
 * Flower rustling - soft nature ambience
 */
export const playFlowerRustle = async (): Promise<void> => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') await ctx.resume();

    const now = ctx.currentTime;
    const duration = 1.2;

    // Create filtered noise for rustling
    const noiseBuffer = createNoiseBuffer(duration);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(800, now);
    lowpass.frequency.linearRampToValueAtTime(400, now + duration);

    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 200;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
    gain.gain.setValueAtTime(0.08, now + duration - 0.3);
    gain.gain.linearRampToValueAtTime(0, now + duration);

    noise.connect(lowpass);
    lowpass.connect(highpass);
    highpass.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
};

/**
 * Magical reveal chime - sparkling ethereal sound
 */
export const playRevealChime = async (): Promise<void> => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') await ctx.resume();

    const now = ctx.currentTime;

    // Musical frequencies for magical chord (C major with sparkle)
    const frequencies = [523.25, 659.25, 783.99, 1046.5, 1318.5];

    frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        const delay = i * 0.06;
        const attackTime = 0.02;
        const sustainTime = 0.8 - i * 0.1;

        gain.gain.setValueAtTime(0, now + delay);
        gain.gain.linearRampToValueAtTime(0.08, now + delay + attackTime);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + sustainTime);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + sustainTime + 0.1);
    });

    // Add shimmer/sparkle harmonics
    for (let i = 0; i < 5; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.value = 2000 + Math.random() * 2000;

        const delay = 0.1 + i * 0.12;

        gain.gain.setValueAtTime(0, now + delay);
        gain.gain.linearRampToValueAtTime(0.03, now + delay + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + delay);
        osc.stop(now + delay + 0.25);
    }
};

/**
 * Cloud whoosh - soft air movement sound
 */
export const playCloudWhoosh = async (): Promise<void> => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') await ctx.resume();

    const now = ctx.currentTime;
    const duration = 0.8;

    const noiseBuffer = createNoiseBuffer(duration);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(100, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + duration * 0.3);
    filter.frequency.exponentialRampToValueAtTime(200, now + duration);
    filter.Q.value = 2;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + duration * 0.2);
    gain.gain.linearRampToValueAtTime(0.06, now + duration * 0.5);
    gain.gain.linearRampToValueAtTime(0, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
};
