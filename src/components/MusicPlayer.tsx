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
            {/* Minimalist Control Button - TOP LEFT on mobile, near header */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                onClick={toggleMusic}
                className="
                    fixed z-30 
                    
                    /* Mobile - top area, right side near favorites */
                    top-4 right-12
                    
                    /* Tablet */
                    sm:top-5 sm:right-14
                    
                    /* Desktop - left side, vertically centered */
                    md:top-auto md:right-auto
                    md:bottom-1/2 md:left-8 md:translate-y-1/2
                    
                    group flex items-center gap-1.5 md:gap-2
                    px-2 py-1.5 md:px-3 md:py-2 rounded-full 
                    bg-white/20 backdrop-blur-md
                    hover:bg-white/30 transition-all
                    border border-white/30 hover:border-white/40
                "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Icon */}
                <div className="relative w-3.5 h-3.5 md:w-4 md:h-4 text-stone-600 group-hover:text-rose-600 transition-colors">
                    {isPlaying ? (
                        <Pause size={14} fill="currentColor" className="opacity-80 md:w-4 md:h-4" />
                    ) : (
                        <Play size={14} fill="currentColor" className="opacity-80 ml-0.5 md:w-4 md:h-4" />
                    )}
                </div>

                {/* Text Label - hidden on mobile, visible on desktop */}
                <span className="hidden md:inline text-xs font-medium text-stone-500 uppercase tracking-widest">
                    {isPlaying ? 'Playing' : 'Music'}
                </span>
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
