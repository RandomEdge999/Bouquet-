import React from 'react';
import { motion } from 'framer-motion';
import { Flower2, ZoomIn, ZoomOut } from 'lucide-react';

interface SizeDialProps {
    value: number; // 0.6 to 1.4
    onChange: (value: number) => void;
}

export const SizeDial: React.FC<SizeDialProps> = ({ value, onChange }) => {
    const minVal = 0.6;
    const maxVal = 1.4;
    const range = maxVal - minVal;

    // Calculate rotation (0 to 270 degrees based on value)
    const rotation = ((value - minVal) / range) * 270 - 135;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);

        // Convert angle to value (-135° to 135° maps to minVal to maxVal)
        let degrees = (angle * 180) / Math.PI;
        // Normalize to our range
        let normalizedDegrees = degrees + 135;
        if (normalizedDegrees < 0) normalizedDegrees += 360;
        if (normalizedDegrees > 270) normalizedDegrees = normalizedDegrees > 315 ? 0 : 270;

        const newValue = minVal + (normalizedDegrees / 270) * range;
        onChange(Math.max(minVal, Math.min(maxVal, newValue)));
    };

    const increment = () => {
        onChange(Math.min(maxVal, value + 0.1));
    };

    const decrement = () => {
        onChange(Math.max(minVal, value - 0.1));
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="fixed bottom-20 left-3 sm:bottom-24 sm:left-4 md:bottom-auto md:left-8 lg:left-12 md:top-1/2 md:-translate-y-1/2 z-30 flex flex-col items-center gap-2"
        >
            {/* Label */}
            <span className="text-[8px] sm:text-[9px] md:text-xs font-medium text-stone-400 uppercase tracking-widest">
                Size
            </span>

            {/* The Dial */}
            <div className="relative">
                {/* Outer ring - decorative */}
                <div
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-rose-50 to-stone-100 shadow-lg border border-white/50 cursor-pointer"
                    style={{
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.8), inset 0 -2px 4px rgba(0,0,0,0.05)'
                    }}
                    onClick={handleClick}
                >
                    {/* Track marks */}
                    <div className="absolute inset-1 sm:inset-1.5 md:inset-2 rounded-full">
                        {[0, 45, 90, 135, 180, 225, 270].map((deg) => (
                            <div
                                key={deg}
                                className="absolute w-0.5 h-1 md:h-1.5 bg-stone-300/60 rounded-full"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: `rotate(${deg - 135}deg) translate(-50%, -18px)`,
                                    transformOrigin: 'center center'
                                }}
                            />
                        ))}
                    </div>

                    {/* Inner dial knob */}
                    <motion.div
                        className="absolute inset-1.5 sm:inset-2 md:inset-2.5 rounded-full bg-gradient-to-br from-white to-stone-50 shadow-inner flex items-center justify-center"
                        style={{
                            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08)'
                        }}
                        animate={{ rotate: rotation }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        {/* Indicator line */}
                        <div
                            className="absolute w-0.5 md:w-1 h-2 md:h-3 bg-gradient-to-b from-rose-400 to-rose-500 rounded-full"
                            style={{ top: '4px' }}
                        />

                        {/* Center flower icon */}
                        <Flower2 size={14} className="text-rose-300 md:hidden" />
                        <Flower2 size={18} className="text-rose-300 hidden md:block" />
                    </motion.div>
                </div>

                {/* Plus/Minus buttons */}
                <button
                    onClick={decrement}
                    className="absolute -left-1 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-rose-50 transition-colors"
                >
                    <ZoomOut size={10} className="text-stone-500 md:hidden" />
                    <ZoomOut size={12} className="text-stone-500 hidden md:block" />
                </button>
                <button
                    onClick={increment}
                    className="absolute -right-1 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-rose-50 transition-colors"
                >
                    <ZoomIn size={10} className="text-stone-500 md:hidden" />
                    <ZoomIn size={12} className="text-stone-500 hidden md:block" />
                </button>
            </div>

            {/* Value display */}
            <span className="text-[9px] md:text-xs font-mono text-stone-400">
                {Math.round(value * 100)}%
            </span>
        </motion.div>
    );
};
