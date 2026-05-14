import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCurrentPlan, fetchPlans, createCheckoutSession, createPortalSession, cancelPlan, verifyCheckoutSession } from "../api/subscriptionApi.js";
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
    const { addToast: showToast } = useToast();
    const { user, updateUser } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const paymentStatus = searchParams.get("payment");
        const sessionId = searchParams.get("session_id");

        const load = async () => {
            setPageLoading(true);
            try {
                // Handle payment callback FIRST (sequential), so fetchCurrentPlan
                // runs after verify — backend is guaranteed updated by then
                if (paymentStatus === "success" && sessionId) {
                    console.log("[Subscription] Payment success callback — verifying session:", sessionId);
                    try {
                        const verifyRes = await verifyCheckoutSession(sessionId);
                        console.log("[Subscription] verifyCheckoutSession response:", verifyRes.data);
                        showToast("Payment successful! Your plan has been upgraded.", "success");
                    } catch (err) {
                        console.error("[Subscription] verifyCheckoutSession error:", err?.response?.data || err.message);
                        showToast("Payment received — refreshing your plan status.", "success");
                    }
                    setSearchParams({}, { replace: true });
                } else if (paymentStatus === "success") {
                    showToast("Payment successful! Your plan has been upgraded.", "success");
                    setSearchParams({}, { replace: true });
                } else if (paymentStatus === "cancelled") {
                    showToast("Payment cancelled.", "error");
                    setSearchParams({}, { replace: true });
                }

                // Fetch fresh plan data (runs after verify when payment callback present)
                const [plansRes, currentRes] = await Promise.all([fetchPlans(), fetchCurrentPlan()]);
                console.log("[Subscription] fetchPlans response:", plansRes.data);
                console.log("[Subscription] fetchCurrentPlan response:", currentRes.data);
                const freshSub = currentRes.data.subscription;
                setPlans(plansRes.data.plans);
                setCurrentPlan(freshSub.plan);
                setSubscription(freshSub);
                setHasUsedDiscountedOffer(freshSub.hasUsedDiscountedOffer === true);
                updateUser({ ...user, subscription: freshSub });
            } catch (err) {
                console.error("[Subscription] Load error:", err?.response?.data || err.message);
                showToast("Failed to load subscription info.", "error");
            } finally {
                setPageLoading(false);
            }
        };

        load();
    }, []);

    const handleUpgrade = async (plan) => {
        setLoadingPlan(plan);
        console.log("[Subscription] createCheckoutSession →", { plan, gateway, billingPeriod });
        try {
            const res = await createCheckoutSession({ plan, gateway, billingPeriod });
            console.log("[Subscription] createCheckoutSession response:", res.data);
            if (res.data.checkoutUrl) window.location.href = res.data.checkoutUrl;
        } catch (err) {
            console.error("[Subscription] createCheckoutSession error:", err?.response?.data || err.message);
            showToast(err?.response?.data?.message || "Checkout failed.", "error");
            setLoadingPlan(null);
        }
    };

    const handlePortal = async () => {
        setPortalLoading(true);
        console.log("[Subscription] createPortalSession →");
        try {
            const res = await createPortalSession();
            console.log("[Subscription] createPortalSession response:", res.data);
            if (res.data.portalUrl) window.open(res.data.portalUrl, "_blank");
        } catch (err) {
            console.error("[Subscription] createPortalSession error:", err?.response?.data || err.message);
            showToast(err?.response?.data?.message || "Could not open billing portal.", "error");
        } finally {
            setPortalLoading(false);
        }
    };

    const handleCancel = async () => {
        setCancelLoading(true);
        console.log("[Subscription] cancelPlan →");
        try {
            const cancelRes = await cancelPlan();
            console.log("[Subscription] cancelPlan response:", cancelRes.data);
            showToast("Plan cancelled. Downgraded to Starter.", "success");
            const res = await fetchCurrentPlan();
            console.log("[Subscription] fetchCurrentPlan after cancel:", res.data);
            const freshSub = res.data.subscription;
            setCurrentPlan(freshSub.plan);
            setSubscription(freshSub);
            setHasUsedDiscountedOffer(freshSub.hasUsedDiscountedOffer === true);
            updateUser({ ...user, subscription: freshSub });
        } catch (err) {
            console.error("[Subscription] cancelPlan error:", err?.response?.data || err.message);
            if (err?.message === "Lifetime plans cannot be cancelled") {
                showToast(err?.message, "error")
            } else {
                showToast("Failed to cancel plan.", "error");
            }
        } finally {
            setCancelLoading(false);
            setCancelConfirm(false);
        }
    };

    return {
        plans,
        currentPlan,
        subscription,
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
        handleUpgrade,
        handlePortal,
        handleCancel,
    };
};

export default useSubscription;
