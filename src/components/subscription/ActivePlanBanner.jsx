import { Zap, Crown, Gift, ExternalLink, Loader2 } from "lucide-react";

const PLAN_ICONS = {
    starter: Gift,
    growth: Zap,
    pro: Crown,
};

const PLAN_COLORS = {
    starter: "bg-gray-50 border-gray-200 text-gray-600",
    growth: "bg-indigo-50 border-indigo-200 text-indigo-700",
    pro: "bg-violet-50 border-violet-200 text-violet-700",
};

const ActivePlanBanner = ({ plans, currentPlan, subscription, portalLoading, onManageBilling }) => {
    if (!currentPlan || !plans[currentPlan]) return null;

    const Icon = PLAN_ICONS[currentPlan] || Zap;
    const plan = plans[currentPlan];
    const hasActivePaid = currentPlan !== "starter" && subscription?.status === "active";
    const isLifetime = subscription?.billingPeriod === "lifetime";

    return (
        <div className={`flex items-center justify-between border rounded-2xl px-5 py-4 ${PLAN_COLORS[currentPlan]}`}>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <Icon size={18} className="text-current" />
                </div>
                <div>
                    <p className="font-semibold text-sm">
                        {plan.name} Plan
                        {isLifetime && (
                            <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">
                                Lifetime
                            </span>
                        )}
                        {subscription?.status === "past_due" && (
                            <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                                Payment Failed
                            </span>
                        )}
                    </p>
                    <p className="text-xs opacity-70 mt-0.5">
                        {currentPlan === "starter"
                            ? "Free forever — upgrade to unlock AI features"
                            : isLifetime
                                ? "Lifetime access — no recurring charges"
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
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl bg-white shadow-sm hover:shadow-md transition-all disabled:opacity-50"
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