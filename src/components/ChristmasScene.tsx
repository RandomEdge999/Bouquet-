import React from 'react';
import { motion } from 'framer-motion';

// Use Vite's base URL for asset paths
const BASE_URL = import.meta.env.BASE_URL;

export const ChristmasScene: React.FC = () => {
    return (
        <>
            {/* Christmas Tree - Bottom Left Corner of Screen */}
            <motion.div
                className="fixed bottom-0 left-0 z-5 pointer-events-none"
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            >
                <img
                    src={`${BASE_URL}assets/christmas/tree.png`}
                    alt=""
                    className="w-40 sm:w-52 md:w-72 lg:w-80 h-auto object-contain"
                    style={{
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))',
                        maxHeight: '50vh'
                    }}
                />
            </motion.div>

            {/* Presents - Near Tree, Bottom Left */}
            <motion.div
                className="fixed bottom-4 left-28 sm:left-36 md:left-52 lg:left-60 z-5 pointer-events-none"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            >
                <img
                    src={`${BASE_URL}assets/christmas/presents.png`}
                    alt=""
                    className="w-20 sm:w-28 md:w-40 lg:w-48 h-auto object-contain"
                    style={{
                        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))',
                        maxHeight: '25vh'
                    }}
                />
            </motion.div>

            {/* Hot Cocoa - Bottom Right Corner of Screen */}
            <motion.div
                className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-5 pointer-events-none"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            >
                <img
                    src={`${BASE_URL}assets/christmas/cocoa.png`}
                    alt=""
                    className="w-24 sm:w-32 md:w-44 lg:w-52 h-auto object-contain"
                    style={{
                        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))',
                        maxHeight: '30vh'
                    }}
                />
            </motion.div>
        </>
    );
};
