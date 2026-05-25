import { Sparkles, Zap, Crown } from "lucide-react";

// Fallback only — real value comes from backend getPlans response
export const LIFETIME_SPOTS_LEFT = 47;

// Plan & period ranks for upgrade/downgrade detection (mirrors backend combinedRank logic)
export const PLAN_RANK   = { starter: 0, growth: 1, pro: 2 };
export const PERIOD_RANK = { monthly: 0, yearly: 1, lifetime: 2 };

// Display labels for plan feature lists (UI only — capability limits live on backend)
export const PLAN_FEATURES = {
    starter: [
        { label: "Unlimited review syncing", included: true  },
        { label: "10 AI replies / month",    included: true  },
        { label: "Bulk AI Generate",         included: false },
        { label: "Bulk Posting",             included: false },
        { label: "Analytics",                included: false },
    ],
    growth: [
        { label: "Unlimited review syncing", included: true },
        { label: "200 AI replies / month",   included: true },
        { label: "Bulk AI Generate",         included: true },
        { label: "Bulk Posting",             included: true },
        { label: "Analytics dashboard",      included: true },
    ],
    pro: [
        { label: "Unlimited review syncing", included: true },
        { label: "Unlimited AI replies",     included: true },
        { label: "Bulk AI Generate",         included: true },
        { label: "Bulk Posting",             included: true },
        { label: "Advanced Analytics",       included: true },
        { label: "Priority support",         included: true },
    ],
};

export const PLAN_META = {
    starter: {
        icon: Sparkles,
        gradient: "from-slate-400 to-slate-500",
        glow: "",
        description: "Perfect for getting started",
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
        description: "For growing businesses",
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
        description: "For scaling operations",
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
