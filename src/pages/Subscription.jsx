import { Sparkles, Crown, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import useSubscription from "../hooks/useSubscription.js";
import PlanCard from "../components/subscription/PlanCard.jsx";
import ActivePlanBanner from "../components/subscription/ActivePlanBanner.jsx";
import BillingToggle from "../components/subscription/BillingToggle.jsx";
import CancelModal from "../components/subscription/CancelModal.jsx";
import SubscriptionSkeleton from "../components/skeletons/SubscriptionSkeleton.jsx";

const Subscription = () => {
    const {
        plans, currentPlan, subscription,
        billingPeriod, setBillingPeriod,
        loadingPlan, portalLoading, pageLoading,
        cancelConfirm, setCancelConfirm, cancelLoading,
        handleUpgrade, handlePortal, handleCancel,
    } = useSubscription();

    if (pageLoading) return <SubscriptionSkeleton />;

    return (
        <div className="subscription-scroll flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 p-6 md:p-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Founder Club Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 p-[2px] shadow-lg shadow-amber-200/50">
                    <div className="relative rounded-2xl bg-gradient-to-r from-amber-950/90 via-orange-950/90 to-yellow-950/90 px-6 py-4 overflow-hidden">
                        {/* Background shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-yellow-300/5 to-amber-400/10 animate-pulse" />
                        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-amber-400/10 blur-2xl" />
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-orange-400/10 blur-2xl" />

                        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                            {/* Left: Badge + Text */}
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md shadow-amber-500/40">
                                    <Crown size={20} className="text-white" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-amber-400 font-bold text-base tracking-wide">Founder Club</span>
                                        <span className="inline-flex items-center gap-1 bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                            <Zap size={9} className="fill-amber-300" /> Exclusive
                                        </span>
                                    </div>
                                    <p className="text-amber-100/80 text-sm leading-snug">
                                        First <span className="text-white font-bold">50 members</span> lock in today's price{" "}
                                        <span className="text-amber-300 font-semibold">forever</span> — price never increases for you.
                                    </p>
                                </div>
                            </div>

                            {/* Right: Spots counter */}
                            <div className="flex-shrink-0 flex items-center gap-2 bg-white/10 border border-amber-400/20 rounded-xl px-4 py-2.5">
                                <Users size={15} className="text-amber-300" />
                                <div className="text-center">
                                    <div className="text-white font-bold text-sm leading-none">50 spots</div>
                                    <div className="text-amber-300/70 text-[10px] mt-0.5 leading-none">Lifetime pricing</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
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

                {/* Plan Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 isolate">
                    {Object.entries(plans).map(([key, plan]) => (
                        <PlanCard
                            key={key}
                            planKey={key}
                            plan={plan}
                            currentPlan={currentPlan}
                            subscription={subscription}
                            billingPeriod={billingPeriod}
                            onUpgrade={handleUpgrade}
                            onCancel={() => setCancelConfirm(true)}
                            loadingPlan={loadingPlan}
                        />
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center space-y-1 pb-2">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        Payments processed securely via Stripe. Cancel anytime — no questions asked.
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        By subscribing, you agree to our{" "}
                        <Link to="/terms" className="text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 underline underline-offset-2 transition-colors">
                            Terms &amp; Conditions
                        </Link>
                    </p>
                </div>

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
