import { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const MotionDiv = motion.div;
const MotionP = motion.p;
const MotionSpan = motion.span;
const MotionSvg = motion.svg;

const brandWords = ['Review', 'Pilot'];
const sparkPositions = [
    { top: '18%', left: '16%', size: 3, delay: 0.1 },
    { top: '24%', left: '79%', size: 2, delay: 0.45 },
    { top: '39%', left: '12%', size: 2, delay: 0.8 },
    { top: '61%', left: '82%', size: 3, delay: 1.05 },
    { top: '72%', left: '24%', size: 2, delay: 1.35 },
    { top: '78%', left: '66%', size: 2, delay: 1.65 },
];

const SplashScreen = ({ isDark, exiting, onTrigger }) => {
    const touchStartY = useRef(null);
    const prefersReducedMotion = useReducedMotion();

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
    }, [onTrigger]);

    const rootBackground = isDark
        ? 'linear-gradient(135deg, rgba(2,6,23,0.98), rgba(15,23,42,0.96) 42%, rgba(25,16,57,0.97))'
        : 'linear-gradient(135deg, rgba(248,250,252,0.98), rgba(238,242,255,0.98) 48%, rgba(245,243,255,0.98))';

    return (
        <MotionDiv
            className="splash-root fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
            style={{ background: rootBackground }}
            initial={{ opacity: 1 }}
            animate={exiting ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.55, delay: exiting ? 0.55 : 0 }}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={onTrigger}
        >
            <MotionDiv
                className="absolute inset-0"
                style={{
                    background: isDark
                        ? 'radial-gradient(circle at 50% 40%, rgba(99,102,241,0.22), transparent 34%), linear-gradient(90deg, rgba(34,211,238,0.08), transparent 35%, rgba(168,85,247,0.09))'
                        : 'radial-gradient(circle at 50% 40%, rgba(99,102,241,0.16), transparent 34%), linear-gradient(90deg, rgba(14,165,233,0.1), transparent 35%, rgba(168,85,247,0.1))',
                }}
                animate={prefersReducedMotion || exiting ? undefined : { scale: [1, 1.04, 1], opacity: [0.82, 1, 0.82] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            <MotionDiv
                className="splash-grid absolute inset-0 opacity-70"
                animate={prefersReducedMotion || exiting ? undefined : { backgroundPosition: ['0px 0px', '96px 96px'] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />

            <MotionDiv
                className="absolute left-1/2 top-1/2 h-[340px] w-[340px] sm:h-[520px] sm:w-[520px] lg:h-[660px] lg:w-[660px] -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(79,70,229,0.13)',
                    boxShadow: isDark
                        ? '0 0 90px rgba(99,102,241,0.2), inset 0 0 80px rgba(34,211,238,0.06)'
                        : '0 0 80px rgba(99,102,241,0.16), inset 0 0 80px rgba(14,165,233,0.07)',
                }}
                initial={{ opacity: 0, scale: 0.76, rotate: -10 }}
                animate={exiting
                    ? { opacity: 0, scale: 2.3, rotate: 22 }
                    : { opacity: 1, scale: 1, rotate: prefersReducedMotion ? 0 : 360 }}
                transition={exiting
                    ? { duration: 0.72, ease: [0.65, 0, 0.35, 1] }
                    : { opacity: { duration: 0.9 }, scale: { duration: 1.15, ease: [0.16, 1, 0.3, 1] }, rotate: { duration: 28, repeat: Infinity, ease: 'linear' } }}
            />

            {sparkPositions.map((spark) => (
                <MotionSpan
                    key={`${spark.top}-${spark.left}`}
                    className="absolute rounded-full"
                    style={{
                        top: spark.top,
                        left: spark.left,
                        width: spark.size,
                        height: spark.size,
                        background: isDark ? '#a5f3fc' : '#4f46e5',
                        boxShadow: isDark ? '0 0 18px #67e8f9' : '0 0 16px rgba(79,70,229,0.55)',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={exiting
                        ? { opacity: 0, scale: 0 }
                        : { opacity: [0, 1, 0.25, 1, 0], scale: [0, 1.6, 0.8, 1.3, 0], y: [0, -12, -5, -18, -26] }}
                    transition={{ duration: 3.8, repeat: Infinity, delay: spark.delay, ease: 'easeInOut' }}
                />
            ))}

            <MotionDiv
                className="splash-content relative z-10 flex flex-col items-center gap-5 px-6 text-center"
                initial={{ opacity: 0, scale: 0.88, y: 28, filter: 'blur(14px)' }}
                animate={exiting
                    ? { opacity: 0, scale: 12, y: -20, filter: 'blur(22px)' }
                    : { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                transition={exiting
                    ? { duration: 0.78, ease: [0.76, 0, 0.24, 1] }
                    : { duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
                <MotionDiv
                    className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-indigo-600 text-white shadow-2xl shadow-indigo-900/40"
                    initial={{ rotateX: -65, rotateY: 35 }}
                    animate={exiting ? { rotateX: 0, rotateY: 0 } : { rotateX: 0, rotateY: 0 }}
                    whileHover={{ scale: 1.06, rotate: -3 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="absolute inset-px rounded-[15px] bg-gradient-to-br from-white/24 via-transparent to-black/25" />
                    <div className="relative flex h-full w-full items-center justify-center text-lg font-black sm:text-xl">
                        RP
                    </div>
                </MotionDiv>

                <div className={`font-black leading-none ${isDark ? 'text-white' : 'text-indigo-950'}`}>
                    {brandWords.map((word, wordIndex) => (
                        <div key={word} className={wordIndex === 1 ? 'bg-gradient-to-r from-cyan-300 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent' : ''}>
                            {word.split('').map((letter, letterIndex) => (
                                <MotionSpan
                                    key={`${word}-${letterIndex}`}
                                    className="inline-block text-6xl sm:text-8xl lg:text-9xl"
                                    initial={{ opacity: 0, y: 42, rotateX: -70, filter: 'blur(12px)' }}
                                    animate={exiting
                                        ? { opacity: 0, y: -40, rotateX: 48, filter: 'blur(16px)' }
                                        : { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                                    transition={{
                                        duration: exiting ? 0.4 : 0.72,
                                        delay: exiting ? 0 : 0.12 + (wordIndex * 6 + letterIndex) * 0.045,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    {letter}
                                </MotionSpan>
                            ))}
                        </div>
                    ))}
                </div>

                <MotionP
                    className={`text-[11px] sm:text-xs uppercase font-medium ${isDark ? 'text-cyan-100/50' : 'text-indigo-700/55'}`}
                    style={{ letterSpacing: '0.22em' }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={exiting ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.72, delay: 0.72, ease: 'easeOut' }}
                >
                    AI-powered review management
                </MotionP>
            </MotionDiv>

            <MotionDiv
                className={`absolute bottom-7 sm:bottom-9 z-10 flex flex-col items-center gap-2 ${isDark ? 'text-white/35' : 'text-indigo-700/42'}`}
                initial={{ opacity: 0, y: 12 }}
                animate={exiting ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.05 }}
            >
                <span className="text-[10px] sm:text-[11px] uppercase" style={{ letterSpacing: '0.18em' }}>scroll to enter</span>
                <MotionSvg
                    width="14"
                    height="9"
                    viewBox="0 0 14 9"
                    fill="none"
                    animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
                    transition={{ duration: 1.45, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </MotionSvg>
            </MotionDiv>

            <style>{`
                .splash-grid {
                    background-image:
                        linear-gradient(${isDark ? 'rgba(125,211,252,0.08)' : 'rgba(79,70,229,0.09)'} 1px, transparent 1px),
                        linear-gradient(90deg, ${isDark ? 'rgba(125,211,252,0.08)' : 'rgba(79,70,229,0.09)'} 1px, transparent 1px);
                    background-size: 48px 48px;
                    mask-image: radial-gradient(ellipse 72% 70% at 50% 50%, black 12%, transparent 74%);
                }
            `}</style>
        </MotionDiv>
    );
};

export default SplashScreen;
