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
                    {/* Main Logo - Christmas Edition */}
                    <h1 className="font-serif text-xl sm:text-2xl md:text-3xl tracking-tight font-bold flex items-center gap-1 md:gap-2">
                        <motion.span
                            className="text-lg md:text-2xl"
                            animate={{ rotate: [-5, 5, -5] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                            🎄
                        </motion.span>
                        <span className="bg-gradient-to-r from-red-600 via-green-600 to-red-500 bg-clip-text text-transparent">
                            Merry Christmas
                        </span>
                        <motion.span
                            className="text-rose-500 text-lg md:text-2xl"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                            ♥
                        </motion.span>
                    </h1>

                    {/* Subtitle - For Venooo */}
                    <p className="text-[9px] md:text-xs tracking-widest uppercase text-stone-500 ml-5 md:ml-7 mt-0.5 font-medium flex items-center gap-1">
                        <span className="text-rose-500">♥</span>
                        For My Dearest Venooo
                        <span className="text-rose-500">♥</span>
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
                {/* Christmas Badge */}
                <motion.div
                    className="hidden md:flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-green-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                    <span className="text-xs">🎅</span>
                    <span className="text-xs text-stone-600 font-medium">Christmas 2024</span>
                    <span className="text-xs">❄️</span>
                </motion.div>

                {/* Favorites Button */}
                <Link
                    to="/favorites"
                    className="p-2 rounded-full bg-white/80 backdrop-blur pointer-events-auto hover:bg-red-50 hover:scale-110 transition-all shadow-sm group"
                >
                    <Heart size={18} className="text-red-500 group-hover:text-red-600 transition-colors" />
                </Link>
            </motion.div>
        </header>
    );
};
