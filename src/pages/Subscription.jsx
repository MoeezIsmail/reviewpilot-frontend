import useSubscription from "../hooks/useSubscription.js";
import PlanCard from "../components/subscription/PlanCard.jsx";
import ActivePlanBanner from "../components/subscription/ActivePlanBanner.jsx";
import GatewaySelector from "../components/subscription/GatewaySelector.jsx";
import CancelModal from "../components/subscription/CancelModal.jsx";
import SubscriptionSkeleton from "../components/skeletons/SubscriptionSkeleton.jsx";

const Subscription = () => {
    const {
        plans, currentPlan, subscription,
        gateway, setGateway,
        loadingPlan, portalLoading, pageLoading,
        cancelConfirm, setCancelConfirm, cancelLoading,
        handleUpgrade, handlePortal, handleCancel,
    } = useSubscription();

    if (pageLoading) return <SubscriptionSkeleton />;

    return (
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 md:p-8">
            <div className="max-w-5xl mx-auto space-y-10">
                <div className="flex flex-col gap-3">
                    <h1 className="text-xl font-semibold text-indigo-600 tracking-tight">
                        Choose the right plan for your business
                    </h1>
                    <p className="text-gray-400 text-sm">
                        Scale your reputation management with precision. Select the tier that matches your current growth stage.
                    </p>
                </div>

                <ActivePlanBanner
                    plans={plans}
                    currentPlan={currentPlan}
                    subscription={subscription}
                    portalLoading={portalLoading}
                    onManageBilling={handlePortal}
                />

                {currentPlan === "starter" && (
                    <GatewaySelector gateway={gateway} setGateway={setGateway} />
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 isolate">
                    {Object.entries(plans).map(([key, plan]) => (
                        <PlanCard
                            key={key}
                            planKey={key}
                            plan={plan}
                            currentPlan={currentPlan}
                            onUpgrade={handleUpgrade}
                            onCancel={() => setCancelConfirm(true)}
                            loadingPlan={loadingPlan}
                        />
                    ))}
                </div>

                <p className="text-center text-xs text-gray-400 pb-2">
                    Payments are processed securely. Cancel anytime from your billing portal.
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
