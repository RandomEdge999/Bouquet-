import React from 'react';
import { motion } from 'framer-motion';

export const ChristmasScene: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {/* Christmas Tree - Bottom Left */}
            <motion.div
                className="absolute bottom-0 left-[-20px] md:bottom-0 md:left-0 w-48 md:w-80 lg:w-96 grayscale-[0.1] contrast-[1.1]"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ mixBlendMode: 'multiply' }}
            >
                <img
                    src="/Bouquet-/assets/christmas/tree.png"
                    alt="Christmas Tree"
                    className="w-full h-auto object-contain drop-shadow-xl"
                />
            </motion.div>

            {/* Presents - Near Tree */}
            <motion.div
                className="absolute bottom-[-10px] left-[100px] md:bottom-4 md:left-[220px] w-32 md:w-56"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                style={{ mixBlendMode: 'multiply' }}
            >
                <img
                    src="/Bouquet-/assets/christmas/presents.png"
                    alt="Presents"
                    className="w-full h-auto object-contain drop-shadow-lg"
                />
            </motion.div>

            {/* Hot Cocoa - Bottom Right */}
            <motion.div
                className="absolute bottom-[-20px] right-[-20px] md:bottom-8 md:right-12 w-36 md:w-56"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                style={{ mixBlendMode: 'multiply' }}
            >
                <img
                    src="/Bouquet-/assets/christmas/cocoa.png"
                    alt="Hot Cocoa"
                    className="w-full h-auto object-contain drop-shadow-lg"
                />
            </motion.div>
        </div>
    );
};
