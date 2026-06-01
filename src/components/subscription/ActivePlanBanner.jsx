import { Zap, Crown, Gift, ExternalLink, Loader2, Clock } from "lucide-react";

const PLAN_ICONS = {
    starter: Gift,
    growth:  Zap,
    pro:     Crown,
};

const PLAN_COLORS = {
    starter: "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300",
    growth:  "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300",
    pro:     "bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-700 text-violet-700 dark:text-violet-300",
};

const PREV_PLAN_COLORS = {
    starter: "bg-gray-50 dark:bg-gray-800/60 border-gray-200 dark:border-gray-600",
    growth:  "bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-200/60 dark:border-indigo-800/50",
    pro:     "bg-violet-50/60 dark:bg-violet-950/30 border-violet-200/60 dark:border-violet-800/50",
};

const isExpiredDate = (subscription) => {
    if (!subscription?.expiresAt) return false;
    if (subscription.billingPeriod === "lifetime") return false;
    return new Date(subscription.expiresAt) < new Date();
};

const fmt = (date) =>
    new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const ActivePlanBanner = ({ plans, currentPlan, subscription, portalLoading, onManageBilling }) => {
    if (!currentPlan || !plans[currentPlan]) return null;

    const Icon        = PLAN_ICONS[currentPlan] || Zap;
    const plan        = plans[currentPlan];
    const expired     = isExpiredDate(subscription) || subscription?.status === "expired";
    const isExpiring  = subscription?.status === "expiring";
    const isLifetime  = subscription?.billingPeriod === "lifetime";
    const hasActivePaid = currentPlan !== "starter" && (subscription?.status === "active" || isExpiring) && !expired;

    const previousPlan = subscription?.previousPlan;
    const hasPrevPlan  = !!previousPlan?.expiresAt && new Date(previousPlan.expiresAt) > new Date();

    // ── Sub-label for the main plan row ──────────────────────────────────────
    let subLabel;
    if (currentPlan === "starter") {
        subLabel = "Free forever — upgrade to unlock AI features";
    } else if (isLifetime) {
        subLabel = "Lifetime access — no recurring charges";
    } else if (expired) {
        subLabel = "Subscription expired — renew to restore access";
    } else if (isExpiring && subscription?.expiresAt) {
        subLabel = `Cancels ${fmt(subscription.expiresAt)} — access continues until then`;
    } else if (subscription?.expiresAt) {
        subLabel = `Renews ${fmt(subscription.expiresAt)}`;
    } else {
        subLabel = "Active subscription";
    }

    return (
        <div className="space-y-2">
            {/* ── Primary plan row ─────────────────────────────────────────── */}
            <div className={`flex items-center justify-between border rounded-2xl px-5 py-4 ${PLAN_COLORS[currentPlan]}`}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-700 shadow-sm flex items-center justify-center">
                        <Icon size={18} className="text-current" />
                    </div>
                    <div>
                        <p className="font-semibold text-sm flex items-center gap-2 flex-wrap">
                            {plan.name} Plan
                            {isLifetime && (
                                <span className="text-xs bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full font-medium">
                                    Lifetime
                                </span>
                            )}
                            {expired && (
                                <span className="text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">
                                    Expired
                                </span>
                            )}
                            {!expired && isExpiring && (
                                <span className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full font-medium">
                                    Cancelling
                                </span>
                            )}
                            {!expired && !isExpiring && subscription?.status === "past_due" && (
                                <span className="text-xs bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">
                                    Payment Failed
                                </span>
                            )}
                        </p>
                        <p className="text-xs opacity-70 mt-0.5">{subLabel}</p>
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

            {/* ── Previous plan overlap row (shown after an upgrade) ────────── */}
            {hasPrevPlan && (
                <div className={`flex items-center gap-3 border rounded-xl px-4 py-2.5 ${PREV_PLAN_COLORS[previousPlan.plan] || PREV_PLAN_COLORS.starter}`}>
                    <Clock size={13} className="shrink-0 text-gray-400 dark:text-gray-500" />
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Your{" "}
                        <span className="font-semibold capitalize text-gray-600 dark:text-gray-300">
                            {previousPlan.plan} ({previousPlan.billingPeriod})
                        </span>{" "}
                        plan is still active and expires{" "}
                        <span className="font-semibold text-gray-600 dark:text-gray-300">
                            {fmt(previousPlan.expiresAt)}
                        </span>
                        . No further charges will be made for it.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ActivePlanBanner;
