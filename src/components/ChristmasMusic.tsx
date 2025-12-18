import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export const ChristmasMusic: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio element with jingle bells sound
        // Using a free royalty-free jingle bells loop URL
        const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
        audio.loop = true;
        audio.volume = 0.3;
        audio.preload = 'auto';

        audio.addEventListener('canplaythrough', () => {
            // Audio loaded and ready
        });

        audio.addEventListener('error', () => {
            // Fallback: try alternate source
            audio.src = 'https://freesound.org/data/previews/131/131661_2398403-lq.mp3';
        });

        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = '';
        };
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => {
                // Autoplay blocked - user needs to interact first
                console.log('Audio playback requires user interaction');
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={toggleMusic}
            className="fixed bottom-20 left-3 sm:bottom-24 sm:left-4 md:left-8 z-30 
                       p-2.5 sm:p-3 rounded-full 
                       bg-gradient-to-br from-red-500 to-green-600
                       shadow-lg hover:shadow-xl transition-all
                       hover:scale-110 active:scale-95
                       border-2 border-white/30"
            style={{
                boxShadow: '0 4px 20px rgba(220, 38, 38, 0.3)'
            }}
            title={isPlaying ? 'Pause Christmas Music' : 'Play Christmas Music'}
        >
            {isPlaying ? (
                <Volume2 size={18} className="text-white sm:w-5 sm:h-5" />
            ) : (
                <VolumeX size={18} className="text-white/80 sm:w-5 sm:h-5" />
            )}

            {/* Musical notes animation when playing */}
            {isPlaying && (
                <>
                    <motion.span
                        className="absolute -top-1 -right-1 text-xs"
                        animate={{ y: [-5, -15], opacity: [1, 0], x: [0, 5] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                    >
                        🎵
                    </motion.span>
                    <motion.span
                        className="absolute -top-2 left-0 text-xs"
                        animate={{ y: [-5, -20], opacity: [1, 0], x: [0, -3] }}
                        transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.3, delay: 0.4 }}
                    >
                        🎶
                    </motion.span>
                </>
            )}

            {/* Santa hat decoration */}
            <span className="absolute -top-3 -right-1 text-sm transform rotate-12">🎅</span>
        </motion.button>
    );
};
