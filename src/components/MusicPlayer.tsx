import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // YouTube Video ID for "Christmas Lofi Mix" (No Copyright)
    const VIDEO_ID = "T4CFbPquehk";

    useEffect(() => {
        // Initialize player state
        // Note: We can't auto-play reliable without user interaction on many browsers
    }, []);

    const toggleMusic = () => {
        if (!iframeRef.current || !iframeRef.current.contentWindow) return;

        const action = isPlaying ? 'pauseVideo' : 'playVideo';
        iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: action, args: [] }),
            '*'
        );
        setIsPlaying(!isPlaying);
    };

    return (
        <>
            {/* Minimalist Control Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                onClick={toggleMusic}
                className="fixed bottom-20 left-3 sm:bottom-24 sm:left-4 md:left-8 z-30 
                           group flex items-center gap-2
                           px-3 py-2 rounded-full 
                           bg-white/10 backdrop-blur-md
                           hover:bg-white/20 transition-all
                           border border-white/20 hover:border-white/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Icon */}
                <div className="relative w-4 h-4 text-stone-600 group-hover:text-rose-600 transition-colors">
                    {isPlaying ? (
                        <Pause size={16} fill="currentColor" className="opacity-80" />
                    ) : (
                        <Play size={16} fill="currentColor" className="opacity-80 ml-0.5" />
                    )}
                </div>

                {/* Text Label - fades in/out based on hover or state */}
                <motion.span
                    className="text-[10px] sm:text-xs font-medium text-stone-500 uppercase tracking-widest"
                    animate={{
                        width: isPlaying || 'hover' ? 'auto' : 0,
                        opacity: isPlaying || 'hover' ? 1 : 0
                    }}
                    style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                >
                    {isPlaying ? 'Playing Lo-Fi' : 'Play Music'}
                </motion.span>
            </motion.button>

            {/* Hidden YouTube Iframe */}
            <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
                <iframe
                    ref={iframeRef}
                    id="youtube-player"
                    width="200"
                    height="200"
                    src={`https://www.youtube.com/embed/${VIDEO_ID}?enablejsapi=1&controls=0&loop=1&playlist=${VIDEO_ID}`}
                    title="Christmas Lo-Fi Player"
                    allow="autoplay; encrypted-media"
                />
            </div>
        </>
    );
};
