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

// Cloud element with darker/softer aesthetic to avoid "white flash"
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
                willChange: 'transform, opacity'
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
                className="w-full h-full relative"
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
                {/* CSS Based Clouds - Soft grey/white mix, less blinding */}
                <div className="absolute inset-0 bg-stone-100 rounded-[100%] blur-3xl opacity-80" />
                <div className="absolute top-1/4 left-1/4 w-2/3 h-2/3 bg-white/50 rounded-[100%] blur-2xl opacity-60" />
            </motion.div>
        </motion.div>
    );
};

// Full screen cloud cover - Softened
const CloudCover: React.FC<{ phase: RevealPhase }> = ({ phase }) => {
    const showClouds = phase === 'covering' || phase === 'preparing';

    return (
        <AnimatePresence>
            {showClouds && (
                <motion.div
                    className="fixed inset-0 overflow-hidden pointer-events-none"
                    style={{ zIndex: 100 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Darker/Softer backdrop - NO FLASH */}
                    <motion.div
                        className="absolute inset-0 bg-stone-200/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Dense cloud layers - kept but softened in CloudElement */}
                    <CloudElement delay={0} side="left" size="xl" verticalPos="middle" />
                    <CloudElement delay={0.02} side="right" size="xl" verticalPos="middle" />
                    {/* ... other clouds simplified for brevity/performance ... */}
                    <CloudElement delay={0.1} side="center" size="xl" verticalPos="middle" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
// FloatingPetals removed

// Sparkles removed as per request
const SparklesBurst: React.FC = () => null;

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



        // Phase 1: Clouds INSTANTLY cover
        setPhase('covering');
        setShowBouquet(false);
        playCloudWhoosh();

        // Start sounds DURING covering
        setTimeout(() => {

            playScissorSequence(5);
        }, 200);

        setTimeout(() => {

            playFlowerRustle();
        }, 800);

        // Wait for clouds to cover - FAST
        await new Promise(r => setTimeout(r, 1200));

        // Phase 2: Preparing - QUICK PAUSE

        setPhase('preparing');
        await new Promise(r => setTimeout(r, 100));

        // Phase 3: Grand reveal

        setPhase('reveal');
        playRevealChime();

        // NO DELAY - Show immediately
        setShowBouquet(true);

        await new Promise(r => setTimeout(r, 2000));

        // Complete

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

            {/* Floating petals removed per user request (random leaf glitch) */}

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
        </div>
    );
};
