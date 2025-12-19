import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playScissorSequence, playFlowerRustle, playRevealChime, playCloudWhoosh } from '../lib/sounds';

interface BouquetRevealProps {
    isRevealing: boolean;
    onRevealComplete: () => void;
    children: React.ReactNode;
}

// Animation phases
type RevealPhase = 'idle' | 'covering' | 'preparing' | 'reveal' | 'complete';

// Enhanced Cloud/Mist element component with floating animation
const CloudElement: React.FC<{
    delay: number;
    side: 'left' | 'right' | 'center';
    size: 'sm' | 'md' | 'lg' | 'xl';
    verticalPos?: 'top' | 'middle' | 'bottom';
}> = ({ delay, side, size, verticalPos = 'middle' }) => {
    const sizeClasses = {
        sm: 'w-64 h-48',
        md: 'w-80 h-64',
        lg: 'w-[30rem] h-80',
        xl: 'w-[40rem] h-[24rem]'
    };

    const horizontalPositions = {
        left: 'left-0',
        right: 'right-0',
        center: 'left-1/2'
    };

    const verticalPositions = {
        top: 'top-0',
        middle: 'top-1/2',
        bottom: 'bottom-0'
    };

    // Unique ID for each cloud element
    const cloudId = useRef(`cloud-${side}-${size}-${verticalPos}-${Math.random().toString(36).substr(2, 9)}`);

    const getInitialX = () => {
        if (side === 'left') return '-100%';
        if (side === 'right') return '100%';
        return '-50%';
    };

    const getAnimateX = () => {
        if (side === 'left') return '0%';
        if (side === 'right') return '0%';
        return '-50%';
    };

    const getExitX = () => {
        if (side === 'left') return '-150%';
        if (side === 'right') return '150%';
        return '-50%';
    };

    const getTransformY = () => {
        if (verticalPos === 'middle') return '-50%';
        return '0%';
    };

    return (
        <motion.div
            className={`absolute ${horizontalPositions[side]} ${verticalPositions[verticalPos]} ${sizeClasses[size]} pointer-events-none`}
            style={{
                translateY: getTransformY(),
            }}
            initial={{
                opacity: 0,
                x: getInitialX(),
                scale: 0.8
            }}
            animate={{
                opacity: 1,
                x: getAnimateX(),
                scale: 1
            }}
            exit={{
                opacity: 0,
                x: getExitX(),
                y: verticalPos === 'top' ? '-100%' : verticalPos === 'bottom' ? '100%' : '-80%',
                scale: 1.2,
                transition: {
                    duration: 1.5,
                    ease: [0.4, 0, 0.2, 1]
                }
            }}
            transition={{
                delay,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            <motion.div
                className="w-full h-full"
                animate={{
                    y: [0, -15, 0, 15, 0]
                }}
                transition={{
                    delay: delay + 0.5,
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            >
                <svg viewBox="0 0 200 120" className="w-full h-full">
                    <defs>
                        <filter id={`cloud-blur-${cloudId.current}`}>
                            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
                        </filter>
                        <radialGradient id={`cloud-grad-${cloudId.current}`} cx="50%" cy="50%" r="60%">
                            <stop offset="0%" stopColor="white" stopOpacity="1" />
                            <stop offset="40%" stopColor="white" stopOpacity="0.98" />
                            <stop offset="70%" stopColor="white" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <ellipse cx="100" cy="60" rx="95" ry="55" fill={`url(#cloud-grad-${cloudId.current})`} filter={`url(#cloud-blur-${cloudId.current})`} />
                    <ellipse cx="50" cy="70" rx="55" ry="40" fill={`url(#cloud-grad-${cloudId.current})`} filter={`url(#cloud-blur-${cloudId.current})`} />
                    <ellipse cx="150" cy="65" rx="60" ry="45" fill={`url(#cloud-grad-${cloudId.current})`} filter={`url(#cloud-blur-${cloudId.current})`} />
                    <ellipse cx="100" cy="45" rx="70" ry="48" fill={`url(#cloud-grad-${cloudId.current})`} filter={`url(#cloud-blur-${cloudId.current})`} />
                </svg>
            </motion.div>
        </motion.div>
    );
};

// Full screen cloud cover for seamless transition - FIXED z-index
const CloudCover: React.FC<{ phase: RevealPhase }> = ({ phase }) => {
    const showClouds = phase === 'covering' || phase === 'preparing';

    return (
        <AnimatePresence>
            {showClouds && (
                <motion.div
                    className="fixed inset-0 overflow-hidden pointer-events-none"
                    style={{ zIndex: 100 }} // High z-index to be on top of everything
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Soft white backdrop for better cloud visibility */}
                    <motion.div
                        className="absolute inset-0 bg-white/70"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Dense cloud layers */}
                    <CloudElement delay={0} side="left" size="xl" verticalPos="middle" />
                    <CloudElement delay={0.02} side="right" size="xl" verticalPos="middle" />

                    <CloudElement delay={0.04} side="left" size="lg" verticalPos="top" />
                    <CloudElement delay={0.06} side="left" size="lg" verticalPos="bottom" />

                    <CloudElement delay={0.03} side="right" size="lg" verticalPos="top" />
                    <CloudElement delay={0.07} side="right" size="lg" verticalPos="bottom" />

                    <CloudElement delay={0.1} side="center" size="xl" verticalPos="middle" />
                    <CloudElement delay={0.12} side="center" size="lg" verticalPos="top" />
                    <CloudElement delay={0.14} side="center" size="lg" verticalPos="bottom" />

                    {/* Extra layers */}
                    <CloudElement delay={0.08} side="left" size="md" verticalPos="middle" />
                    <CloudElement delay={0.09} side="right" size="md" verticalPos="middle" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Floating flower petals during preparation
const FloatingPetals: React.FC = () => {
    const petals = Array.from({ length: 16 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2 + Math.random() * 1.5,
        color: ['#f9a8d4', '#fda4af', '#fecdd3', '#f0abfc', '#c4b5fd', '#fbbf24'][Math.floor(Math.random() * 6)]
    }));

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 101 }}>
            {petals.map(petal => (
                <motion.div
                    key={petal.id}
                    className="absolute"
                    style={{ left: `${petal.x}%`, top: '70%' }}
                    initial={{ opacity: 0, y: 80, rotate: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        y: [80, -30, -120, -180],
                        rotate: [0, 180, 360, 540],
                        scale: [0, 1.2, 1, 0.6],
                        x: [0, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 180]
                    }}
                    transition={{
                        delay: petal.delay,
                        duration: petal.duration,
                        ease: 'easeOut'
                    }}
                >
                    <svg width="24" height="28" viewBox="0 0 20 24">
                        <path
                            d="M 10 0 Q 0 8 5 18 Q 10 24 15 18 Q 20 8 10 0"
                            fill={petal.color}
                            opacity="0.85"
                        />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
};

// Sparkle burst on reveal - Enhanced
const SparklesBurst: React.FC = () => {
    const sparkles = Array.from({ length: 32 }, (_, i) => ({
        id: i,
        angle: (i / 32) * Math.PI * 2,
        distance: 120 + Math.random() * 180,
        delay: Math.random() * 0.5,
        size: 6 + Math.random() * 12
    }));

    return (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 102 }}>
            {sparkles.map(sparkle => (
                <motion.div
                    key={sparkle.id}
                    className="absolute"
                    initial={{
                        opacity: 0,
                        x: 0,
                        y: 0,
                        scale: 0
                    }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        x: Math.cos(sparkle.angle) * sparkle.distance,
                        y: Math.sin(sparkle.angle) * sparkle.distance,
                        scale: [0, 1.8, 1.4, 0]
                    }}
                    transition={{
                        delay: sparkle.delay,
                        duration: 1.4,
                        ease: 'easeOut'
                    }}
                >
                    <svg width={sparkle.size * 2} height={sparkle.size * 2} viewBox="0 0 20 20">
                        <path
                            d="M 10 0 L 12 8 L 20 10 L 12 12 L 10 20 L 8 12 L 0 10 L 8 8 Z"
                            fill="#ffd700"
                            filter="drop-shadow(0 0 8px rgba(255, 215, 0, 0.95))"
                        />
                    </svg>
                </motion.div>
            ))}
        </div>
    );
};

// Golden ring burst on reveal
const GoldenRing: React.FC = () => {
    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 103 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
        >
            <motion.div
                className="rounded-full border-4 border-yellow-300"
                initial={{ width: 0, height: 0 }}
                animate={{ width: 500, height: 500 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    boxShadow: '0 0 60px rgba(255, 215, 0, 0.6), inset 0 0 40px rgba(255, 215, 0, 0.3)'
                }}
            />
        </motion.div>
    );
};

export const BouquetReveal: React.FC<BouquetRevealProps> = ({
    isRevealing,
    onRevealComplete,
    children
}) => {
    const [phase, setPhase] = useState<RevealPhase>('idle');
    const [showBouquet, setShowBouquet] = useState(!isRevealing);
    const sequenceRunning = useRef(false);

    const runRevealSequence = useCallback(async () => {
        if (sequenceRunning.current) return;
        sequenceRunning.current = true;

        console.log('🌸 Starting reveal sequence - Phase: covering');

        // Phase 1: Clouds INSTANTLY cover
        setPhase('covering');
        setShowBouquet(false);
        playCloudWhoosh();

        // Start sounds DURING covering
        setTimeout(() => {
            console.log('🎵 Playing scissor sounds');
            playScissorSequence(5);
        }, 200);

        setTimeout(() => {
            console.log('🎵 Playing flower rustle');
            playFlowerRustle();
        }, 800);

        // Wait for clouds to cover
        await new Promise(r => setTimeout(r, 2000));

        // Phase 2: Preparing
        console.log('🌸 Phase: preparing');
        setPhase('preparing');
        await new Promise(r => setTimeout(r, 800));

        // Phase 3: Grand reveal
        console.log('🌸 Phase: reveal');
        setPhase('reveal');
        playRevealChime();

        await new Promise(r => setTimeout(r, 400));
        setShowBouquet(true);

        await new Promise(r => setTimeout(r, 2000));

        // Complete
        console.log('🌸 Phase: complete');
        setPhase('complete');
        sequenceRunning.current = false;
        onRevealComplete();
    }, [onRevealComplete]);

    useEffect(() => {
        if (!isRevealing && phase !== 'idle') {
            setPhase('idle');
            setShowBouquet(true);
            sequenceRunning.current = false;
        }
    }, [isRevealing, phase]);

    useEffect(() => {
        if (isRevealing && phase === 'idle' && !sequenceRunning.current) {
            runRevealSequence();
        }
    }, [isRevealing, phase, runRevealSequence]);

    return (
        <div className="relative w-full h-full">
            {/* Cloud cover - FIXED: now uses fixed positioning and proper z-index */}
            <CloudCover phase={phase} />

            {/* Floating petals during preparation */}
            <AnimatePresence>
                {phase === 'preparing' && <FloatingPetals />}
            </AnimatePresence>

            {/* Golden ring burst on reveal */}
            <AnimatePresence>
                {phase === 'reveal' && <GoldenRing />}
            </AnimatePresence>

            {/* Sparkles on reveal */}
            <AnimatePresence>
                {phase === 'reveal' && <SparklesBurst />}
            </AnimatePresence>

            {/* Bouquet content */}
            <AnimatePresence mode="wait">
                {showBouquet && (
                    <motion.div
                        className="w-full h-full"
                        initial={phase === 'reveal' ? { opacity: 0, scale: 0.8, filter: 'blur(20px)' } : false}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{
                            duration: 1.4,
                            ease: [0.22, 1, 0.36, 1],
                            scale: { duration: 1.6, ease: [0.34, 1.56, 0.64, 1] }
                        }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Magical glow during reveal */}
            <AnimatePresence>
                {phase === 'reveal' && (
                    <motion.div
                        className="fixed inset-0 pointer-events-none"
                        style={{ zIndex: 99 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'radial-gradient(circle at 50% 60%, rgba(255, 215, 0, 0.3) 0%, rgba(255, 182, 193, 0.2) 25%, transparent 55%)'
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
