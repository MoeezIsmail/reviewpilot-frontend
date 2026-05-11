import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, Zap, Crown, Sparkles, CreditCard, ExternalLink, X } from "lucide-react";
import { fetchCurrentPlan, fetchPlans, createCheckoutSession, createPortalSession, cancelPlan } from "../api/subscriptionApi.js";
import { useToast } from "../components/toast/ToastProvider.jsx";

const PLAN_META = {
    starter: { icon: Sparkles, color: "gray", badge: "Free" },
    growth: { icon: Zap, color: "indigo", badge: "Popular" },
    pro: { icon: Crown, color: "violet", badge: "Best Value" },
};

const GATEWAY_OPTIONS = [
    { value: "stripe", label: "Credit / Debit Card", sub: "Visa, Mastercard, Amex" },
    { value: "paypal", label: "PayPal", sub: "Coming soon", disabled: true },
];

const FeatureRow = ({ label, value }) => (
    <li className="flex items-center gap-2 text-sm text-gray-600">
        <Check size={14} className="text-indigo-500 shrink-0" />
        <span>
            {typeof value === "boolean"
                ? label
                : value === -1
                    ? `Unlimited ${label}`
                    : `${value} ${label}`}
        </span>
    </li>
);

const PlanCard = ({ planKey, plan, currentPlan, gateway, onUpgrade, onCancel, loading }) => {
    const isActive = currentPlan === planKey;
    const isStarter = planKey === "starter";
    const { icon: Icon, color, badge } = PLAN_META[planKey];

    const colorMap = {
        gray: { ring: "ring-gray-200", bg: "bg-gray-50", btn: "bg-gray-100 text-gray-600 hover:bg-gray-200", badge: "bg-gray-100 text-gray-600", icon: "text-gray-500 bg-gray-100" },
        indigo: { ring: "ring-indigo-400", bg: "bg-indigo-50", btn: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200", badge: "bg-indigo-100 text-indigo-600", icon: "text-indigo-600 bg-indigo-100" },
        violet: { ring: "ring-violet-400", bg: "bg-violet-50", btn: "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-200", badge: "bg-violet-100 text-violet-600", icon: "text-violet-600 bg-violet-100" },
    };
    const c = colorMap[color];

    return (
        <div className={`
            relative flex flex-col bg-white rounded-2xl p-6 border-2 transition-all duration-300
            ${isActive ? `${c.ring} ring-2 shadow-xl` : "border-gray-200 hover:border-gray-300 hover:shadow-md"}
        `}>
            {isActive && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                        Current Plan
                    </span>
                </div>
            )}

            <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.icon}`}>
                    <Icon size={20} />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.badge}`}>
                    {badge}
                </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
            <div className="mt-1 mb-4">
                {plan.price === 0 ? (
                    <span className="text-3xl font-bold text-gray-900">Free</span>
                ) : (
                    <>
                        <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-gray-400 text-sm">/month</span>
                    </>
                )}
            </div>

            <ul className="space-y-2 mb-6 flex-1">
                <FeatureRow label="platforms" value={plan.features.platforms} />
                <FeatureRow label="reviews/month" value={plan.features.reviewsPerMonth} />
                <FeatureRow label="AI replies/month" value={plan.features.aiRepliesPerMonth} />
                {plan.features.bulkGenerate && <FeatureRow label="Bulk AI Generate" value={true} />}
                {plan.features.analytics && <FeatureRow label="Advanced Analytics" value={true} />}
                {plan.features.multiLocation && <FeatureRow label="Multi-Location" value={true} />}
            </ul>

            {isActive ? (
                !isStarter && (
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="w-full py-2.5 rounded-xl text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 transition disabled:opacity-50"
                    >
                        Cancel Plan
                    </button>
                )
            ) : isStarter ? null : (
                <button
                    onClick={() => onUpgrade(planKey)}
                    disabled={loading}
                    className={`w-full py-2.5 text-black rounded-xl text-sm font-semibold transition disabled:opacity-50 ${c.btn}`}
                >
                    {loading ? "Redirecting..." : `Upgrade to ${plan.name}`}
                </button>
            )}
        </div>
    );
};

const Subscription = () => {
    const [plans, setPlans] = useState({});
    const [currentPlan, setCurrentPlan] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [gateway, setGateway] = useState("stripe");
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [cancelConfirm, setCancelConfirm] = useState(false);
    const { addToast: showToast } = useToast();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const paymentStatus = searchParams.get("payment");
        if (paymentStatus === "success") {
            showToast("Payment successful! Your plan has been upgraded.", "success");
            setSearchParams({}, { replace: true });
        } else if (paymentStatus === "cancelled") {
            showToast("Payment cancelled.", "error");
            setSearchParams({}, { replace: true });
        }
    }, []);

    useEffect(() => {
        const load = async () => {
            try {
                const [plansRes, currentRes] = await Promise.all([
                    fetchPlans(),
                    fetchCurrentPlan(),
                ]);
                setPlans(plansRes.data.plans);
                setCurrentPlan(currentRes.data.subscription.plan);
                setSubscription(currentRes.data.subscription);
            } catch {
                showToast("Failed to load subscription info.", "error");
            } finally {
                setPageLoading(false);
            }
        };
        load();
    }, []);

    const handleUpgrade = async (plan) => {
        setLoading(true);
        try {
            const res = await createCheckoutSession({ plan, gateway });
            if (res.data.checkoutUrl) {
                window.location.href = res.data.checkoutUrl;
            }
        } catch (err) {
            showToast(err?.response?.data?.message || "Checkout failed.", "error");
            setLoading(false);
        }
    };

    const handlePortal = async () => {
        setLoading(true);
        try {
            const res = await createPortalSession();
            if (res.data.portalUrl) {
                window.open(res.data.portalUrl, "_blank");
            }
        } catch (err) {
            showToast(err?.response?.data?.message || "Could not open billing portal.", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        setLoading(true);
        setCancelConfirm(false);
        try {
            await cancelPlan();
            showToast("Plan cancelled. Downgraded to Starter.", "success");
            const res = await fetchCurrentPlan();
            setCurrentPlan(res.data.subscription.plan);
            setSubscription(res.data.subscription);
        } catch {
            showToast("Failed to cancel plan.", "error");
        } finally {
            setLoading(false);
        }
    };

    if (pageLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Subscription</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your plan and billing</p>
                </div>

                {/* Current Plan Banner */}
                {subscription && currentPlan !== "starter" && (
                    <div className="bg-white border border-indigo-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-indigo-100 rounded-xl flex items-center justify-center">
                                <CreditCard size={18} className="text-indigo-600" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800">
                                    Active: {plans[currentPlan]?.name} Plan
                                    {subscription.activeGateway && (
                                        <span className="ml-2 text-xs font-normal text-gray-400 capitalize">
                                            via {subscription.activeGateway}
                                        </span>
                                    )}
                                </p>
                                {subscription.expiresAt && (
                                    <p className="text-xs text-gray-400">
                                        Renews {new Date(subscription.expiresAt).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        </div>
                        {subscription.activeGateway === "stripe" && (
                            <button
                                onClick={handlePortal}
                                disabled={loading}
                                className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium disabled:opacity-50"
                            >
                                Manage Billing <ExternalLink size={14} />
                            </button>
                        )}
                    </div>
                )}

                {/* Gateway Selector */}
                {currentPlan === "starter" && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                        <p className="text-sm font-semibold text-gray-700 mb-3">Payment Method</p>
                        <div className="flex gap-3">
                            {GATEWAY_OPTIONS.map((g) => (
                                <button
                                    key={g.value}
                                    onClick={() => !g.disabled && setGateway(g.value)}
                                    disabled={g.disabled}
                                    className={`
                                        flex-1 flex flex-col items-start px-4 py-3 rounded-xl border-2 transition text-left
                                        ${g.disabled ? "opacity-40 cursor-not-allowed border-gray-100 bg-gray-50" : ""}
                                        ${!g.disabled && gateway === g.value
                                            ? "border-indigo-500 bg-indigo-50"
                                            : !g.disabled ? "border-gray-200 hover:border-gray-300" : ""}
                                    `}
                                >
                                    <span className="text-sm font-medium text-gray-800">{g.label}</span>
                                    <span className="text-xs text-gray-400">{g.sub}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Plan Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {Object.entries(plans).map(([key, plan]) => (
                        <PlanCard
                            key={key}
                            planKey={key}
                            plan={plan}
                            currentPlan={currentPlan}
                            gateway={gateway}
                            onUpgrade={handleUpgrade}
                            onCancel={() => setCancelConfirm(true)}
                            loading={loading}
                        />
                    ))}
                </div>

            </div>

            {/* Cancel Confirm Modal */}
            {cancelConfirm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">Cancel Plan?</h3>
                            <button onClick={() => setCancelConfirm(false)}>
                                <X size={18} className="text-gray-400 hover:text-gray-600" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-5">
                            Your plan will be downgraded to <strong>Starter (Free)</strong> immediately. Features will be restricted.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setCancelConfirm(false)}
                                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
                            >
                                Keep Plan
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600"
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Subscription;
