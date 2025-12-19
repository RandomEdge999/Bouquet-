import React, { type ReactNode } from 'react';
import { PicnicScene } from './PicnicScene';
import { AmbientEffects } from './AmbientEffects';

// Premium Layout Wrapper
export const Layout: React.FC<{ children: ReactNode; showClouds?: boolean }> = ({ children, showClouds = false }) => {
    return (
        <div className="relative w-full min-h-screen min-h-[100dvh] overflow-visible text-stone-800 font-sans selection:bg-rose-100">
            {/* 1. Picnic Scene Layer (Sky, Garden, Table) */}
            <PicnicScene />

            {/* 2. Ambient Atmosphere (Clouds - Conditional Transition) */}
            <AmbientEffects isActive={showClouds} />

            {/* 3. Interactive Sparkle Trail - Removed per cleanup */}

            {/* Grain Overlay for premium texture */}
            <div
                className="pointer-events-none fixed inset-0 z-[60] opacity-[0.02] mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 w-full min-h-screen min-h-[100dvh]">
                {children}
            </div>

            {/* Credits Footer - Minimal */}
            <div className="fixed bottom-1.5 left-1/2 -translate-x-1/2 z-[55] pointer-events-none">
                <p className="text-[10px] text-stone-600/60 font-sans tracking-widest whitespace-nowrap opacity-80 mix-blend-multiply">
                    Made by Aleem
                </p>
            </div>
        </div>
    );
};
