import { Sparkles } from "lucide-react";
import useSubscription from "../hooks/useSubscription.js";
import PlanCard from "../components/subscription/PlanCard.jsx";
import ActivePlanBanner from "../components/subscription/ActivePlanBanner.jsx";
import GatewaySelector from "../components/subscription/GatewaySelector.jsx";
import BillingToggle from "../components/subscription/BillingToggle.jsx";
import CancelModal from "../components/subscription/CancelModal.jsx";
import SubscriptionSkeleton from "../components/skeletons/SubscriptionSkeleton.jsx";

const Subscription = () => {
    const {
        plans, currentPlan, subscription,
        gateway, setGateway,
        billingPeriod, setBillingPeriod,
        loadingPlan, portalLoading, pageLoading,
        cancelConfirm, setCancelConfirm, cancelLoading,
        handleUpgrade, handlePortal, handleCancel,
    } = useSubscription();

    if (pageLoading) return <SubscriptionSkeleton />;

    return (
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Promo Banner */}
                <div className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl px-5 py-3 text-sm">
                    <Sparkles size={15} className="text-indigo-500 shrink-0" />
                    <span className="text-gray-600">
                        <span className="font-semibold text-indigo-600">Limited time —</span>{" "}
                        Save 20% with yearly billing, or grab lifetime access before spots run out.
                    </span>
                </div>

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Simple, transparent pricing
                    </h1>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">
                        All plans include unlimited review syncing. Only pay for AI replies and automation.
                    </p>
                </div>

                {/* Billing Toggle */}
                <BillingToggle billingPeriod={billingPeriod} setBillingPeriod={setBillingPeriod} />

                {/* Active Plan Banner */}
                <ActivePlanBanner
                    plans={plans}
                    currentPlan={currentPlan}
                    subscription={subscription}
                    portalLoading={portalLoading}
                    onManageBilling={handlePortal}
                />

                {/* Gateway Selector */}
                {currentPlan === "starter" && (
                    <GatewaySelector gateway={gateway} setGateway={setGateway} />
                )}

                {/* Plan Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 isolate">
                    {Object.entries(plans).map(([key, plan]) => (
                        <PlanCard
                            key={key}
                            planKey={key}
                            plan={plan}
                            currentPlan={currentPlan}
                            billingPeriod={billingPeriod}
                            onUpgrade={handleUpgrade}
                            onCancel={() => setCancelConfirm(true)}
                            loadingPlan={loadingPlan}
                        />
                    ))}
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-400 pb-2">
                    Payments processed securely via Stripe. Cancel anytime — no questions asked.
                </p>

            </div>

            {cancelConfirm && (
                <CancelModal
                    onConfirm={handleCancel}
                    onClose={() => setCancelConfirm(false)}
                    loading={cancelLoading}
                />
            )}
        </div>
    );
};

export default Subscription;
