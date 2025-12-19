import React, { useEffect, useState, useRef, useCallback } from 'react';
// LoveParticles import removed
// AmbientEffects moved to Layout
import { SnowEffect } from '../components/SnowEffect';
import { MusicPlayer } from '../components/MusicPlayer';
import { useSearchParams } from 'react-router-dom';
import { BouquetCanvas } from '../components/BouquetCanvas';
import { BouquetReveal } from '../components/BouquetReveal';
import { Controls } from '../components/Controls';
import { Header } from '../components/Header';
import { Layout } from '../components/Layout';
import { NoteCard } from '../components/NoteCard';
import { generateBouquet, type BouquetData } from '../lib/bouquet';
import { generateMessage } from '../lib/message';
import { motion, AnimatePresence } from 'framer-motion';

import { Mail } from 'lucide-react'; // Add Mail icon

export const Home: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState<BouquetData | null>(null);
    const [message, setMessage] = useState<{ text: string, signature: string, subject: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [isRevealing, setIsRevealing] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isNoteOpen, setIsNoteOpen] = useState(false); // New State
    const bouquetRef = useRef<HTMLDivElement>(null);

    // Initial load
    useEffect(() => {
        const s = searchParams.get('seed') || Math.random().toString(36).substring(7);
        generate(s, true);
    }, []);

    // Handle seed changes from URL
    useEffect(() => {
        const currentSeed = searchParams.get('seed');
        if (currentSeed && data && currentSeed !== data.seed) {
            generate(currentSeed, false);
        }
    }, [searchParams]);

    const generate = (seed: string, skipReveal: boolean = false) => {
        setLoading(true);

        // Generate the bouquet data
        const bouquet = generateBouquet(seed);
        const msg = generateMessage(seed);

        setData(bouquet);
        setMessage(msg);
        setSearchParams({ seed });
        setLoading(false);

        // Trigger reveal animation for manual generates
        if (!skipReveal) {
            setIsRevealing(true);
        }

        if (isFirstLoad) {
            setIsFirstLoad(false);
        }
    };

    const handleGenerate = useCallback(() => {
        const newSeed = Math.random().toString(36).substring(7);
        generate(newSeed, false);
    }, []);

    const handleRevealComplete = useCallback(() => {
        setIsRevealing(false);
    }, []);

    if (!data || !message) return null;

    return (
        <Layout showClouds={loading || isRevealing}>
            <Header />
            {/* AmbientEffects handled in Layout */}
            <SnowEffect />
            {/* LoveParticles removed per user request */}

            {/* Main Content Container - Bouquet anchored to bottom */}
            <div className="fixed inset-0 w-full h-screen h-[100dvh] overflow-visible flex flex-col">

                {/* Spacer to push bouquet down */}
                <div className="flex-1" />

                {/* Bouquet Display Area - Always anchored to bottom */}
                <div className="relative flex items-end justify-center">
                    <BouquetReveal
                        isRevealing={isRevealing}
                        onRevealComplete={handleRevealComplete}
                    >
                        <AnimatePresence mode='wait'>
                            {!loading && (
                                <motion.div
                                    key={data.seed}
                                    initial={isFirstLoad ? { opacity: 0, scale: 0.9, y: 30 } : false}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    className="relative flex flex-col items-center"
                                    style={{
                                        // Anchor vase to bottom
                                        marginBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.5rem)',
                                        transformOrigin: 'bottom center',
                                        willChange: 'transform, opacity'
                                    }}
                                >
                                    {/* Contact Shadow - Grounding the vase */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 0.25, scale: 1 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                        className="absolute -bottom-1 w-20 sm:w-28 md:w-48 lg:w-56 h-2 sm:h-2 md:h-5 lg:h-6 rounded-[100%]"
                                        style={{
                                            background: 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)'
                                        }}
                                    />

                                    {/* The Bouquet Container - BIGGER, with overflow visible to prevent clipping */}
                                    <div
                                        ref={bouquetRef}
                                        className="relative z-10 overflow-visible"
                                        style={{
                                            // Increased size for mobile, and MUCH larger max-width for desktop
                                            width: 'min(62vh, 85vw, 650px)',
                                            height: 'min(82vh, 115vw, 850px)',
                                        }}
                                    >
                                        <BouquetCanvas svgContent={data.svg} seed={data.seed} />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </BouquetReveal>

                    {/* Loading State */}
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center pb-32"
                            style={{ height: 'min(63vh, 560px)' }}
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
                            <p className="mt-4 text-stone-400 text-sm font-serif italic">Arranging flowers for Venooo...</p>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* UNIFIED RIGHT CONTROL STACK (Vertical) - Top Right */}
            {/* Using padding-top to clear the header area on mobile if needed, or just top-4 */}
            <div className="fixed top-28 right-4 sm:top-20 sm:right-6 lg:top-24 lg:right-10 z-50 flex flex-col items-end gap-3">

                {/* 1. Read Note Button */}
                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 }}
                    onClick={() => setIsNoteOpen(!isNoteOpen)}
                    className="
                        glass-ios
                        flex items-center gap-2
                        pl-3 pr-4 py-2 rounded-full
                        transition-all
                        hover:scale-[1.02] active:scale-[0.98]
                        group
                        text-stone-700
                    "
                >
                    <Mail size={16} className="text-stone-600 group-hover:text-rose-600 transition-colors" />
                    <span className="text-xs font-medium text-stone-600 uppercase tracking-widest group-hover:text-rose-700 transition-colors">
                        {isNoteOpen ? 'Close' : 'Note'}
                    </span>
                </motion.button>

                {/* 2. Music Player */}
                <MusicPlayer />

                {/* 3. New Bouquet (Main CTA) */}
                <Controls onGenerate={handleGenerate} />
            </div>

            {/* Note Card Modal/Overlay */}
            {message && !loading && !isRevealing && (
                <NoteCard
                    subject={message.subject}
                    message={message.text}
                    signature={message.signature}
                    isOpen={isNoteOpen}
                    onClose={() => setIsNoteOpen(false)}
                />
            )}
        </Layout>
    );
};
