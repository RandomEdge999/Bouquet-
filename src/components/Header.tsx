import { Link } from 'react-router-dom';
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 p-3 md:p-6 flex justify-between items-start pointer-events-none">
            {/* Left: Logo and Dedication */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-stone-900 pointer-events-auto"
            >
                <Link to="/" className="group">
                    {/* Main Logo */}
                    <h1 className="font-serif text-xl sm:text-2xl md:text-3xl tracking-tight font-bold flex items-center gap-1.5 md:gap-2">
                        <span className="text-rose-500 group-hover:scale-110 transition-transform">✿</span>
                        <span className="bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 bg-clip-text text-transparent">
                            For Venooo
                        </span>
                        <motion.span
                            className="text-rose-400 text-lg md:text-2xl"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                            ♥
                        </motion.span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-[9px] md:text-xs tracking-widest uppercase text-stone-500 ml-5 md:ml-6 mt-0.5 font-medium">
                        A Daily Bouquet of Love
                    </p>
                </Link>
            </motion.div>

            {/* Right: Date and Favorites */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-end gap-2"
            >
                {/* Date - Desktop only */}
                <div className="hidden md:block text-right">
                    <p className="text-xs text-stone-400 font-mono">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Favorites Button */}
                <Link
                    to="/favorites"
                    className="p-2 rounded-full bg-white/80 backdrop-blur pointer-events-auto hover:bg-rose-50 hover:scale-110 transition-all shadow-sm group"
                >
                    <Heart size={18} className="text-stone-500 group-hover:text-rose-500 transition-colors" />
                </Link>
            </motion.div>
        </header>
    );
};
