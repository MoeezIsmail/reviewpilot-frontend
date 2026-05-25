import { createElement } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { Sun, Moon, CheckCircle2, ShieldCheck, Zap, Star } from 'lucide-react';
import GoogleAuthButton from "../components/auth/GoogleAuthButton.jsx";
import AuthBackground from "../components/auth/AuthBackground.jsx";
import { useTheme } from '../context/ThemeContext.jsx';
import lottieAnimation from "../assets/d13a020f-5569-49bd-87bc-f2d9cd2ed8f5.json";

const MotionDiv = motion.div;
const MotionButton = motion.button;
const MotionP = motion.p;

const STAT_CARDS = [
    {
        iconBg: 'rgba(74,222,128,0.15)',
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
            </svg>
        ),
        label: 'Avg Rating',
        sub: '+1.4 stars gained',
        value: '4.8★',
        valColor: '#4ade80',
    },
    {
        iconBg: 'rgba(129,140,248,0.15)',
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
        ),
        label: 'AI Replies',
        sub: '2 min avg response',
        value: 'Auto',
        valColor: '#818cf8',
    },
    {
        iconBg: 'rgba(192,132,252,0.15)',
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2.5">
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
        transition: { delayChildren: 0.06, staggerChildren: 0.09 },
    },
};

const riseIn = {
    hidden: { opacity: 0, y: 22, filter: 'blur(10px)' },
    show: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.58, ease: [0.16, 1, 0.3, 1] },
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

    return (
        <div className="relative" style={{ height: '100dvh', overflow: 'hidden' }}>

            <AuthBackground isDark={isDark} />

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
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.08, rotate: isDark ? -12 : 12 }}
                whileTap={{ scale: 0.92 }}
            >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </MotionButton>

            {/* Scrollable content */}
            <div className="relative z-10 h-full overflow-y-auto">
                <div className="min-h-full flex items-center justify-center px-4 sm:px-6 md:px-10 py-10 lg:py-8">

                    <MotionDiv
                        className="w-full max-w-5xl mx-auto
                                   flex flex-col items-center gap-8
                                   lg:grid lg:grid-cols-2 lg:gap-14 lg:items-center"
                        variants={pageVariants}
                        initial="hidden"
                        animate="show"
                    >

                        {/* ══════════════════════════════════════════
                            LEFT  —  Visual column  (desktop only)
                            Lottie hero  ·  Stat cards
                        ══════════════════════════════════════════ */}
                        <MotionDiv
                            className="hidden lg:flex flex-col items-center gap-8 w-full"
                            variants={riseIn}
                        >
                            {/* Lottie */}
                            <div className={`relative flex items-center justify-center auth-lottie-wrap${prefersReducedMotion ? '' : ' auth-lottie-float'}`}>
                                <div className="auth-halo auth-halo-1" />
                                <div className="auth-halo auth-halo-2" />
                                <div className="auth-halo auth-halo-3" />
                                <div className="auth-lottie-ring" />
                                <MotionDiv
                                    className="w-[300px] h-[300px] xl:w-[350px] xl:h-[350px] relative z-10"
                                    initial={{ opacity: 0, scale: 0.72, rotate: -10 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Player
                                        autoplay
                                        loop
                                        src={lottieAnimation}
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                </MotionDiv>
                            </div>

                            {/* Stat cards */}
                            <div className="grid grid-cols-3 gap-3 w-full">
                                {STAT_CARDS.map((card, i) => (
                                    <MotionDiv
                                        key={i}
                                        variants={riseIn}
                                        whileHover={{ y: -7, scale: 1.04 }}
                                        transition={{ duration: 0.22, ease: 'easeOut' }}
                                        className={`
                                            flex flex-col items-center gap-2 px-3 py-4 rounded-2xl border backdrop-blur-md
                                            ${isDark
                                                ? 'bg-white/[0.06] border-white/[0.09]'
                                                : 'bg-white/70 border-indigo-100 shadow-sm shadow-indigo-100/60'}
                                        `}
                                    >
                                        <div
                                            style={{ background: card.iconBg }}
                                            className="w-8 h-8 rounded-xl flex items-center justify-center"
                                        >
                                            {card.icon}
                                        </div>
                                        <span
                                            style={{ color: card.valColor }}
                                            className="text-base font-black leading-none tracking-tight"
                                        >
                                            {card.value}
                                        </span>
                                        <div className="text-center space-y-0.5">
                                            <p className={`text-[11px] font-semibold leading-none ${isDark ? 'text-white/80' : 'text-indigo-900'}`}>
                                                {card.label}
                                            </p>
                                            <p className={`text-[10px] leading-none ${isDark ? 'text-indigo-200/45' : 'text-indigo-600/50'}`}>
                                                {card.sub}
                                            </p>
                                        </div>
                                    </MotionDiv>
                                ))}
                            </div>
                        </MotionDiv>

                        {/* ══════════════════════════════════════════
                            RIGHT  —  Brand + CTA  (all screens)
                            Logo  ·  Headline  ·  Auth card  ·  Trust
                        ══════════════════════════════════════════ */}
                        <MotionDiv
                            className="w-full flex flex-col items-center lg:items-start gap-5"
                            variants={riseIn}
                        >
                            {/* Logo */}
                            <MotionDiv className="flex items-center gap-2.5" variants={riseIn}>
                                <MotionDiv
                                    className={`
                                        w-9 h-9 rounded-xl flex items-center justify-center
                                        text-white font-black text-sm shadow-lg
                                        ${isDark ? 'bg-indigo-600 shadow-indigo-900/50' : 'bg-indigo-600 shadow-indigo-300/60'}
                                    `}
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    RP
                                </MotionDiv>
                                <span className={`text-[17px] font-bold tracking-tight ${isDark ? 'text-white' : 'text-indigo-900'}`}>
                                    ReviewPilot
                                </span>
                            </MotionDiv>

                            {/* Headline — visible on all screens */}
                            <MotionDiv className="text-center lg:text-left" variants={riseIn}>
                                <h1 className={`
                                    text-[2rem] sm:text-4xl lg:text-[2.65rem] xl:text-5xl
                                    font-black leading-[1.06] mb-2
                                    ${isDark ? 'text-white' : 'text-indigo-950'}
                                `}>
                                    Manage reviews.<br />
                                    <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                                        Grow faster.
                                    </span>
                                </h1>
                                <p className={`text-[13px] leading-relaxed max-w-xs mx-auto lg:mx-0 ${isDark ? 'text-indigo-200/55' : 'text-indigo-800/55'}`}>
                                    AI replies, real-time analytics, and multi-platform<br className="hidden sm:block" /> management — all in one dashboard.
                                </p>
                            </MotionDiv>

                            {/* Auth card */}
                            <MotionDiv
                                className="w-full"
                                style={{
                                    background: isDark
                                        ? 'linear-gradient(145deg, rgba(99,102,241,0.52), rgba(139,92,246,0.42), rgba(168,85,247,0.52))'
                                        : 'linear-gradient(145deg, rgba(99,102,241,0.38), rgba(139,92,246,0.26), rgba(168,85,247,0.38))',
                                    padding: '1.5px',
                                    borderRadius: '22px',
                                    boxShadow: isDark
                                        ? '0 20px 56px rgba(99,102,241,0.22), 0 0 0 1px rgba(255,255,255,0.03) inset'
                                        : '0 20px 56px rgba(99,102,241,0.14), 0 0 0 1px rgba(255,255,255,0.65) inset',
                                }}
                                variants={riseIn}
                                whileHover={{ y: -3 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                            >
                                <div
                                    className="auth-card-inner relative overflow-hidden rounded-[20.5px] p-6 sm:p-7 backdrop-blur-2xl"
                                    style={{
                                        background: isDark
                                            ? 'rgba(6, 6, 22, 0.88)'
                                            : 'rgba(255, 255, 255, 0.92)',
                                    }}
                                >
                                    <div className="auth-card-sheen" />

                                    {/* Card header */}
                                    <MotionDiv className="mb-5 relative z-10" variants={riseIn}>
                                        <h2 className={`text-[1.2rem] font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            Welcome back
                                        </h2>
                                        <p className={`text-sm ${isDark ? 'text-indigo-200/50' : 'text-gray-500'}`}>
                                            Sign in to manage your reviews
                                        </p>
                                    </MotionDiv>

                                    {/* Google sign-in */}
                                    <MotionDiv
                                        className="relative z-10"
                                        variants={riseIn}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.985 }}
                                    >
                                        <GoogleAuthButton isDark={isDark} />
                                    </MotionDiv>

                                    {/* Divider */}
                                    <MotionDiv className="flex items-center gap-3 my-5 relative z-10" variants={riseIn}>
                                        <div className={`flex-1 h-px ${isDark ? 'bg-white/[0.09]' : 'bg-gray-200/80'}`} />
                                        <span className={`text-[11px] tracking-wide ${isDark ? 'text-white/25' : 'text-gray-400'}`}>
                                            secure sign‑in
                                        </span>
                                        <div className={`flex-1 h-px ${isDark ? 'bg-white/[0.09]' : 'bg-gray-200/80'}`} />
                                    </MotionDiv>

                                    {/* Trust badges */}
                                    <MotionDiv className="grid grid-cols-3 gap-2.5 relative z-10" variants={pageVariants}>
                                        {trustBadges.map(({ label, Icon }) => (
                                            <MotionDiv
                                                key={label}
                                                variants={riseIn}
                                                whileHover={{ y: -4, scale: 1.04 }}
                                                transition={{ duration: 0.2 }}
                                                className={`
                                                    flex flex-col items-center gap-1.5 py-3 rounded-xl border
                                                    ${isDark
                                                        ? 'bg-white/[0.05] border-white/[0.08]'
                                                        : 'bg-indigo-50/70 border-indigo-100'}
                                                `}
                                            >
                                                {createElement(Icon, {
                                                    size: 16,
                                                    className: isDark ? 'text-cyan-300/70' : 'text-indigo-500',
                                                })}
                                                <span className={`text-[11px] font-medium ${isDark ? 'text-white/45' : 'text-indigo-700/65'}`}>
                                                    {label}
                                                </span>
                                            </MotionDiv>
                                        ))}
                                    </MotionDiv>

                                    {/* Terms footer */}
                                    <MotionP
                                        className={`relative z-10 text-center text-[11px] mt-5 leading-relaxed ${isDark ? 'text-white/20' : 'text-gray-400/80'}`}
                                        variants={riseIn}
                                    >
                                        By continuing, you agree to our{' '}
                                        <span className={isDark ? 'text-white/35' : 'text-gray-500'}>Terms of Service</span>
                                        {' '}and{' '}
                                        <span className={isDark ? 'text-white/35' : 'text-gray-500'}>Privacy Policy</span>.
                                    </MotionP>
                                </div>
                            </MotionDiv>

                            {/* Trust line */}
                            <MotionDiv className="flex items-center gap-2" variants={riseIn}>
                                <CheckCircle2
                                    size={12}
                                    className={isDark ? 'text-indigo-400/70' : 'text-indigo-500/70'}
                                />
                                <p className={`text-xs ${isDark ? 'text-indigo-300/38' : 'text-indigo-700/42'}`}>
                                    Trusted by 2,000+ businesses worldwide
                                </p>
                            </MotionDiv>
                        </MotionDiv>

                    </MotionDiv>
                </div>
            </div>

            <style>{`
                html, body { overflow: hidden; height: 100%; }

                /* ── Lottie wrap ── */
                .auth-lottie-wrap { padding: 6px 0; }
                .auth-halo { position: absolute; border-radius: 50%; pointer-events: none; }
                .auth-lottie-float { animation: lottieFloat 6s ease-in-out infinite; }

                .auth-lottie-ring {
                    position: absolute;
                    border-radius: 9999px;
                    pointer-events: none;
                    border: 1px solid ${isDark ? 'rgba(125,211,252,0.16)' : 'rgba(99,102,241,0.18)'};
                    box-shadow: ${isDark
                        ? '0 0 48px rgba(34,211,238,0.1), inset 0 0 38px rgba(99,102,241,0.1)'
                        : '0 0 38px rgba(99,102,241,0.1), inset 0 0 36px rgba(14,165,233,0.07)'};
                    animation: premiumRing 12s linear infinite;
                }

                /* Desktop halo + ring sizes */
                @media (min-width: 1024px) {
                    .auth-halo-1 { width: 460px; height: 460px; filter: blur(38px); }
                    .auth-halo-2 { width: 350px; height: 350px; filter: blur(24px); }
                    .auth-halo-3 { width: 220px; height: 220px; filter: blur(14px); }
                    .auth-lottie-ring { width: 400px; height: 400px; }
                }

                .auth-halo-1 {
                    background: ${isDark
                        ? 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(139,92,246,0.12) 45%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.08) 45%, transparent 70%)'};
                    animation: lottieGlow 4.2s ease-in-out infinite;
                }
                .auth-halo-2 {
                    background: ${isDark
                        ? 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(168,85,247,0.14) 50%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(168,85,247,0.07) 50%, transparent 70%)'};
                    animation: lottieGlow 4.2s ease-in-out infinite 1s;
                }
                .auth-halo-3 {
                    background: ${isDark
                        ? 'radial-gradient(circle, rgba(196,181,253,0.26) 0%, transparent 60%)'
                        : 'radial-gradient(circle, rgba(196,181,253,0.16) 0%, transparent 60%)'};
                    animation: lottieGlow 4.2s ease-in-out infinite 2s;
                }

                /* ── Auth card ── */
                .auth-card-inner::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    border-radius: inherit;
                    pointer-events: none;
                    background:
                        linear-gradient(120deg, transparent 0%, ${isDark ? 'rgba(125,211,252,0.08)' : 'rgba(99,102,241,0.06)'} 28%, transparent 46%),
                        radial-gradient(circle at 10% 6%, ${isDark ? 'rgba(34,211,238,0.11)' : 'rgba(14,165,233,0.09)'}, transparent 30%);
                    opacity: 0.8;
                }
                .auth-card-sheen {
                    position: absolute;
                    inset: -45% -70%;
                    pointer-events: none;
                    background: linear-gradient(115deg, transparent 42%, ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.68)'} 50%, transparent 58%);
                    transform: translateX(-38%) rotate(6deg);
                    animation: cardSheen 5.2s ease-in-out infinite;
                }

                /* ── Keyframes ── */
                @keyframes lottieFloat {
                    0%, 100% { transform: translateY(0px); }
                    50%       { transform: translateY(-9px); }
                }
                @keyframes lottieGlow {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50%      { opacity: 1;   transform: scale(1.08); }
                }
                @keyframes premiumRing {
                    from { transform: rotate(0deg) scale(1);    opacity: 0.65; }
                    50%  { transform: rotate(180deg) scale(1.03); opacity: 1; }
                    to   { transform: rotate(360deg) scale(1);  opacity: 0.65; }
                }
                @keyframes cardSheen {
                    0%, 36%  { transform: translateX(-38%) rotate(6deg); opacity: 0; }
                    50%      { opacity: 1; }
                    80%, 100%{ transform: translateX(38%) rotate(6deg);  opacity: 0; }
                }
            `}</style>

        </div>
    );
};

export default Auth;
