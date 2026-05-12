import { CreditCard, ExternalLink, Loader2 } from "lucide-react";

const ActivePlanBanner = ({ plans, currentPlan, subscription, portalLoading, onManageBilling }) => {
    if (!subscription || currentPlan === "starter") return null;

    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 rounded-4xl p-5 text-white shadow-xl shadow-indigo-200">
            <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
            />
            <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <CreditCard size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-lg leading-tight">
                            {plans[currentPlan]?.name} Plan
                            {subscription.activeGateway && (
                                <span className="ml-2 text-xs font-normal text-white/60 capitalize">
                                    via {subscription.activeGateway}
                                </span>
                            )}
                        </p>
                        {subscription.expiresAt && (
                            <p className="text-white/70 text-xs mt-0.5">
                                Renews {new Date(subscription.expiresAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                            </p>
                        )}
                    </div>
                </div>
                {subscription.activeGateway === "stripe" && (
                    <button
                        onClick={onManageBilling}
                        disabled={portalLoading}
                        className="flex items-center gap-1.5 text-sm font-semibold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition backdrop-blur-sm disabled:opacity-60 shrink-0"
                    >
                        {portalLoading ? <Loader2 size={14} className="animate-spin" /> : <ExternalLink size={14} />}
                        Manage Billing
                    </button>
                )}
            </div>
        </div>
    );
};

export default ActivePlanBanner;
