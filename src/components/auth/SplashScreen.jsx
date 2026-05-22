import { useRef, useEffect } from 'react';

const SplashScreen = ({ isDark, exiting, onTrigger }) => {
    const touchStartY = useRef(null);

    const handleWheel = (e) => {
        if (e.deltaY > 0) onTrigger();
    };

    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
        if (touchStartY.current === null) return;
        const dy = touchStartY.current - e.changedTouches[0].clientY;
        if (dy > 20) onTrigger();
        touchStartY.current = null;
    };

    useEffect(() => {
        const handler = (e) => {
            if (['ArrowDown', 'Enter', ' '].includes(e.key)) onTrigger();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    return (
        <div
            className={`splash-root fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer select-none${exiting ? ' splash-exiting' : ''}`}
            style={{
                background: isDark
                    ? 'rgba(3, 3, 13, 0.97)'
                    : 'rgba(244, 240, 255, 0.97)',
            }}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={onTrigger}
        >
            {/* Ambient glow behind text */}
            <div
                className="absolute pointer-events-none"
                style={{
                    width: '70vw',
                    height: '70vw',
                    maxWidth: 700,
                    maxHeight: 700,
                    borderRadius: '50%',
                    background: isDark
                        ? 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.08) 40%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)',
                    filter: 'blur(60px)',
                    animation: 'splashOrb 6s ease-in-out infinite',
                }}
            />

            {/* Main content — this block zooms on exit */}
            <div className="splash-content relative z-10 flex flex-col items-center gap-4 sm:gap-5 px-6 text-center">

                {/* RP badge */}
                <div className={`
                    w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center
                    text-white font-black text-lg sm:text-xl shadow-2xl
                    ${isDark ? 'bg-indigo-600 shadow-indigo-900/70' : 'bg-indigo-600 shadow-indigo-300/60'}
                `}>
                    RP
                </div>

                {/* Big wordmark */}
                <div
                    className={`font-black leading-[0.92] tracking-tight ${isDark ? 'text-white' : 'text-indigo-950'}`}
                    style={{ fontSize: 'clamp(3.4rem, 18vw, 11rem)' }}
                >
                    <span className="block">Review</span>
                    <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                        Pilot
                    </span>
                </div>

                {/* Tagline */}
                <p className={`splash-tagline text-[11px] sm:text-xs tracking-[0.22em] uppercase font-medium ${isDark ? 'text-indigo-300/45' : 'text-indigo-700/45'}`}>
                    AI‑powered review management
                </p>
            </div>

            {/* Scroll hint */}
            <div className={`splash-hint absolute bottom-7 sm:bottom-9 flex flex-col items-center gap-2 ${isDark ? 'text-white/25' : 'text-indigo-700/30'}`}>
                <span className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase">scroll to enter</span>
                <svg
                    className="splash-chevron"
                    width="14" height="9" viewBox="0 0 14 9" fill="none"
                >
                    <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <style>{`
                /* Zoom + fade on exit */
                .splash-content {
                    transition:
                        transform 0.78s cubic-bezier(0.5, 0, 1, 1),
                        opacity   0.32s ease-in 0.28s;
                    transform-origin: center center;
                    will-change: transform, opacity;
                }
                .splash-tagline, .splash-hint {
                    transition: opacity 0.22s ease-in;
                }
                .splash-exiting .splash-content {
                    transform: scale(38);
                    opacity: 0;
                }
                .splash-exiting .splash-tagline,
                .splash-exiting .splash-hint {
                    opacity: 0;
                }
                /* Entire overlay fades out */
                .splash-exiting {
                    animation: splashOverlayFade 0.85s ease-in forwards;
                }
                @keyframes splashOverlayFade {
                    0%,  40% { opacity: 1; }
                    100%     { opacity: 0; }
                }

                /* Ambient glow pulse */
                @keyframes splashOrb {
                    0%, 100% { transform: scale(1);    opacity: 0.7; }
                    50%      { transform: scale(1.15); opacity: 1;   }
                }

                /* Chevron bounce */
                .splash-chevron {
                    animation: chevronBounce 1.5s ease-in-out infinite;
                }
                @keyframes chevronBounce {
                    0%, 100% { transform: translateY(0);   }
                    50%      { transform: translateY(5px); }
                }
            `}</style>
        </div>
    );
};

export default SplashScreen;
