import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCurrentPlan, fetchPlans, createCheckoutSession, createPortalSession, cancelPlan, reactivatePlan, verifyCheckoutSession } from "../api/subscriptionApi.js";
import { useToast } from "../components/toast/ToastProvider.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const useSubscription = () => {
    const [plans, setPlans] = useState({});
    const [currentPlan, setCurrentPlan] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [hasUsedDiscountedOffer, setHasUsedDiscountedOffer] = useState(false);
    const [gateway, setGateway] = useState("stripe");
    const [billingPeriod, setBillingPeriod] = useState("monthly");
    const [loadingPlan, setLoadingPlan] = useState(null);
    const [portalLoading, setPortalLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [cancelConfirm, setCancelConfirm] = useState(false);
    const [cancelLoading, setCancelLoading] = useState(false);
    const [reactivateConfirm, setReactivateConfirm] = useState(false);
    const [reactivateLoading, setReactivateLoading] = useState(false);
    const { addToast: showToast } = useToast();
    const { updateSubscription } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();

    const refreshSubscription = async () => {
        const [plansRes, currentRes] = await Promise.all([fetchPlans(), fetchCurrentPlan()]);
        const freshSub = currentRes.data.subscription;
        setPlans(plansRes.data.plans);
        setCurrentPlan(freshSub.plan);
        setSubscription(freshSub);
        setHasUsedDiscountedOffer(freshSub.hasUsedDiscountedOffer === true);
        updateSubscription(freshSub);
        return freshSub;
    };

    useEffect(() => {
        const paymentStatus = searchParams.get("payment");
        const sessionId     = searchParams.get("session_id");

        const load = async () => {
            setPageLoading(true);
            try {
                // Verify payment session FIRST so fetchCurrentPlan sees the updated state
                if (paymentStatus === "success" && sessionId) {
                    try {
                        await verifyCheckoutSession(sessionId);
                        showToast("Payment successful! Your plan has been upgraded.", "success");
                    } catch {
                        showToast("Payment received — refreshing your plan status.", "success");
                    }
                    setSearchParams({}, { replace: true });
                } else if (paymentStatus === "success") {
                    showToast("Payment successful! Your plan has been upgraded.", "success");
                    setSearchParams({}, { replace: true });
                } else if (paymentStatus === "cancelled") {
                    showToast("Payment cancelled.", "info");
                    setSearchParams({}, { replace: true });
                }

                await refreshSubscription();
            } catch {
                showToast("Failed to load subscription info.", "error");
            } finally {
                setPageLoading(false);
            }
        };

        load();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleUpgrade = async (plan) => {
        setLoadingPlan(plan);
        try {
            const res = await createCheckoutSession({ plan, gateway, billingPeriod });
            if (res.data.checkoutUrl) window.location.href = res.data.checkoutUrl;
        } catch (err) {
            const code      = err?.response?.data?.code;
            const serverMsg = err?.response?.data?.message;
            let msg = serverMsg || "Checkout failed. Please try again.";
            if (code === "DOWNGRADE_NOT_ALLOWED") {
                msg = "Cancel your current plan first before switching to a lower plan.";
            } else if (code === "ALREADY_ACTIVE") {
                msg = "This plan is already active on your account.";
            } else if (code === "LIFETIME_CANNOT_CHANGE") {
                msg = "Your lifetime plan cannot be changed or downgraded.";
            } else if (code === "OFFER_ALREADY_USED") {
                msg = serverMsg;
            }
            showToast(msg, "error");
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
            const cancelRes = await cancelPlan();
            const msg = cancelRes?.data?.message || "Plan cancelled. It will remain active until the end of your billing period.";
            showToast(msg, "success");
            await refreshSubscription();
        } catch (err) {
            const code      = err?.response?.data?.code;
            const serverMsg = err?.response?.data?.message;
            if (code === "LIFETIME_CANNOT_CHANGE") {
                showToast("Lifetime plans cannot be cancelled.", "error");
            } else if (code === "ALREADY_EXPIRING") {
                showToast("Your cancellation is already in progress.", "info");
            } else {
                showToast(serverMsg || "Failed to cancel plan.", "error");
            }
        } finally {
            setCancelLoading(false);
            setCancelConfirm(false);
        }
    };

    const handleReactivate = async () => {
        setReactivateLoading(true);
        try {
            const res = await reactivatePlan();
            showToast(res.data.message || "Your plan has been reactivated.", "success");
            await refreshSubscription();
        } catch (err) {
            const serverMsg = err?.response?.data?.message;
            showToast(serverMsg || "Failed to reactivate plan.", "error");
        } finally {
            setReactivateLoading(false);
            setReactivateConfirm(false);
        }
    };

    return {
        plans,
        currentPlan,
        subscription,
        previousPlan: subscription?.previousPlan || null,
        hasUsedDiscountedOffer,
        gateway,
        setGateway,
        billingPeriod,
        setBillingPeriod,
        loadingPlan,
        portalLoading,
        pageLoading,
        cancelConfirm,
        setCancelConfirm,
        cancelLoading,
        reactivateConfirm,
        setReactivateConfirm,
        reactivateLoading,
        handleUpgrade,
        handlePortal,
        handleCancel,
        handleReactivate,
    };
};

export default useSubscription;
