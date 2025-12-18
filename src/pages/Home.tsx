import React, { useEffect, useState, useCallback } from 'react';
import { LoveParticles } from '../components/LoveParticles';
import { AmbientEffects } from '../components/AmbientEffects';
import { useSearchParams } from 'react-router-dom';
import { BouquetCanvas } from '../components/BouquetCanvas';
import { Controls } from '../components/Controls';
import { Header } from '../components/Header';
import { Layout } from '../components/Layout';
import { NoteCard } from '../components/NoteCard';
import { generateBouquet, type BouquetData } from '../lib/bouquet';
import { generateMessage } from '../lib/message';
import { motion, AnimatePresence } from 'framer-motion';

export const Home: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [data, setData] = useState<BouquetData | null>(null);
    const [message, setMessage] = useState<{ text: string, signature: string, subject: string } | null>(null);
    const [loading, setLoading] = useState(true);

    // Initial load
    useEffect(() => {
        const s = searchParams.get('seed') || Math.random().toString(36).substring(7);
        generate(s);
    }, [searchParams]);

    const generate = (seed: string) => {
        setLoading(true);
        setTimeout(() => {
            const bouquet = generateBouquet(seed);
            const msg = generateMessage(seed);

            setData(bouquet);
            setMessage(msg);
            setSearchParams({ seed });
            setLoading(false);
        }, 500);
    };

    const handleGenerate = useCallback(() => {
        const newSeed = Math.random().toString(36).substring(7);
        setSearchParams({ seed: newSeed });
    }, [setSearchParams]);

    if (!data || !message) return null;

    return (
        <Layout>
            <Header />
            <AmbientEffects />
            <LoveParticles />

            {/* Main Content Container - Bouquet anchored to bottom */}
            <div className="fixed inset-0 w-full h-screen h-[100dvh] overflow-hidden flex flex-col">

                {/* Spacer to push bouquet down */}
                <div className="flex-1" />

                {/* Bouquet Display Area - Always anchored to bottom */}
                <div className="relative flex items-end justify-center">
                    <AnimatePresence mode='wait'>
                        {!loading && (
                            <motion.div
                                key={data.seed}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="relative flex flex-col items-center"
                                style={{
                                    // Anchor vase to bottom
                                    marginBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.5rem)',
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

                                {/* The Bouquet Container */}
                                <div
                                    className="relative z-10"
                                    style={{
                                        // Use viewport height for consistent sizing across devices
                                        width: 'min(45vh, 70vw, 400px)',
                                        height: 'min(63vh, 98vw, 560px)',
                                    }}
                                >
                                    <BouquetCanvas svgContent={data.svg} seed={data.seed} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

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

            {/* Note Card - Always visible, positioned appropriately */}
            {message && !loading && (
                <NoteCard
                    message={message.text}
                    signature={message.signature}
                />
            )}

            {/* Controls - Fixed at bottom center */}
            <Controls onGenerate={handleGenerate} />
        </Layout>
    );
};
