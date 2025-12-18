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
                className="pointer-events-auto"
            >
                <Link to="/" className="group">
                    {/* Main Logo */}
                    <h1 className="font-serif text-xl sm:text-2xl md:text-3xl tracking-tight font-bold flex items-center gap-1.5 md:gap-2">
                        <span className="bg-gradient-to-r from-red-700 via-red-600 to-green-700 bg-clip-text text-transparent">
                            Merry Christmas, Venooo
                        </span>
                    </h1>

                    {/* Subtle decorative line */}
                    <motion.div
                        className="h-0.5 bg-gradient-to-r from-red-400/60 via-green-400/60 to-red-400/60 mt-1 rounded-full ml-0"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    />

                    {/* Subtitle */}
                    <p className="text-[9px] md:text-xs tracking-widest uppercase text-stone-500 mt-1 font-medium">
                        A Special Winter Bouquet
                    </p>
                </Link>
            </motion.div>

            {/* Right: Favorites */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-end gap-2"
            >
                {/* Favorites Button */}
                <Link
                    to="/favorites"
                    className="p-2 rounded-full bg-white/80 backdrop-blur pointer-events-auto hover:bg-red-50 hover:scale-110 transition-all shadow-sm group"
                >
                    <Heart size={18} className="text-red-600 group-hover:text-red-700 transition-colors" />
                </Link>
            </motion.div>
        </header>
    );
};
