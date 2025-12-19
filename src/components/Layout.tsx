import React, { type ReactNode } from 'react';

// Premium Layout Wrapper with Table Surface
export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="relative w-full min-h-screen min-h-[100dvh] overflow-visible text-stone-800 font-sans selection:bg-rose-100">
            {/* 
                Background is set via CSS on body - we don't add any solid backgrounds here
                that would cover it up. All overlays must be transparent/gradients only.
            */}

            {/* Subtle romantic gradient overlay - TRANSPARENT, doesn't block background */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    background: `
                        radial-gradient(ellipse at 30% 20%, rgba(253, 242, 248, 0.3) 0%, transparent 50%),
                        radial-gradient(ellipse at 70% 80%, rgba(255, 241, 242, 0.2) 0%, transparent 50%)
                    `
                }}
            />

            {/* Subtle vignette effect - VERY subtle, doesn't block background */}
            <div
                className="fixed inset-0 pointer-events-none z-0"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.05) 100%)'
                }}
            />

            {/* Grain Overlay for premium texture - Very subtle */}
            <div
                className="pointer-events-none fixed inset-0 z-[60] opacity-[0.015] mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Elegant Table/Surface at Bottom - Semi-transparent */}
            <div className="fixed bottom-0 left-0 right-0 h-20 md:h-28 z-[5] pointer-events-none">
                {/* Table top surface - gradient that blends with background */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(139, 115, 85, 0.08) 40%, rgba(100, 80, 60, 0.15) 100%)',
                    }}
                />
                {/* Subtle top edge highlight */}
                <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                        background: 'linear-gradient(90deg, transparent 15%, rgba(139, 115, 85, 0.2) 50%, transparent 85%)'
                    }}
                />
            </div>

            {/* Content Container - NO background color */}
            <div className="relative z-10 w-full min-h-screen min-h-[100dvh]">
                {children}
            </div>

            {/* Credits Footer - Always visible */}
            <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[55] pointer-events-none">
                <p className="text-[10px] md:text-xs text-stone-500/80 font-sans tracking-wide whitespace-nowrap drop-shadow-sm">
                    Made with <span className="text-rose-500 inline-block">♥</span> by <span className="font-medium text-stone-600">Aleem</span>
                </p>
            </div>
        </div>
    );
};
