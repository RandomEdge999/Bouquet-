import React from 'react';
import { motion } from 'framer-motion';

interface BouquetCanvasProps {
    svgContent: string;
    seed: string;
}

export const BouquetCanvas: React.FC<BouquetCanvasProps> = ({ svgContent, seed }) => {
    return (
        <motion.div
            className="w-full h-full relative"
            initial={{ filter: 'blur(0px)' }}
            animate={{ filter: 'blur(0px)' }}
        >
            {/* SVG Container - NO background, just the bouquet with shadow */}
            <motion.div
                key={seed}
                className="w-full h-full"
                style={{
                    filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.2))'
                }}
                dangerouslySetInnerHTML={{ __html: svgContent }}
            />
        </motion.div>
    );
};
