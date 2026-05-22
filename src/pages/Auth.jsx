import { useState, useCallback, createElement } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { Sun, Moon, CheckCircle2, ShieldCheck, Zap, Star } from 'lucide-react';
import GoogleAuthButton from "../components/auth/GoogleAuthButton.jsx";
import AuthBackground from "../components/auth/AuthBackground.jsx";
import SplashScreen from "../components/auth/SplashScreen.jsx";
import { useTheme } from '../context/ThemeContext.jsx';
import lottieAnimation from "../assets/d13a020f-5569-49bd-87bc-f2d9cd2ed8f5.json";

const MotionDiv = motion.div;
const MotionButton = motion.button;
const MotionP = motion.p;

const STAT_CARDS = [
    {
        iconBg: 'rgba(74,222,128,0.15)',
        icon: (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
            </svg>
        ),
        label: 'Rating',
        sub: '+1.4 stars',
        value: '4.8★',
        valColor: '#4ade80',
    },
    {
        iconBg: 'rgba(129,140,248,0.15)',
        icon: (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
        ),
        label: 'AI Replies',
        sub: '2 min avg',
        value: 'Auto',
        valColor: '#818cf8',
    },
    {
        iconBg: 'rgba(192,132,252,0.15)',
        icon: (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2.5">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
        label: 'New Today',
        sub: 'Live activity',
        value: '+24',
        valColor: '#c084fc',
    },
];

const pageVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            delayChildren: 0.16,
            staggerChildren: 0.08,
        },
    },
};

const authRevealVariants = {
    hidden: {
        opacity: 0,
        clipPath: 'circle(34px at 50% calc(50% - 118px))',
        filter: 'brightness(1.18) blur(10px)',
    },
    show: {
        opacity: 1,
        clipPath: 'circle(150% at 50% calc(50% - 118px))',
        filter: 'brightness(1) blur(0px)',
        transition: {
            opacity: { duration: 0.24, ease: 'easeOut' },
            clipPath: { duration: 1.05, ease: [0.76, 0, 0.24, 1] },
            filter: { duration: 0.85, ease: 'easeOut' },
        },
    },
};

const riseIn = {
    hidden: { opacity: 0, y: 28, filter: 'blur(12px)' },
    show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] },
    },
};

const trustBadges = [
    { label: 'Secure', Icon: ShieldCheck },
    { label: 'Instant', Icon: Zap },
    { label: 'Trusted', Icon: Star },
];

const Auth = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const prefersReducedMotion = useReducedMotion();

    const [splashExiting, setSplashExiting] = useState(false);
    const [splashDone, setSplashDone] = useState(false);

    const handleSplashTrigger = useCallback(() => {
        if (splashExiting || splashDone) return;
        setSplashExiting(true);
        setTimeout(() => setSplashDone(true), 1120);
    }, [splashExiting, splashDone]);

    return (
        <div className="relative overflow-hidden" style={{ height: '100dvh' }}>

            {/* Shared background — visible through splash and auth */}
            <AuthBackground isDark={isDark} />

            {/* ── Auth page ── revealed from the splash logo mask */}
            <MotionDiv
                className="auth-reveal-layer relative z-10 h-full"
                variants={authRevealVariants}
                initial="hidden"
                animate={splashExiting ? 'show' : 'hidden'}
            >

                {/* Theme toggle */}
                <MotionButton
                    onClick={toggleTheme}
                    className={`
                        fixed top-4 right-4 z-20
                        w-9 h-9 rounded-xl flex items-center justify-center
                        border transition-all duration-300 shadow-lg backdrop-blur-md
                        ${isDark
                            ? 'bg-white/10 border-white/20 text-yellow-300 hover:bg-white/20'
                            : 'bg-white/70 border-indigo-200 text-indigo-600 hover:bg-white/90'}
                    `}
                    aria-label="Toggle theme"
                    initial={{ opacity: 0, scale: 0.82, y: -10 }}
                    animate={splashExiting ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.82, y: -10 }}
                    whileHover={{ scale: 1.06, rotate: isDark ? -8 : 8 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                    {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </MotionButton>

                {/* Page content */}
                <div className="h-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-4">
                    <MotionDiv
                        className="w-full max-w-6xl mx-auto flex flex-col items-center gap-4 sm:gap-5 lg:grid lg:grid-cols-2 lg:gap-14 lg:items-center"
                        variants={pageVariants}
                    >

                        {/* ═══════════════════════════════════════
                            LEFT — Logo + HUGE Lottie + stat cards
                        ═══════════════════════════════════════ */}
                        <MotionDiv className="flex flex-col items-center text-center gap-3 w-full lg:items-start lg:text-left lg:gap-4" variants={riseIn}>

                            {/* Logo */}
                            <MotionDiv className="flex items-center gap-2.5" variants={riseIn}>
                                <MotionDiv
                                    className={`
                                    w-8 h-8 lg:w-9 lg:h-9 rounded-xl flex items-center justify-center
                                    text-white font-bold text-xs shadow-lg
                                    ${isDark ? 'bg-indigo-600 shadow-indigo-900/60' : 'bg-indigo-600 shadow-indigo-300/60'}
                                    `}
                                    whileHover={{ scale: 1.08, rotate: -4 }}
                                >
                                    RP
                                </MotionDiv>
                                <span className={`text-base lg:text-lg font-bold ${isDark ? 'text-white' : 'text-indigo-900'}`}>
                                    ReviewPilot
                                </span>
                            </MotionDiv>

                            {/* Headline — mobile only (desktop: in right panel) */}
                            <MotionDiv className="lg:hidden" variants={riseIn}>
                                <h1
                                    className={`text-3xl sm:text-4xl font-black leading-[1.04] mb-1.5 ${isDark ? 'text-white' : 'text-indigo-950'}`}
                                >
                                    Manage reviews.<br />
                                    <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                                        Grow faster.
                                    </span>
                                </h1>
                            </MotionDiv>

                            {/* ── Lottie hero — HUGE ── */}
                            <MotionDiv
                                className={`relative flex justify-center items-center auth-lottie-wrap${prefersReducedMotion ? '' : ' auth-lottie-float'}`}
                                variants={riseIn}
                            >
                                <div className="auth-halo auth-halo-1" />
                                <div className="auth-halo auth-halo-2" />
                                <div className="auth-halo auth-halo-3" />
                                <div className="auth-lottie-ring" />
                                {/* Responsive Lottie container */}
                                <MotionDiv
                                    className="w-[200px] h-[200px] lg:w-[380px] lg:h-[380px] relative z-10"
                                    initial={{ opacity: 0, scale: 0.76, rotate: -8 }}
                                    animate={splashExiting ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.76, rotate: -8 }}
                                    transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Player
                                        autoplay
                                        loop
                                        src={lottieAnimation}
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                </MotionDiv>
                            </MotionDiv>

                            {/* Stat cards — desktop only */}
                            <div className="hidden lg:grid grid-cols-3 gap-2.5 w-full">
                                {STAT_CARDS.map((card, i) => (
                                    <MotionDiv
                                        key={i}
                                        variants={riseIn}
                                        whileHover={{ y: -7, scale: 1.03 }}
                                        className={`
                                            flex flex-col items-center gap-1.5 px-3 py-3 rounded-2xl border backdrop-blur-md
                                            ${isDark
                                                ? 'bg-white/[0.07] border-white/10'
                                                : 'bg-white/65 border-indigo-200/60 shadow-sm'}
                                        `}
                                    >
                                        <div style={{ background: card.iconBg }} className="w-7 h-7 rounded-lg flex items-center justify-center">
                                            {card.icon}
                                        </div>
                                        <span style={{ color: card.valColor }} className="text-sm font-bold leading-none">{card.value}</span>
                                        <div className="text-center">
                                            <p className={`text-[11px] font-semibold leading-none mb-0.5 ${isDark ? 'text-white' : 'text-indigo-900'}`}>{card.label}</p>
                                            <p className={`text-[10px] leading-none ${isDark ? 'text-indigo-200/50' : 'text-indigo-700/55'}`}>{card.sub}</p>
                                        </div>
                                    </MotionDiv>
                                ))}
                            </div>
                        </MotionDiv>

                        {/* ═══════════════════════════════════════
                            RIGHT — Headline (desktop) + Login card
                        ═══════════════════════════════════════ */}
                        <MotionDiv className="w-full flex flex-col gap-5 lg:gap-6" variants={riseIn}>

                            {/* Headline — desktop only */}
                            <MotionDiv className="hidden lg:block" variants={riseIn}>
                                <h1
                                    className={`text-5xl xl:text-6xl font-black leading-[1.04] mb-2 ${isDark ? 'text-white' : 'text-indigo-950'}`}
                                >
                                    Manage reviews.<br />
                                    <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                                        Grow faster.
                                    </span>
                                </h1>
                                <p className={`text-sm leading-relaxed ${isDark ? 'text-indigo-200/60' : 'text-indigo-800/55'}`}>
                                    AI replies, real-time analytics, and multi-platform<br />
                                    management — all in one dashboard.
                                </p>
                            </MotionDiv>

                            {/* Gradient border card wrapper */}
                            <MotionDiv
                                className="w-full"
                                style={{
                                    background: isDark
                                        ? 'linear-gradient(145deg, rgba(99,102,241,0.55), rgba(139,92,246,0.45), rgba(168,85,247,0.55))'
                                        : 'linear-gradient(145deg, rgba(99,102,241,0.4), rgba(139,92,246,0.28), rgba(168,85,247,0.4))',
                                    padding: '1.5px',
                                    borderRadius: '24px',
                                    boxShadow: isDark
                                        ? '0 24px 60px rgba(99,102,241,0.28), 0 0 0 1px rgba(255,255,255,0.03) inset'
                                        : '0 24px 60px rgba(99,102,241,0.18), 0 0 0 1px rgba(255,255,255,0.7) inset',
                                }}
                                variants={riseIn}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                            >
                                <div
                                    className="auth-card-inner relative overflow-hidden rounded-[22.5px] p-5 sm:p-7 lg:p-8 backdrop-blur-2xl"
                                    style={{
                                        background: isDark
                                            ? 'rgba(5, 5, 20, 0.9)'
                                            : 'rgba(255, 255, 255, 0.9)',
                                    }}
                                >
                                    <div className="auth-card-sheen" />
                                    {/* Heading */}
                                    <MotionDiv className="mb-5 sm:mb-6 relative z-10" variants={riseIn}>
                                        <h2 className={`text-xl sm:text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            Welcome back
                                        </h2>
                                        <p className={`text-sm ${isDark ? 'text-indigo-200/55' : 'text-gray-500'}`}>
                                            Sign in to manage your reviews
                                        </p>
                                    </MotionDiv>

                                    <MotionDiv className="relative z-10" variants={riseIn} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.985 }}>
                                        <GoogleAuthButton isDark={isDark} />
                                    </MotionDiv>

                                    {/* Divider — tablet+ */}
                                    <MotionDiv className="hidden sm:flex items-center gap-3 my-5 relative z-10" variants={riseIn}>
                                        <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                                        <span className={`text-xs ${isDark ? 'text-white/28' : 'text-gray-400'}`}>secure sign-in</span>
                                        <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                                    </MotionDiv>

                                    {/* Trust badges — tablet+ */}
                                    <MotionDiv className="hidden sm:grid grid-cols-3 gap-2.5 relative z-10" variants={pageVariants}>
                                        {trustBadges.map(({ label, Icon }) => (
                                            <MotionDiv
                                                key={label}
                                                variants={riseIn}
                                                whileHover={{ y: -4, scale: 1.03 }}
                                                className={`
                                                    flex flex-col items-center gap-1.5 py-3 rounded-xl border
                                                    ${isDark
                                                        ? 'bg-white/5 border-white/10'
                                                        : 'bg-indigo-50/60 border-indigo-100'}
                                                `}
                                            >
                                                {createElement(Icon, { size: 17, className: isDark ? 'text-cyan-200/75' : 'text-indigo-500' })}
                                                <span className={`text-[11px] font-medium ${isDark ? 'text-white/48' : 'text-indigo-700/70'}`}>
                                                    {label}
                                                </span>
                                            </MotionDiv>
                                        ))}
                                    </MotionDiv>

                                    {/* Footer */}
                                    <MotionP className={`relative z-10 text-center text-[11px] mt-4 sm:mt-5 leading-relaxed ${isDark ? 'text-white/22' : 'text-gray-400'}`} variants={riseIn}>
                                        By continuing, you agree to our Terms of Service<br />and Privacy Policy.
                                    </MotionP>
                                </div>
                            </MotionDiv>

                            {/* Trust line — desktop only */}
                            <MotionDiv className="hidden lg:flex items-center gap-2" variants={riseIn}>
                                <CheckCircle2 size={12} className={isDark ? 'text-indigo-400' : 'text-indigo-500'} />
                                <p className={`text-xs ${isDark ? 'text-indigo-300/40' : 'text-indigo-700/45'}`}>
                                    Trusted by 2,000+ businesses worldwide
                                </p>
                            </MotionDiv>
                        </MotionDiv>

                    </MotionDiv>
                </div>
            </MotionDiv>

            {/* ── Splash screen overlay ── */}
            {!splashDone && (
                <SplashScreen
                    isDark={isDark}
                    exiting={splashExiting}
                    onTrigger={handleSplashTrigger}
                />
            )}

            <style>{`
                html, body { overflow: hidden; height: 100%; }

                /* Lottie glow halos */
                .auth-lottie-wrap { padding: 4px 0; }
                .auth-halo { position: absolute; border-radius: 50%; pointer-events: none; }
                .auth-lottie-float { animation: lottieFloat 5.8s ease-in-out infinite; }
                .auth-lottie-ring {
                    position: absolute;
                    border-radius: 9999px;
                    pointer-events: none;
                    border: 1px solid ${isDark ? 'rgba(125,211,252,0.18)' : 'rgba(99,102,241,0.2)'};
                    box-shadow: ${isDark
                        ? '0 0 42px rgba(34,211,238,0.12), inset 0 0 36px rgba(99,102,241,0.12)'
                        : '0 0 36px rgba(99,102,241,0.12), inset 0 0 34px rgba(14,165,233,0.08)'};
                    animation: premiumRing 10s linear infinite;
                }
                .auth-card-inner::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    border-radius: inherit;
                    pointer-events: none;
                    background:
                        linear-gradient(120deg, transparent 0%, ${isDark ? 'rgba(125,211,252,0.1)' : 'rgba(99,102,241,0.08)'} 28%, transparent 46%),
                        radial-gradient(circle at 12% 8%, ${isDark ? 'rgba(34,211,238,0.13)' : 'rgba(14,165,233,0.1)'}, transparent 30%);
                    opacity: 0.75;
                }
                .auth-card-sheen {
                    position: absolute;
                    inset: -45% -70%;
                    pointer-events: none;
                    background: linear-gradient(115deg, transparent 42%, ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.72)'} 50%, transparent 58%);
                    transform: translateX(-38%) rotate(6deg);
                    animation: cardSheen 4.8s ease-in-out infinite;
                }

                .auth-halo-1 {
                    background: ${isDark
                        ? 'radial-gradient(circle, rgba(99,102,241,0.32) 0%, rgba(139,92,246,0.13) 45%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.09) 45%, transparent 70%)'};
                    animation: lottieGlow 4s ease-in-out infinite;
                }
                .auth-halo-2 {
                    background: ${isDark
                        ? 'radial-gradient(circle, rgba(139,92,246,0.42) 0%, rgba(168,85,247,0.15) 50%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(139,92,246,0.24) 0%, rgba(168,85,247,0.08) 50%, transparent 70%)'};
                    animation: lottieGlow 4s ease-in-out infinite 0.9s;
                }
                .auth-halo-3 {
                    background: ${isDark
                        ? 'radial-gradient(circle, rgba(196,181,253,0.28) 0%, transparent 60%)'
                        : 'radial-gradient(circle, rgba(196,181,253,0.18) 0%, transparent 60%)'};
                    animation: lottieGlow 4s ease-in-out infinite 1.8s;
                }

                /* Mobile halo sizes */
                @media (max-width: 1023px) {
                    .auth-halo-1 { width: 280px; height: 280px; filter: blur(22px); }
                    .auth-halo-2 { width: 215px; height: 215px; filter: blur(14px); }
                    .auth-halo-3 { width: 135px; height: 135px; filter: blur(9px);  }
                    .auth-lottie-ring { width: 230px; height: 230px; }
                }
                /* Desktop halo sizes */
                @media (min-width: 1024px) {
                    .auth-halo-1 { width: 490px; height: 490px; filter: blur(36px); }
                    .auth-halo-2 { width: 370px; height: 370px; filter: blur(22px); }
                    .auth-halo-3 { width: 230px; height: 230px; filter: blur(13px); }
                    .auth-lottie-ring { width: 430px; height: 430px; }
                }

                @keyframes lottieFloat {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes lottieGlow {
                    0%, 100% { opacity: 0.55; transform: scale(1); }
                    50%       { opacity: 1;    transform: scale(1.1); }
                }
                @keyframes premiumRing {
                    0% { transform: rotate(0deg) scale(1); opacity: 0.7; }
                    50% { transform: rotate(180deg) scale(1.04); opacity: 1; }
                    100% { transform: rotate(360deg) scale(1); opacity: 0.7; }
                }
                @keyframes cardSheen {
                    0%, 38% { transform: translateX(-38%) rotate(6deg); opacity: 0; }
                    52% { opacity: 1; }
                    78%, 100% { transform: translateX(38%) rotate(6deg); opacity: 0; }
                }
            `}</style>

        </div>
    );
};

export default Auth;
