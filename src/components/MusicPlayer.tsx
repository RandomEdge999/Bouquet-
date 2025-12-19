import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // YouTube Video ID for "Christmas Instrumental" (O Holy Night / Peaceful)
    const VIDEO_ID = "_j37WnwmzSI";

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
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                onClick={toggleMusic}
                className="
                    group flex items-center gap-2
                    pl-3 pr-4 py-2 rounded-full 
                    bg-white/40 backdrop-blur-md
                    hover:bg-white/60 transition-all
                    border border-white/50 hover:border-white/70
                    shadow-sm hover:shadow-md
                "
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

                {/* Text Label */}
                <span className="text-xs font-medium text-stone-600 uppercase tracking-widest group-hover:text-rose-700 transition-colors">
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
