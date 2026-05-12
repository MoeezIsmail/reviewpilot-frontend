import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, Zap, Crown, Sparkles, CreditCard, ExternalLink, X, Loader2 } from "lucide-react";
import { fetchCurrentPlan, fetchPlans, createCheckoutSession, createPortalSession, cancelPlan } from "../api/subscriptionApi.js";
import { useToast } from "../components/toast/ToastProvider.jsx";
import SubscriptionSkeleton from "../components/skeletons/SubscriptionSkeleton.jsx";

const PLAN_META = {
    starter: {
        icon: Sparkles,
        gradient: "from-slate-400 to-slate-500",
        glow: "",
        accent: "slate",
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
        accent: "indigo",
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
        accent: "violet",
        badge: "Best Value",
        badgeClass: "bg-violet-100 text-violet-600",
        btnClass: "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 shadow-lg shadow-violet-200",
        ringClass: "ring-violet-400",
        checkBg: "bg-violet-100",
        checkColor: "text-violet-600",
    },
};

const GATEWAY_OPTIONS = [
    { value: "stripe", label: "Credit / Debit Card", sub: "Visa, Mastercard, Amex" },
];

const FeatureRow = ({ label, included = true, checkBg = "bg-indigo-100", checkColor = "text-indigo-600" }) => (
    <li className={`flex items-center gap-2.5 text-sm ${included ? "text-gray-700" : "text-gray-300 line-through"}`}>
        <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${included ? checkBg : "bg-gray-100"}`}>
            <Check size={10} className={included ? checkColor : "text-gray-300"} strokeWidth={3} />
        </span>
        {label}
    </li>
);

const formatFeature = (label, value) => {
    if (typeof value === "boolean") return value ? label : null;
    if (value === -1) return `Unlimited ${label}`;
    return `${value} ${label}`;
};

const PlanCard = ({ planKey, plan, currentPlan, gateway, onUpgrade, onCancel, loadingPlan }) => {
    const isActive = currentPlan === planKey;
    const isStarter = planKey === "starter";
    const meta = PLAN_META[planKey];
    const Icon = meta.icon;
    const isLoadingThis = loadingPlan === planKey;

    const features = [
        // formatFeature("platforms", plan.features.platforms),
        formatFeature("reviews / month", plan.features.reviewsPerMonth),
        formatFeature("AI replies / month", plan.features.aiRepliesPerMonth),
        plan.features.bulkGenerate ? "Bulk AI Generate" : null,
        plan.features?.bulkPosting ? "Bulk Posting" : null,
        plan.features.analytics ? "Advanced Analytics" : null,
        // plan.features.multiLocation ? "Multi-Location Support" : null,
    ].filter(Boolean);

    return (
        <div className={`
            relative flex flex-col rounded-3xl border-2 bg-white transition-[transform,box-shadow,border-color] duration-300
            ${isActive
                ? `border-transparent ring-2 ${meta.ringClass} shadow-2xl ${meta.glow} z-10`
                : "border-gray-100 hover:border-gray-200 hover:shadow-xl hover:-translate-y-1.5 hover:z-10"}
        `}>
            <div className="p-6 flex flex-col flex-1">
                {/* Badge */}
                <div className="flex items-center justify-between mb-5">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${meta.badgeClass}`}>
                        {meta.badge}
                    </span>
                    {isActive && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-600">
                            ✓ Active
                        </span>
                    )}
                </div>

                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shadow-md`}>
                        <Icon size={18} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-6">
                    {plan.price === 0 ? (
                        <div className="flex items-end gap-1">
                            <span className="text-4xl font-extrabold text-gray-900">$0</span>
                            <span className="text-gray-400 text-sm mb-1">/month</span>
                        </div>
                    ) : (
                        <div className="flex items-end gap-1">
                            <span className={`text-4xl font-extrabold bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>
                                ${plan.price}
                            </span>
                            <span className="text-gray-400 text-sm mb-1">/month</span>
                        </div>
                    )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-7 flex-1">
                    {features.map((f, i) => (
                        <FeatureRow key={i} label={f} checkBg={meta.checkBg} checkColor={meta.checkColor} />
                    ))}
                </ul>

                {/* Button */}
                {isActive ? (
                    isStarter ? (
                        <div className="w-full py-3 rounded-2xl text-sm font-semibold text-center text-slate-400 bg-slate-50 select-none">
                            Your Current Plan
                        </div>
                    ) : (
                        <button
                            onClick={onCancel}
                            className="w-full py-3 rounded-2xl text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-colors flex items-center justify-center"
                        >
                            Cancel Plan
                        </button>
                    )
                ) : isStarter ? (
                    <div className="w-full py-3 rounded-2xl text-sm font-semibold text-center text-gray-400 bg-gray-50 select-none">
                        Free Forever
                    </div>
                ) : (
                    <button
                        onClick={() => onUpgrade(planKey)}
                        disabled={!!loadingPlan}
                        className={`
                            w-full py-3 rounded-2xl text-sm font-semibold transition-all duration-200
                            flex items-center justify-center gap-2
                            disabled:opacity-60 disabled:cursor-not-allowed
                            ${meta.btnClass}
                        `}
                    >
                        {isLoadingThis ? (
                            <>
                                <Loader2 size={15} className="animate-spin" />
                                Redirecting...
                            </>
                        ) : (
                            `Upgrade to ${plan.name} →`
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

const Subscription = () => {
    const [plans, setPlans] = useState({});
    const [currentPlan, setCurrentPlan] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [gateway, setGateway] = useState("stripe");
    const [loadingPlan, setLoadingPlan] = useState(null); // which plan is loading
    const [portalLoading, setPortalLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [cancelConfirm, setCancelConfirm] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
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
                const [plansRes, currentRes] = await Promise.all([fetchPlans(), fetchCurrentPlan()]);
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
        setLoadingPlan(plan);
        try {
            const res = await createCheckoutSession({ plan, gateway });
            if (res.data.checkoutUrl) window.location.href = res.data.checkoutUrl;
        } catch (err) {
            showToast(err?.response?.data?.message || "Checkout failed.", "error");
            setLoadingPlan(null);
        }
    };

    const handlePortal = async () => {
        setPortalLoading(true);
        try {
            const res = await createPortalSession();
            if (res.data.portalUrl) window.open(res.data.portalUrl, "_blank");
        } catch (err) {
            showToast(err?.response?.data?.message || "Could not open billing portal.", "error");
        } finally {
            setPortalLoading(false);
        }
    };

    const handleCancel = async () => {
        setCancelLoading(true);
        try {
            await cancelPlan();
            showToast("Plan cancelled. Downgraded to Starter.", "success");
            const res = await fetchCurrentPlan();
            setCurrentPlan(res.data.subscription.plan);
            setSubscription(res.data.subscription);
        } catch {
            showToast("Failed to cancel plan.", "error");
        } finally {
            setCancelLoading(false);
            setCancelConfirm(false);
        }
    };

    if (pageLoading) return <SubscriptionSkeleton />;

    return (
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-6 md:p-8">
            <div className="max-w-5xl mx-auto space-y-10">
                <div className="flex flex-col gap-3 w-full">
                    <h1 className={`text-xl font-semibold text-indigo-600 tracking-tight`}>
                        Choose the right plan for your business
                    </h1>
                    <p className={`text-gray-400 text-sm`}>Scale your reputation management with precision. Select the tier that matches your current growth stage.</p>
                </div>

                {/* Active plan banner */}
                {subscription && currentPlan !== "starter" && (
                    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 rounded-4xl p-5 text-white shadow-xl shadow-indigo-200">
                        <div className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: "radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
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
                                            Renews {new Date(subscription.expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {subscription.activeGateway === "stripe" && (
                                <button
                                    onClick={handlePortal}
                                    disabled={portalLoading}
                                    className="flex items-center gap-1.5 text-sm font-semibold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition backdrop-blur-sm disabled:opacity-60 shrink-0"
                                >
                                    {portalLoading ? <Loader2 size={14} className="animate-spin" /> : <ExternalLink size={14} />}
                                    Manage Billing
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Gateway selector */}
                {currentPlan === "starter" && (
                    <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
                        <p className="text-sm font-semibold text-gray-700 mb-3">Payment Method</p>
                        <div className="flex gap-3">
                            {GATEWAY_OPTIONS.map((g) => (
                                <button
                                    key={g.value}
                                    onClick={() => !g.disabled && setGateway(g.value)}
                                    disabled={g.disabled}
                                    className={`
                                        flex-1 flex flex-col items-start px-4 py-3.5 rounded-2xl border-2 transition-all text-left
                                        ${g.disabled ? "opacity-40 cursor-not-allowed border-gray-100 bg-gray-50" : ""}
                                        ${!g.disabled && gateway === g.value
                                            ? "border-indigo-400 bg-indigo-50 shadow-sm"
                                            : !g.disabled ? "border-gray-100 hover:border-gray-200 bg-gray-50/50" : ""}
                                    `}
                                >
                                    <span className="text-sm font-semibold text-gray-800">{g.label}</span>
                                    <span className="text-xs text-gray-400 mt-0.5">{g.sub}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Plan cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 isolate">
                    {Object.entries(plans).map(([key, plan]) => (
                        <PlanCard
                            key={key}
                            planKey={key}
                            plan={plan}
                            currentPlan={currentPlan}
                            gateway={gateway}
                            onUpgrade={handleUpgrade}
                            onCancel={() => setCancelConfirm(true)}
                            loadingPlan={loadingPlan}
                        />
                    ))}
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-gray-400 pb-2">
                    Payments are processed securely. Cancel anytime from your billing portal.
                </p>

            </div>

            {/* Cancel modal */}
            {cancelConfirm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
                        <div className="flex items-start justify-between mb-1">
                            <h3 className="font-bold text-gray-900 text-lg">Cancel your plan?</h3>
                            <button onClick={() => setCancelConfirm(false)} className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                                <X size={16} />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            Your plan will be downgraded to <strong className="text-gray-700">Starter (Free)</strong> immediately and paid features will be disabled.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setCancelConfirm(false)}
                                className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                            >
                                Keep Plan
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={cancelLoading}
                                className="flex-1 py-3 rounded-2xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition disabled:opacity-60 flex items-center justify-center gap-2"
                            >
                                {cancelLoading ? <Loader2 size={14} className="animate-spin" /> : null}
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
