import { Zap, Crown, Gift, ExternalLink, Loader2 } from "lucide-react";

const PLAN_ICONS = {
    starter: Gift,
    growth: Zap,
    pro: Crown,
};

const PLAN_COLORS = {
    starter: "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300",
    growth: "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300",
    pro: "bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-700 text-violet-700 dark:text-violet-300",
};

const isExpired = (subscription) => {
    if (!subscription?.expiresAt) return false;
    if (subscription.billingPeriod === "lifetime") return false;
    return new Date(subscription.expiresAt) < new Date();
};

const ActivePlanBanner = ({ plans, currentPlan, subscription, portalLoading, onManageBilling }) => {
    if (!currentPlan || !plans[currentPlan]) return null;

    const Icon = PLAN_ICONS[currentPlan] || Zap;
    const plan = plans[currentPlan];
    const expired = isExpired(subscription) || subscription?.status === "expired";
    const hasActivePaid = currentPlan !== "starter" && subscription?.status === "active" && !expired;
    const isLifetime = subscription?.billingPeriod === "lifetime";

    return (
        <div className={`flex items-center justify-between border rounded-2xl px-5 py-4 ${PLAN_COLORS[currentPlan]}`}>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center">
                    <Icon size={18} className="text-current" />
                </div>
                <div>
                    <p className="font-semibold text-sm">
                        {plan.name} Plan
                        {isLifetime && (
                            <span className="ml-2 text-xs bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full font-medium">
                                Lifetime
                            </span>
                        )}
                        {expired && (
                            <span className="ml-2 text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">
                                Expired
                            </span>
                        )}
                        {!expired && subscription?.status === "past_due" && (
                            <span className="ml-2 text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">
                                Payment Failed
                            </span>
                        )}
                    </p>
                    <p className="text-xs opacity-70 mt-0.5">
                        {currentPlan === "starter"
                            ? "Free forever — upgrade to unlock AI features"
                            : isLifetime
                                ? "Lifetime access — no recurring charges"
                                : expired
                                    ? "Subscription expired — renew to restore access"
                                    : subscription?.expiresAt
                                        ? `Renews ${new Date(subscription.expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                                        : "Active subscription"
                        }
                    </p>
                </div>
            </div>

            {hasActivePaid && !isLifetime && (
                <button
                    onClick={onManageBilling}
                    disabled={portalLoading}
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-all disabled:opacity-50 text-gray-700 dark:text-gray-200"
                >
                    {portalLoading
                        ? <Loader2 size={12} className="animate-spin" />
                        : <ExternalLink size={12} />
                    }
                    Manage Billing
                </button>
            )}
        </div>
    );
};

export default ActivePlanBanner;
