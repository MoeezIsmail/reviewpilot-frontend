import { Zap, RefreshCw } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import usePlanFeatures from "../../hooks/usePlanFeatures.js";

const AiUsageBar = () => {
    const { user } = useAuth();
    const { limits, plan } = usePlanFeatures();

    const aiUsed = user?.subscription?.aiRepliesUsed ?? 0;
    const aiLimit = limits?.aiRepliesPerMonth ?? 10;
    const isUnlimited = aiLimit === -1;
    const resetAt = user?.subscription?.aiRepliesResetAt;

    if (isUnlimited) {
        return (
            <div className="flex items-center justify-between border border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center">
                        <Zap size={18} className="text-indigo-500" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">AI Replies</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Unlimited — Pro plan</p>
                    </div>
                </div>
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">∞ unlimited</span>
            </div>
        );
    }

    const pct = Math.min(100, Math.round((aiUsed / aiLimit) * 100));
    const remaining = Math.max(0, aiLimit - aiUsed);
    const isLow = pct >= 80;
    const isCritical = pct >= 95;

    const barColor = isCritical ? "bg-rose-500" : isLow ? "bg-amber-500" : "bg-indigo-500";
    const textColor = isCritical ? "text-rose-600 dark:text-rose-400" : isLow ? "text-amber-600 dark:text-amber-400" : "text-indigo-600 dark:text-indigo-400";

    const resetDate = resetAt
        ? new Date(resetAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : null;

    return (
        <div className="border border-gray-100 dark:border-gray-700 rounded-2xl px-5 py-4 bg-white dark:bg-gray-800">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Zap size={15} className={textColor} />
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">AI Replies This Month</p>
                </div>
                <span className={`text-sm font-bold ${textColor}`}>
                    {aiUsed} / {aiLimit}
                </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div
                    className={`${barColor} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${pct}%` }}
                />
            </div>

            <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {remaining} replies remaining
                    {isCritical && (
                        <span className="ml-1 text-rose-500 font-medium">— upgrade for more</span>
                    )}
                </p>
                {resetDate && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                        <RefreshCw size={10} />
                        Resets monthly
                    </p>
                )}
            </div>
        </div>
    );
};

export default AiUsageBar;
