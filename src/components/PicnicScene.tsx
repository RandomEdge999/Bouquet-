import React from 'react';

export const PicnicScene: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-sky-100">
            {/* Desktop Background */}
            <div
                className="hidden md:block absolute inset-0 bg-cover bg-bottom bg-no-repeat transition-all duration-700 ease-in-out"
                style={{
                    backgroundImage: "url('/Bouquet-/picnic-desktop.png')",
                    // Ensure table is always at bottom
                    backgroundPosition: 'center bottom',
                    willChange: 'opacity' // GPU Hint for smooth transitions
                }}
            />

            {/* Mobile Background */}
            <div
                className="md:hidden absolute inset-0 bg-cover bg-bottom bg-no-repeat transition-all duration-700 ease-in-out"
                style={{
                    backgroundImage: "url('/Bouquet-/picnic-mobile.png')",
                    // Ensure table is always at bottom
                    backgroundPosition: 'center bottom'
                }}
            />

            {/* Overlay Removed for cleaner look */}
        </div>
    );
};
