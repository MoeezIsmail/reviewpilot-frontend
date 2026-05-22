import { Player } from '@lottiefiles/react-lottie-player';
import { Sun, Moon, CheckCircle2 } from 'lucide-react';
import { useToast } from "../components/toast/ToastProvider.jsx";
import GoogleAuthButton from "../components/auth/GoogleAuthButton.jsx";
import AuthBackground from "../components/auth/AuthBackground.jsx";
import { useTheme } from '../context/ThemeContext.jsx';
import lottieAnimation from "../assets/d13a020f-5569-49bd-87bc-f2d9cd2ed8f5.json";

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

const Auth = () => {
    const { addToast } = useToast();
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="relative overflow-hidden" style={{ height: '100dvh' }}>

            <AuthBackground isDark={isDark} />

            {/* Theme toggle */}
            <button
                onClick={toggleTheme}
                className={`
                    fixed top-4 right-4 z-50
                    w-9 h-9 rounded-xl flex items-center justify-center
                    border transition-all duration-300 shadow-lg backdrop-blur-md
                    ${isDark
                        ? 'bg-white/10 border-white/20 text-yellow-300 hover:bg-white/20'
                        : 'bg-white/70 border-indigo-200 text-indigo-600 hover:bg-white/90'}
                `}
                aria-label="Toggle theme"
            >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Page content */}
            <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 md:px-8 py-4">
                <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-4 sm:gap-5 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">

                    {/* ════════════════════════════════════════
                        BRAND PANEL — compact on mobile, full on desktop
                    ════════════════════════════════════════ */}
                    <div className="flex flex-col items-center text-center gap-2.5 w-full lg:items-start lg:text-left lg:gap-4">

                        {/* Logo */}
                        <div className="flex items-center gap-2.5">
                            <div className={`
                                w-8 h-8 lg:w-9 lg:h-9 rounded-xl flex items-center justify-center
                                text-white font-bold text-xs shadow-lg
                                ${isDark ? 'bg-indigo-600 shadow-indigo-900/60' : 'bg-indigo-600 shadow-indigo-300/60'}
                            `}>
                                RP
                            </div>
                            <span className={`text-base lg:text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-indigo-900'}`}>
                                ReviewPilot
                            </span>
                        </div>

                        {/* Headline */}
                        <div>
                            <h1
                                className={`font-black tracking-tight leading-[1.05] mb-1.5 ${isDark ? 'text-white' : 'text-indigo-950'}`}
                                style={{ fontSize: 'clamp(1.75rem, 5vw, 3.4rem)' }}
                            >
                                Manage reviews.<br />
                                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                                    Grow faster.
                                </span>
                            </h1>
                            {/* Subtitle — tablet and above only */}
                            <p className={`hidden sm:block text-sm leading-relaxed ${isDark ? 'text-indigo-200/60' : 'text-indigo-800/55'}`}>
                                AI replies, real-time analytics, and multi-platform<br className="hidden lg:block" />
                                management — all in one dashboard.
                            </p>
                        </div>

                        {/* Lottie hero — responsive size via CSS */}
                        <div className="relative flex justify-center items-center auth-lottie-wrap">
                            <div className="auth-halo auth-halo-1" />
                            <div className="auth-halo auth-halo-2" />
                            <div className="auth-halo auth-halo-3" />
                            <div className="w-[130px] h-[130px] lg:w-[250px] lg:h-[250px] relative z-10">
                                <Player
                                    autoplay
                                    loop
                                    src={lottieAnimation}
                                    style={{ height: '100%', width: '100%' }}
                                />
                            </div>
                        </div>

                        {/* Stat cards — desktop only */}
                        <div className="hidden lg:grid grid-cols-3 gap-2.5 w-full">
                            {STAT_CARDS.map((card, i) => (
                                <div
                                    key={i}
                                    style={{ animation: `floatCard 4s ease-in-out infinite ${i * 0.6}s` }}
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
                                </div>
                            ))}
                        </div>

                        {/* Trust line — desktop only */}
                        <div className="hidden lg:flex items-center gap-2">
                            <CheckCircle2 size={12} className={isDark ? 'text-indigo-400' : 'text-indigo-500'} />
                            <p className={`text-xs ${isDark ? 'text-indigo-300/40' : 'text-indigo-700/45'}`}>
                                Trusted by 2,000+ businesses worldwide
                            </p>
                        </div>
                    </div>

                    {/* ════════════════════════════════
                        LOGIN CARD
                    ════════════════════════════════ */}

                    {/* Gradient border wrapper */}
                    <div
                        className="w-full"
                        style={{
                            background: isDark
                                ? 'linear-gradient(145deg, rgba(99,102,241,0.55), rgba(139,92,246,0.45), rgba(168,85,247,0.55))'
                                : 'linear-gradient(145deg, rgba(99,102,241,0.4), rgba(139,92,246,0.28), rgba(168,85,247,0.4))',
                            padding: '1.5px',
                            borderRadius: '24px',
                            boxShadow: isDark
                                ? '0 24px 60px rgba(99,102,241,0.28), 0 0 0 1px rgba(255,255,255,0.03) inset'
                                : '0 24px 60px rgba(99,102,241,0.2), 0 0 0 1px rgba(255,255,255,0.7) inset',
                        }}
                    >
                        <div
                            className="rounded-[22.5px] p-5 sm:p-7 lg:p-10 backdrop-blur-2xl"
                            style={{
                                background: isDark
                                    ? 'rgba(5, 5, 20, 0.9)'
                                    : 'rgba(255, 255, 255, 0.9)',
                            }}
                        >
                            {/* Heading */}
                            <div className="mb-5 sm:mb-7">
                                <h2 className={`text-xl sm:text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Welcome back
                                </h2>
                                <p className={`text-sm ${isDark ? 'text-indigo-200/55' : 'text-gray-500'}`}>
                                    Sign in to manage your reviews
                                </p>
                            </div>

                            <GoogleAuthButton isDark={isDark} />

                            {/* Divider — tablet and above */}
                            <div className="hidden sm:flex items-center gap-3 my-5">
                                <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                                <span className={`text-xs ${isDark ? 'text-white/28' : 'text-gray-400'}`}>secure sign-in</span>
                                <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                            </div>

                            {/* Trust badges — tablet and above */}
                            <div className="hidden sm:grid grid-cols-3 gap-2.5">
                                {[
                                    { label: 'Secure',  emoji: '🔒' },
                                    { label: 'Instant', emoji: '⚡' },
                                    { label: 'Trusted', emoji: '⭐' },
                                ].map(({ label, emoji }) => (
                                    <div
                                        key={label}
                                        className={`
                                            flex flex-col items-center gap-1.5 py-3 rounded-xl border
                                            ${isDark
                                                ? 'bg-white/5 border-white/10'
                                                : 'bg-indigo-50/60 border-indigo-100'}
                                        `}
                                    >
                                        <span className="text-base leading-none">{emoji}</span>
                                        <span className={`text-[11px] font-medium ${isDark ? 'text-white/48' : 'text-indigo-700/70'}`}>
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Footer note */}
                            <p className={`text-center text-[11px] mt-4 sm:mt-5 leading-relaxed ${isDark ? 'text-white/22' : 'text-gray-400'}`}>
                                By continuing, you agree to our Terms of Service<br />and Privacy Policy.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                html, body { overflow: hidden; height: 100%; }

                /* Lottie glow halos — responsive sizes */
                .auth-lottie-wrap { padding: 4px 0; }
                .auth-halo { position: absolute; border-radius: 50%; pointer-events: none; }

                .auth-halo-1 {
                    background: ${isDark
                        ? 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(139,92,246,0.12) 45%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.08) 45%, transparent 70%)'};
                    animation: lottieGlow 4s ease-in-out infinite;
                }
                .auth-halo-2 {
                    background: ${isDark
                        ? 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(168,85,247,0.14) 50%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(168,85,247,0.07) 50%, transparent 70%)'};
                    animation: lottieGlow 4s ease-in-out infinite 0.9s;
                }
                .auth-halo-3 {
                    background: ${isDark
                        ? 'radial-gradient(circle, rgba(196,181,253,0.26) 0%, transparent 60%)'
                        : 'radial-gradient(circle, rgba(196,181,253,0.16) 0%, transparent 60%)'};
                    animation: lottieGlow 4s ease-in-out infinite 1.8s;
                }

                /* Mobile halo sizes */
                @media (max-width: 1023px) {
                    .auth-halo-1 { width: 195px; height: 195px; filter: blur(18px); }
                    .auth-halo-2 { width: 150px; height: 150px; filter: blur(12px); }
                    .auth-halo-3 { width:  95px; height:  95px; filter: blur(8px);  }
                }
                /* Desktop halo sizes */
                @media (min-width: 1024px) {
                    .auth-halo-1 { width: 340px; height: 340px; filter: blur(26px); }
                    .auth-halo-2 { width: 250px; height: 250px; filter: blur(16px); }
                    .auth-halo-3 { width: 160px; height: 160px; filter: blur(10px); }
                }

                @keyframes floatCard {
                    0%, 100% { transform: translateY(0px); }
                    50%       { transform: translateY(-5px); }
                }
                @keyframes lottieGlow {
                    0%, 100% { opacity: 0.55; transform: scale(1); }
                    50%       { opacity: 1;    transform: scale(1.1); }
                }
            `}</style>

        </div>
    );
};

export default Auth;
