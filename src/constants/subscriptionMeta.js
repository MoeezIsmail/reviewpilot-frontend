import { Sparkles, Zap, Crown } from "lucide-react";

export const PLAN_META = {
    starter: {
        icon: Sparkles,
        gradient: "from-slate-400 to-slate-500",
        glow: "",
        badge: "Free Forever",
        badgeClass: "bg-slate-100 text-slate-500",
        btnClass: "bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-default",
        ringClass: "ring-slate-300",
        checkBg: "bg-slate-100",
        checkColor: "text-slate-500",
    },
    growth: {
        icon: Zap,
        gradient: "from-indigo-500 to-violet-500",
        glow: "shadow-indigo-200",
        badge: "Most Popular",
        badgeClass: "bg-indigo-100 text-indigo-600",
        btnClass: "bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-600 hover:to-violet-600 shadow-lg shadow-indigo-200",
        ringClass: "ring-indigo-400",
        checkBg: "bg-indigo-100",
        checkColor: "text-indigo-600",
    },
    pro: {
        icon: Crown,
        gradient: "from-violet-500 to-purple-600",
        glow: "shadow-violet-200",
        badge: "Best Value",
        badgeClass: "bg-violet-100 text-violet-600",
        btnClass: "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-violet-200",
        ringClass: "ring-violet-400",
        checkBg: "bg-violet-100",
        checkColor: "text-violet-600",
    },
};

export const GATEWAY_OPTIONS = [
    { value: "stripe", label: "Credit / Debit Card", sub: "Visa, Mastercard, Amex" },
];
