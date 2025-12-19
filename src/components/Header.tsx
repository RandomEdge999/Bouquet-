import { Link } from 'react-router-dom';
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 p-4 pointer-events-none">
            {/* Centered Logo with Liquid Glass Design */}
            <motion.div
                initial={{ opacity: 0, y: -20, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                className="absolute left-1/2 top-4 md:top-6 pointer-events-auto z-50"
            >
                <Link to="/" className="group block">
                    <div className="
                        glass-ios
                        px-6 py-3 rounded-full
                        flex flex-col items-center
                        transition-all duration-300
                        hover:scale-[1.02] active:scale-[0.98]
                    ">
                        {/* Main Logo Text */}
                        <div className="flex items-center gap-2">
                            {/* Sparkle Left */}
                            <motion.div
                                animate={{ rotate: [0, 180, 360] }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="hidden sm:block"
                            >
                                <Sparkles size={14} className="text-red-500/70" />
                            </motion.div>

                            <h1 className="font-serif text-lg md:text-xl tracking-tight font-bold text-center whitespace-nowrap">
                                <span className="bg-gradient-to-r from-red-700 via-red-500 to-green-700 bg-clip-text text-transparent drop-shadow-sm">
                                    Merry Christmas
                                </span>
                                <span className="text-red-600 mx-1">,</span>
                                <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent italic">
                                    Venooo
                                </span>
                            </h1>

                            {/* Heart Right */}
                            <motion.div
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="hidden sm:block"
                            >
                                <Heart size={12} className="text-rose-500 fill-rose-500/50" />
                            </motion.div>
                        </div>

                        {/* Subtitle */}
                        <div className="flex items-center gap-1.5 mt-0.5 opacity-60">
                            <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="text-blue-400 text-[10px]">❄</motion.span>
                            <p className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-stone-600 font-medium">
                                A Winter Bouquet
                            </p>
                            <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="text-blue-400 text-[10px]">❄</motion.span>
                        </div>
                    </div>
                </Link>
            </motion.div>


        </header>
    );
};
