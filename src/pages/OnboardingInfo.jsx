import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/toast/ToastProvider.jsx";
import { saveBusinessInfo } from "../api/authApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import { ArrowRight, Sun, Moon } from 'lucide-react';
import InputField from "../components/ui/InputField.jsx";
import AuthBackground from "../components/auth/AuthBackground.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

const BUSINESS_TYPES = [
    { label: "Restaurant", icon: "🍕" },
    { label: "Hotel",       icon: "🏨" },
    { label: "Cafe",        icon: "☕" },
    { label: "Bakery",      icon: "🥐" },
    { label: "Gym",         icon: "💪" },
    { label: "Salon",       icon: "✂️" },
    { label: "Clinic",      icon: "🏥" },
    { label: "Retail Store",icon: "🛍️" },
    { label: "Auto Service",icon: "🔧" },
    { label: "Other",       icon: "➕" },
];

export default function OnboardingInfo() {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const { updateUser } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    const isGoogleUser = localStorage.getItem("isGoogleUser") === "true";

    const [userName, setUserName] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessType, setBusinessType] = useState("");
    const [customBusinessType, setCustomBusinessType] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!isGoogleUser && !userName.trim()) errs.userName = "Name is required";
        if (!businessName.trim()) errs.businessName = "Business name is required";
        if (!businessType) errs.businessType = "Please select a business type";
        if (businessType === "Other" && !customBusinessType.trim()) errs.customBusinessType = "Please specify your business type";
        return errs;
    };

    const handleSubmit = async () => {
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setLoading(true);
        const finalType = businessType === "Other" ? customBusinessType : businessType;
        try {
            await saveBusinessInfo({
                userName: isGoogleUser ? null : userName,
                businessName,
                businessType: finalType,
            });
            updateUser({ businessName, businessType: finalType, onboardingCompleted: true });
            addToast("Setup complete!", "success");
            navigate("/");
        } catch (err) {
            addToast(err.response?.data?.message || "Failed to save info", "error");
        } finally {
            setLoading(false);
        }
    };

    const canSubmit = !loading
        && (isGoogleUser || userName.trim())
        && businessName.trim()
        && businessType
        && (businessType !== "Other" || customBusinessType.trim());

    return (
        <div className="relative" style={{ height: '100dvh', overflow: 'hidden' }}>
            <AuthBackground isDark={isDark} />

            {/* Theme toggle */}
            <button
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
            >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Scrollable content */}
            <div className="relative z-10 h-full overflow-y-auto">
                <div className="min-h-full flex items-center justify-center px-4 py-10">

                    {/* Glass card */}
                    <div
                        className="w-full max-w-[460px]"
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
                    >
                        <div
                            className="relative rounded-[20.5px] p-7 backdrop-blur-2xl overflow-hidden"
                            style={{
                                background: isDark ? 'rgba(6, 6, 22, 0.88)' : 'rgba(255, 255, 255, 0.92)',
                            }}
                        >
                            {/* Logo */}
                            <div className="flex items-center gap-2.5 mb-7">
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg bg-indigo-600 ${isDark ? 'shadow-indigo-900/50' : 'shadow-indigo-300/60'}`}>
                                    RP
                                </div>
                                <span className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-indigo-900'}`}>
                                    ReviewPilot
                                </span>
                            </div>

                            {/* Step indicator */}
                            <div className="flex items-center mb-7">
                                <div className="flex items-center gap-2 shrink-0">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold bg-emerald-500 text-white">
                                        ✓
                                    </div>
                                    <span className={`text-xs font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                                        Connect Platform
                                    </span>
                                </div>

                                <div className={`flex-1 h-px mx-3 ${isDark ? 'bg-indigo-400/25' : 'bg-indigo-200'}`} />

                                <div className="flex items-center gap-2 shrink-0">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold bg-indigo-500 text-white">
                                        2
                                    </div>
                                    <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-indigo-700'}`}>
                                        Business Info
                                    </span>
                                </div>
                            </div>

                            {/* Heading */}
                            <div className="mb-5">
                                <h2 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Tell us about your business
                                </h2>
                                <p className={`text-sm ${isDark ? 'text-indigo-200/50' : 'text-gray-500'}`}>
                                    This helps us generate better AI replies for your reviews
                                </p>
                            </div>

                            {/* Form fields */}
                            <div className="space-y-4 mb-5">
                                {!isGoogleUser && (
                                    <InputField
                                        label="Your Name"
                                        placeholder="e.g. John Doe"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        error={errors.userName}
                                    />
                                )}

                                <InputField
                                    label="Business Name"
                                    placeholder="e.g. Pizza House"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    error={errors.businessName}
                                />
                            </div>

                            {/* Business type grid */}
                            <div className="mb-5">
                                <label className={`text-sm font-medium mb-3 block ${isDark ? 'text-indigo-200/70' : 'text-gray-700'}`}>
                                    Business Type
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {BUSINESS_TYPES.map(({ label, icon }) => {
                                        const isSelected = businessType === label;
                                        return (
                                            <button
                                                key={label}
                                                type="button"
                                                onClick={() => {
                                                    setBusinessType(label);
                                                    if (label !== "Other") setCustomBusinessType("");
                                                }}
                                                className={`
                                                    flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border
                                                    text-left transition-all duration-150
                                                    ${isSelected
                                                        ? isDark
                                                            ? 'bg-indigo-500/20 border-indigo-400/50 text-white'
                                                            : 'bg-indigo-50 border-indigo-400 text-indigo-700'
                                                        : isDark
                                                            ? 'bg-white/[0.04] border-white/[0.08] text-white/65 hover:border-indigo-400/30 hover:bg-white/[0.07]'
                                                            : 'bg-white/60 border-gray-200 text-gray-600 hover:border-indigo-200 hover:bg-white'}
                                                `}
                                            >
                                                <span className="text-base leading-none">{icon}</span>
                                                <span className="text-sm font-medium">{label}</span>
                                                {isSelected && (
                                                    <span className="ml-auto">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                            <circle cx="7" cy="7" r="7" fill={isDark ? 'rgba(99,102,241,0.6)' : '#6366f1'} />
                                                            <polyline points="4,7 6,9 10,5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                                {errors.businessType && (
                                    <p className="text-red-400 text-xs mt-2">{errors.businessType}</p>
                                )}
                            </div>

                            {/* Custom type input */}
                            {businessType === "Other" && (
                                <div className="mb-5">
                                    <InputField
                                        label="Specify business type"
                                        placeholder="e.g. Photography Studio"
                                        value={customBusinessType}
                                        onChange={(e) => setCustomBusinessType(e.target.value)}
                                        error={errors.customBusinessType}
                                    />
                                </div>
                            )}

                            {/* Submit button */}
                            <button
                                disabled={!canSubmit}
                                onClick={handleSubmit}
                                className={`
                                    w-full py-3.5 rounded-2xl text-sm font-semibold
                                    flex items-center justify-center gap-2 transition-all duration-200
                                    ${canSubmit
                                        ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-600 hover:to-violet-600 shadow-lg shadow-indigo-500/25 cursor-pointer'
                                        : isDark
                                            ? 'bg-white/[0.06] text-white/25 cursor-not-allowed border border-white/[0.07]'
                                            : 'bg-gray-100 text-gray-300 cursor-not-allowed border border-gray-200'}
                                `}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/>
                                            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                                        </svg>
                                        Saving…
                                    </span>
                                ) : (
                                    <>Complete Setup <ArrowRight size={15} /></>
                                )}
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
