import { useEffect, useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useToast } from "../components/toast/ToastProvider.jsx";
import GoogleAuthButton from "../components/auth/GoogleAuthButton.jsx";
import OtpInput from "../components/auth/OtpInput.jsx";
import useOtpForm from "../hooks/useOtpForm.js";
import InputField from "../components/ui/InputField.jsx";
import Button from "../components/ui/Button.jsx";
import { ArrowLeft } from 'lucide-react';
import lottieAnimation from "../assets/d13a020f-5569-49bd-87bc-f2d9cd2ed8f5.json";

/* ─────────────────────────────────────────
   Stat cards data
───────────────────────────────────────── */
const STAT_CARDS = [
    {
        delay: '0s',
        offset: 0,
        iconColor: '#4ade80',
        iconBg: 'rgba(74,222,128,0.18)',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
            </svg>
        ),
        title: 'Rating Improved',
        sub: '+1.4 stars this month',
        val: '4.8★',
        valColor: '#4ade80',
    },
    {
        delay: '0.5s',
        offset: 22,
        iconColor: '#60a5fa',
        iconBg: 'rgba(96,165,250,0.18)',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
        ),
        title: 'AI Reply Sent',
        sub: 'Response time: 2 min',
        val: 'Auto',
        valColor: '#60a5fa',
    },
    {
        delay: '1s',
        offset: 0,
        iconColor: '#c084fc',
        iconBg: 'rgba(192,132,252,0.18)',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
        title: 'New Reviews',
        sub: "Today's activity",
        val: '+24',
        valColor: '#c084fc',
    },
];

/* ─────────────────────────────────────────
   Main Auth Component
───────────────────────────────────────── */
const Auth = () => {
    const { addToast } = useToast();
    const canvasRef = useRef(null);

    const {
        step, email, setEmail,
        otp, loading, errors,
        handleSendOTP,
        handleOtpChange,
        handleOtpKeyDown,
        handleVerifyOTP,
        resetOtp,
    } = useOtpForm(addToast);

    /* Particle canvas */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let raf;

        const pts = Array.from({ length: 40 }, () => ({
            x: Math.random() * canvas.offsetWidth,
            y: Math.random() * canvas.offsetHeight,
            dx: (Math.random() - 0.5) * 0.38,
            dy: (Math.random() - 0.5) * 0.38,
            r: Math.random() * 1.6 + 0.4,
            a: Math.random() * 0.38 + 0.13,
        }));

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pts.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(165,180,252,${p.a})`;
                ctx.fill();
                p.x += p.dx; p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });
            pts.forEach((p, i) => pts.slice(i + 1).forEach(q => {
                const d = Math.hypot(p.x - q.x, p.y - q.y);
                if (d < 78) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(165,180,252,${0.11 * (1 - d / 78)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }));
            raf = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

            {/* ══════════ LEFT PANEL ══════════ */}
            <div
                className="hidden md:flex relative overflow-hidden flex-col justify-center items-center p-8"
                style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 42%, #4338ca 100%)' }}
            >
                {/* Particle canvas */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

                {/* Glowing orbs */}
                {[
                    { w: 300, h: 300, bg: 'rgba(99,102,241,0.32)', top: '-80px', left: '-80px', dur: '8s' },
                    { w: 200, h: 200, bg: 'rgba(139,92,246,0.26)', bottom: '40px', right: '-55px', dur: '10s', dir: 'reverse' },
                    { w: 130, h: 130, bg: 'rgba(59,130,246,0.2)', bottom: '180px', right: '25px', dur: '7s', delay: '2s' },
                ].map((o, i) => (
                    <div key={i} style={{
                        position: 'absolute',
                        width: o.w, height: o.h,
                        background: o.bg,
                        borderRadius: '50%',
                        filter: 'blur(55px)',
                        pointerEvents: 'none',
                        top: o.top, left: o.left,
                        bottom: o.bottom, right: o.right,
                        animation: `orbFloat ${o.dur} ease-in-out infinite ${o.delay || '0s'}`,
                        animationDirection: o.dir || 'normal',
                    }} />
                ))}

                {/* Inner content */}
                <div className="relative z-10 w-full max-w-[260px] flex flex-col items-center gap-4">

                    <div style={{
                        width: 200,
                        filter: 'drop-shadow(0 10px 30px rgba(99,102,241,0.5))',
                    }}>
                        <Player
                            autoplay
                            loop
                            src={lottieAnimation}
                            style={{ height: 200, width: 200 }}
                        />
                    </div>

                    {/* Brand */}
                    <div className="text-center -mt-2">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <div style={{
                                width: 34, height: 34,
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: 10,
                                border: '1px solid rgba(255,255,255,0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7">
                                    <path d="M9 11l3 3L22 4" />
                                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                                </svg>
                            </div>
                            <span style={{ color: 'white', fontSize: 20, fontWeight: 700, letterSpacing: '-0.4px' }}>
                                ReviewPilot
                            </span>
                        </div>
                        <p style={{ color: 'rgba(199,210,254,0.7)', fontSize: 12 }}>
                            Intelligent review management
                        </p>
                    </div>

                    {/* Stat cards */}
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {STAT_CARDS.map((card, i) => (
                            <div key={i} style={{
                                marginLeft: card.offset,
                                background: 'rgba(255,255,255,0.07)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255,255,255,0.11)',
                                borderRadius: 13,
                                padding: '10px 12px',
                                display: 'flex', alignItems: 'center', gap: 10,
                                animation: `floatCard 4s ease-in-out infinite ${card.delay}`,
                            }}>
                                <div style={{
                                    width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                                    background: card.iconBg,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {card.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ color: 'white', fontSize: 12, fontWeight: 600, margin: 0 }}>{card.title}</p>
                                    <p style={{ color: 'rgba(199,210,254,0.68)', fontSize: 11, margin: 0 }}>{card.sub}</p>
                                </div>
                                <span style={{ color: card.valColor, fontWeight: 700, fontSize: 13 }}>
                                    {card.val}
                                </span>
                            </div>
                        ))}
                    </div>

                    <p style={{ color: 'rgba(165,180,252,0.42)', fontSize: 11, textAlign: 'center' }}>
                        Trusted by 2,000+ businesses worldwide
                    </p>
                </div>

                <style>{`
                    @keyframes orbFloat {
                        0%, 100% { transform: translateY(0px) scale(1); }
                        50%       { transform: translateY(-18px) scale(1.04); }
                    }
                    @keyframes floatCard {
                        0%, 100% { transform: translateY(0px); }
                        50%       { transform: translateY(-5px); }
                    }
                `}</style>
            </div>

            {/* ══════════ RIGHT PANEL ══════════ */}
            <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 col-span-1">
                <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-lg w-full max-w-[400px] mx-4">

                    {step === "auth" && (
                        <>
                            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">
                                Welcome to ReviewPilot
                            </h2>
                            <GoogleAuthButton />
                        </>
                    )}

                    {/*{step === "otp" && (*/}
                    {/*    <>*/}
                    {/*        <Button variant="gray" size="lg" fullWidth loading={loading} onClick={resetOtp}>*/}
                    {/*            <ArrowLeft /> Back*/}
                    {/*        </Button>*/}
                    {/*        <h2 className="text-2xl font-bold text-black mb-2">Check your email</h2>*/}
                    {/*        <p className="text-gray-500 text-sm mb-6">*/}
                    {/*            We sent a 6-digit OTP to{" "}*/}
                    {/*            <span className="text-indigo-600 font-medium">{email}</span>*/}
                    {/*        </p>*/}
                    {/*        <OtpInput otp={otp} onChange={handleOtpChange} onKeyDown={handleOtpKeyDown} error={errors.otp} />*/}
                    {/*        <Button variant="primary" size="lg" fullWidth loading={loading} onClick={handleVerifyOTP}>*/}
                    {/*            {loading ? "Verifying..." : "Verify OTP"}*/}
                    {/*        </Button>*/}
                    {/*        <p className="text-sm text-center text-gray-500 mt-4">*/}
                    {/*            Didn't receive it?{" "}*/}
                    {/*            <button onClick={handleSendOTP} className="text-indigo-600 hover:underline">Resend OTP</button>*/}
                    {/*        </p>*/}
                    {/*    </>*/}
                    {/*)}*/}

                </div>
            </div>
        </div>
    );
};

export default Auth;