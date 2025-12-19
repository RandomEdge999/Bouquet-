import { Link } from 'react-router-dom';
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 p-3 md:p-6 flex justify-between items-start pointer-events-none">
            {/* Left: Logo and Dedication */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="pointer-events-auto"
            >
                <Link to="/" className="group block">
                    {/* Logo Container with subtle glow */}
                    <div className="relative">
                        {/* Subtle background glow */}
                        <motion.div
                            className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background: 'radial-gradient(ellipse, rgba(255, 182, 193, 0.2) 0%, transparent 70%)'
                            }}
                        />

                        {/* Main Logo with decorative elements */}
                        <div className="relative flex items-center gap-2">
                            {/* Decorative snowflake/sparkle */}
                            <motion.div
                                animate={{ rotate: [0, 180, 360] }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="hidden sm:block"
                            >
                                <Sparkles size={16} className="text-red-500/70" />
                            </motion.div>

                            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl tracking-tight font-bold">
                                <span className="bg-gradient-to-r from-red-700 via-red-500 to-green-700 bg-clip-text text-transparent drop-shadow-sm">
                                    Merry Christmas
                                </span>
                                <span className="text-red-600">,</span>
                                <span className="ml-1.5 bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent italic">
                                    Venooo
                                </span>
                            </h1>

                            {/* Decorative heart */}
                            <motion.div
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                className="hidden sm:block"
                            >
                                <Heart size={14} className="text-rose-500 fill-rose-500/50" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Animated decorative line */}
                    <motion.div
                        className="h-0.5 mt-1.5 rounded-full overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <motion.div
                            className="h-full w-full bg-gradient-to-r from-red-400 via-pink-400 to-green-400"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            style={{ backgroundSize: '200% 100%' }}
                        />
                    </motion.div>

                    {/* Subtitle with winter theme */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                        <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-blue-400/60 text-xs"
                        >
                            ❄
                        </motion.span>
                        <p className="text-[9px] md:text-xs tracking-widest uppercase text-stone-500 font-medium">
                            A Winter Bouquet Made With Love
                        </p>
                        <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            className="text-blue-400/60 text-xs"
                        >
                            ❄
                        </motion.span>
                    </div>
                </Link>
            </motion.div>

            {/* Right: Favorites with enhanced styling */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-end gap-2"
            >
                {/* Favorites Button - Enhanced */}
                <Link
                    to="/favorites"
                    className="group relative p-2.5 rounded-full bg-white/90 backdrop-blur-md pointer-events-auto hover:bg-rose-50 transition-all shadow-md hover:shadow-lg border border-rose-100/50"
                >
                    {/* Pulse effect on hover */}
                    <motion.div
                        className="absolute inset-0 rounded-full bg-rose-300/30 opacity-0 group-hover:opacity-100"
                        animate={{ scale: [1, 1.4, 1], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                    >
                        <Heart
                            size={18}
                            className="text-rose-500 group-hover:text-rose-600 transition-colors relative z-10"
                            fill="currentColor"
                            fillOpacity={0.2}
                        />
                    </motion.div>
                </Link>
            </motion.div>
        </header>
    );
};
