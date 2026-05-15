import { useToast } from "../components/toast/ToastProvider.jsx";
import GoogleAuthButton from "../components/auth/GoogleAuthButton.jsx";
import OtpInput from "../components/auth/OtpInput.jsx";
import useOtpForm from "../hooks/useOtpForm.js";
import InputField from "../components/ui/InputField.jsx";
import Button from "../components/ui/Button.jsx";
import { ArrowLeft } from 'lucide-react';
import { useEffect, useRef } from 'react';

/* ── Floating 3D Card Component ── */
const FloatingCard = ({ delay = 0, children, className = "" }) => (
    <div
        className={`floating-card ${className}`}
        style={{ animationDelay: `${delay}s` }}
    >
        {children}
    </div>
);

/* ── Animated Left Panel ── */
const LeftPanel = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animFrame;
        let particles = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Create particles
        for (let i = 0; i < 40; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2 + 0.5,
                dx: (Math.random() - 0.5) * 0.4,
                dy: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.5 + 0.2,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(165,180,252,${p.alpha})`;
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });
            // Draw connecting lines
            particles.forEach((p, i) => {
                particles.slice(i + 1).forEach(q => {
                    const dist = Math.hypot(p.x - q.x, p.y - q.y);
                    if (dist < 80) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.strokeStyle = `rgba(165,180,252,${0.15 * (1 - dist / 80)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            animFrame = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animFrame);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="hidden md:flex relative overflow-hidden flex-col justify-center items-center p-10"
             style={{
                 background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%)',
             }}>

            {/* Particle canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* Glowing orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-sm">

                {/* Logo */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="logo-icon">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M6 8h20v16a4 4 0 01-4 4H10a4 4 0 01-4-4V8z" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5"/>
                                <path d="M3 8h26" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M12 4h8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                <path d="M11 14h10M11 18h7" stroke="rgba(165,180,252,1)" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <span className="text-white text-2xl font-bold tracking-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                            ReviewPilot
                        </span>
                    </div>
                    <p className="text-indigo-200 text-sm">Intelligent Review Management</p>
                </div>

                {/* 3D Floating Cards */}
                <div className="space-y-4">

                    <FloatingCard delay={0} className="glass-card">
                        <div className="flex items-center gap-3">
                            <div className="stat-icon bg-green-500/20">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
                                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                                    <polyline points="16 7 22 7 22 13"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">Rating Improved</p>
                                <p className="text-indigo-300 text-xs">+1.4 stars this month</p>
                            </div>
                            <div className="ml-auto">
                                <span className="text-green-400 font-bold text-lg">4.8★</span>
                            </div>
                        </div>
                    </FloatingCard>

                    <FloatingCard delay={0.4} className="glass-card" style={{ marginLeft: '24px' }}>
                        <div className="flex items-center gap-3">
                            <div className="stat-icon bg-blue-500/20">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">AI Reply Sent</p>
                                <p className="text-indigo-300 text-xs">Response time: 2 min</p>
                            </div>
                            <div className="ml-auto">
                                <span className="text-blue-400 text-xs font-medium px-2 py-1 rounded-full"
                                      style={{ background: 'rgba(96,165,250,0.15)' }}>Auto</span>
                            </div>
                        </div>
                    </FloatingCard>

                    <FloatingCard delay={0.8} className="glass-card">
                        <div className="flex items-center gap-3">
                            <div className="stat-icon bg-purple-500/20">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="2">
                                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                                    <circle cx="9" cy="7" r="4"/>
                                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                                </svg>
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">New Reviews</p>
                                <p className="text-indigo-300 text-xs">Today's activity</p>
                            </div>
                            <div className="ml-auto">
                                <span className="text-purple-400 font-bold text-lg">+24</span>
                            </div>
                        </div>
                    </FloatingCard>

                </div>

                {/* Bottom label */}
                <p className="text-center text-indigo-300/60 text-xs mt-10">
                    Trusted by 2,000+ businesses worldwide
                </p>

            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&display=swap');

                .orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    pointer-events: none;
                }
                .orb-1 {
                    width: 300px; height: 300px;
                    background: rgba(99,102,241,0.35);
                    top: -80px; right: -80px;
                    animation: orbFloat 8s ease-in-out infinite;
                }
                .orb-2 {
                    width: 200px; height: 200px;
                    background: rgba(139,92,246,0.25);
                    bottom: 60px; left: -60px;
                    animation: orbFloat 10s ease-in-out infinite reverse;
                }
                .orb-3 {
                    width: 150px; height: 150px;
                    background: rgba(59,130,246,0.2);
                    bottom: 200px; right: 40px;
                    animation: orbFloat 7s ease-in-out infinite 2s;
                }

                @keyframes orbFloat {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-20px) scale(1.05); }
                }

                .glass-card {
                    background: rgba(255,255,255,0.07);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255,255,255,0.12);
                    border-radius: 16px;
                    padding: 16px;
                    animation: floatCard 4s ease-in-out infinite;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .glass-card:hover {
                    transform: translateY(-4px) !important;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                    border-color: rgba(165,180,252,0.3);
                }
                @keyframes floatCard {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                }

                .stat-icon {
                    width: 36px; height: 36px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .logo-icon {
                    width: 48px; height: 48px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgba(255,255,255,0.2);
                }
            `}</style>
        </div>
    );
};

/* ── Main Auth Component ── */
const Auth = () => {
    const { addToast } = useToast();
    const {
        step, email, setEmail,
        otp, loading, errors,
        handleSendOTP,
        handleOtpChange,
        handleOtpKeyDown,
        handleVerifyOTP,
        resetOtp,
    } = useOtpForm(addToast);

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

            {/* Left Panel — 3D Animated */}
            <LeftPanel />

            {/* Right Panel */}
            <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 col-span-1">
                <div className="bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-lg w-full max-w-[400px] mx-4">

                    {step === "auth" && (
                        <>
                            <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Welcome to ReviewPilot</h2>
                            <GoogleAuthButton />
                        </>
                    )}

                    {/*{step === "otp" && (*/}
                    {/*    <>*/}
                    {/*        <Button variant="gray" size="lg" fullWidth loading={loading} onClick={resetOtp}>*/}
                    {/*            <ArrowLeft/> Back*/}
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
