import { Player } from '@lottiefiles/react-lottie-player';
import { Sun, Moon, Star, Zap, BarChart3, Shield, CheckCircle2 } from 'lucide-react';
import { useToast } from "../components/toast/ToastProvider.jsx";
import GoogleAuthButton from "../components/auth/GoogleAuthButton.jsx";
import AuthBackground from "../components/auth/AuthBackground.jsx";
import { useTheme } from '../context/ThemeContext.jsx';
import lottieAnimation from "../assets/d13a020f-5569-49bd-87bc-f2d9cd2ed8f5.json";

const FEATURES = [
    { icon: Star,      text: 'AI-powered review replies' },
    { icon: BarChart3, text: 'Real-time analytics & insights' },
    { icon: Zap,       text: 'Bulk reply automation' },
    { icon: Shield,    text: 'Multi-platform management' },
];

const STAT_CARDS = [
    {
        iconBg: 'rgba(74,222,128,0.15)',
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
            </svg>
        ),
        label: 'Rating Improved',
        sub: '+1.4 stars this month',
        value: '4.8★',
        valColor: '#4ade80',
        delay: '0s',
        offset: '0px',
    },
    {
        iconBg: 'rgba(129,140,248,0.15)',
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2.5">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
        ),
        label: 'AI Reply Sent',
        sub: 'Response time: 2 min',
        value: 'Auto',
        valColor: '#818cf8',
        delay: '0.6s',
        offset: '20px',
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
        label: 'New Reviews',
        sub: "Today's activity",
        value: '+24',
        valColor: '#c084fc',
        delay: '1.2s',
        offset: '0px',
    },
];

const Auth = () => {
    const { addToast } = useToast();
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="relative min-h-screen overflow-hidden">

            <AuthBackground isDark={isDark} />

            {/* Theme toggle */}
            <button
                onClick={toggleTheme}
                className={`
                    fixed top-4 right-4 z-50
                    w-10 h-10 rounded-xl flex items-center justify-center
                    border transition-all duration-300 shadow-lg backdrop-blur-md
                    ${isDark
                        ? 'bg-white/10 border-white/20 text-yellow-300 hover:bg-white/20'
                        : 'bg-white/70 border-indigo-200 text-indigo-600 hover:bg-white/90'}
                `}
                aria-label="Toggle theme"
            >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Page content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center p-5 md:p-8">
                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

                    {/* ════════════════════════════════
                        LEFT — Brand panel (desktop only)
                    ════════════════════════════════ */}
                    <div className="hidden lg:flex flex-col gap-5">

                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className={`
                                w-10 h-10 rounded-xl flex items-center justify-center
                                text-white font-bold text-sm shadow-lg
                                ${isDark ? 'bg-indigo-600 shadow-indigo-900/60' : 'bg-indigo-600 shadow-indigo-300/60'}
                            `}>
                                RP
                            </div>
                            <span className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-indigo-900'}`}>
                                ReviewPilot
                            </span>
                        </div>

                        {/* ── Lottie — Hero visual ── */}
                        <div className="relative flex justify-center items-center py-3 -mx-2">
                            {/* Outer ambient halo */}
                            <div style={{
                                position: 'absolute',
                                width: 380,
                                height: 380,
                                borderRadius: '50%',
                                background: isDark
                                    ? 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(139,92,246,0.14) 45%, transparent 70%)'
                                    : 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(139,92,246,0.08) 45%, transparent 70%)',
                                filter: 'blur(28px)',
                                animation: 'lottieGlow 4s ease-in-out infinite',
                            }} />
                            {/* Mid glow ring */}
                            <div style={{
                                position: 'absolute',
                                width: 290,
                                height: 290,
                                borderRadius: '50%',
                                background: isDark
                                    ? 'radial-gradient(circle, rgba(139,92,246,0.42) 0%, rgba(168,85,247,0.16) 50%, transparent 70%)'
                                    : 'radial-gradient(circle, rgba(139,92,246,0.24) 0%, rgba(168,85,247,0.08) 50%, transparent 70%)',
                                filter: 'blur(18px)',
                                animation: 'lottieGlow 4s ease-in-out infinite 0.9s',
                            }} />
                            {/* Inner core sparkle */}
                            <div style={{
                                position: 'absolute',
                                width: 180,
                                height: 180,
                                borderRadius: '50%',
                                background: isDark
                                    ? 'radial-gradient(circle, rgba(196,181,253,0.28) 0%, transparent 60%)'
                                    : 'radial-gradient(circle, rgba(196,181,253,0.18) 0%, transparent 60%)',
                                filter: 'blur(10px)',
                                animation: 'lottieGlow 4s ease-in-out infinite 1.8s',
                            }} />
                            <Player
                                autoplay
                                loop
                                src={lottieAnimation}
                                style={{ height: 290, width: 290, position: 'relative', zIndex: 1 }}
                            />
                        </div>

                        {/* Headline */}
                        <div>
                            <h1 className={`text-[2.6rem] font-extrabold leading-tight mb-3 ${isDark ? 'text-white' : 'text-indigo-950'}`}>
                                Manage reviews<br />
                                <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                                    with intelligence.
                                </span>
                            </h1>
                            <p className={`text-sm leading-relaxed ${isDark ? 'text-indigo-200/65' : 'text-indigo-800/60'}`}>
                                AI-powered replies, real-time analytics, and multi-platform<br />
                                management — all in one beautiful dashboard.
                            </p>
                        </div>

                        {/* Feature list */}
                        <ul className="flex flex-col gap-2.5">
                            {FEATURES.map(({ icon: Icon, text }, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className={`
                                        w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                                        ${isDark ? 'bg-indigo-500/20' : 'bg-indigo-100'}
                                    `}>
                                        <Icon size={14} className={isDark ? 'text-indigo-300' : 'text-indigo-600'} />
                                    </div>
                                    <span className={`text-sm font-medium ${isDark ? 'text-indigo-100/80' : 'text-indigo-900/75'}`}>
                                        {text}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        {/* Floating stat cards */}
                        <div className="flex flex-col gap-2.5">
                            {STAT_CARDS.map((card, i) => (
                                <div
                                    key={i}
                                    style={{
                                        marginLeft: card.offset,
                                        animation: `floatCard 4s ease-in-out infinite ${card.delay}`,
                                    }}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-md
                                        ${isDark
                                            ? 'bg-white/[0.07] border-white/10'
                                            : 'bg-white/65 border-indigo-200/60 shadow-sm'}
                                    `}
                                >
                                    <div style={{ background: card.iconBg }} className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                                        {card.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-indigo-900'}`}>{card.label}</p>
                                        <p className={`text-[11px] ${isDark ? 'text-indigo-200/55' : 'text-indigo-700/60'}`}>{card.sub}</p>
                                    </div>
                                    <span style={{ color: card.valColor }} className="text-sm font-bold shrink-0">{card.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Trust line */}
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={13} className={isDark ? 'text-indigo-400' : 'text-indigo-500'} />
                            <p className={`text-xs ${isDark ? 'text-indigo-300/45' : 'text-indigo-700/50'}`}>
                                Trusted by 2,000+ businesses worldwide
                            </p>
                        </div>
                    </div>

                    {/* ════════════════════════════════
                        RIGHT — Login card
                    ════════════════════════════════ */}

                    {/* Gradient border wrapper */}
                    <div style={{
                        background: isDark
                            ? 'linear-gradient(145deg, rgba(99,102,241,0.55), rgba(139,92,246,0.45), rgba(168,85,247,0.55))'
                            : 'linear-gradient(145deg, rgba(99,102,241,0.4), rgba(139,92,246,0.28), rgba(168,85,247,0.4))',
                        padding: '1.5px',
                        borderRadius: '28px',
                        boxShadow: isDark
                            ? '0 30px 80px rgba(99,102,241,0.28), 0 0 0 1px rgba(255,255,255,0.03) inset'
                            : '0 30px 80px rgba(99,102,241,0.2), 0 0 0 1px rgba(255,255,255,0.7) inset',
                    }}>
                        <div
                            className="rounded-[26.5px] p-8 md:p-10 backdrop-blur-2xl"
                            style={{
                                background: isDark
                                    ? 'rgba(5, 5, 20, 0.88)'
                                    : 'rgba(255, 255, 255, 0.88)',
                            }}
                        >
                            {/* Mobile-only logo */}
                            <div className="flex items-center gap-2.5 mb-8 lg:hidden">
                                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-indigo-400/30">
                                    RP
                                </div>
                                <span className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-indigo-900'}`}>
                                    ReviewPilot
                                </span>
                            </div>

                            {/* Heading */}
                            <div className="mb-8">
                                <h2 className={`text-2xl font-bold mb-1.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Welcome back
                                </h2>
                                <p className={`text-sm ${isDark ? 'text-indigo-200/55' : 'text-gray-500'}`}>
                                    Sign in to manage your reviews
                                </p>
                            </div>

                            <GoogleAuthButton isDark={isDark} />

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-6">
                                <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                                <span className={`text-xs ${isDark ? 'text-white/28' : 'text-gray-400'}`}>secure sign-in</span>
                                <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-gray-200'}`} />
                            </div>

                            {/* Trust badges */}
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { icon: Shield, label: 'Secure' },
                                    { icon: Zap,    label: 'Instant' },
                                    { icon: Star,   label: 'Trusted' },
                                ].map(({ icon: Icon, label }) => (
                                    <div
                                        key={label}
                                        className={`
                                            flex flex-col items-center gap-1.5 py-3 rounded-xl border
                                            ${isDark
                                                ? 'bg-white/5 border-white/10'
                                                : 'bg-indigo-50/60 border-indigo-100'}
                                        `}
                                    >
                                        <Icon size={15} className={isDark ? 'text-indigo-300' : 'text-indigo-500'} />
                                        <span className={`text-[11px] font-medium ${isDark ? 'text-white/48' : 'text-indigo-700/70'}`}>
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Footer note */}
                            <p className={`text-center text-[11px] mt-6 leading-relaxed ${isDark ? 'text-white/22' : 'text-gray-400'}`}>
                                By continuing, you agree to our Terms of Service<br />and Privacy Policy.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                @keyframes floatCard {
                    0%, 100% { transform: translateY(0px); }
                    50%       { transform: translateY(-6px); }
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
