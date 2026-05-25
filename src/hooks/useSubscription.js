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
    const { updateSubscription } = useAuth();
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
                    showToast("Payment cancelled.", "error");
                    setSearchParams({}, { replace: true });
                }

                const [plansRes, currentRes] = await Promise.all([fetchPlans(), fetchCurrentPlan()]);
                const freshSub = currentRes.data.subscription;
                setPlans(plansRes.data.plans);
                setCurrentPlan(freshSub.plan);
                setSubscription(freshSub);
                setHasUsedDiscountedOffer(freshSub.hasUsedDiscountedOffer === true);
                updateSubscription(freshSub);
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
            const res = await createCheckoutSession({ plan, gateway, billingPeriod });
            if (res.data.checkoutUrl) window.location.href = res.data.checkoutUrl;
        } catch (err) {
            const code = err?.response?.data?.code;
            const msg = code === 'DOWNGRADE_NOT_ALLOWED'
                ? "Cancel your current plan first before switching to a lower plan."
                : err?.response?.data?.message || "Checkout failed.";
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
            await cancelPlan();
            showToast("Plan cancelled. Downgraded to Starter.", "success");
            const res = await fetchCurrentPlan();
            const freshSub = res.data.subscription;
            setCurrentPlan(freshSub.plan);
            setSubscription(freshSub);
            setHasUsedDiscountedOffer(freshSub.hasUsedDiscountedOffer === true);
            updateSubscription(freshSub);
        } catch (err) {
            const serverMsg = err?.response?.data?.message;
            if (serverMsg === "Lifetime plans cannot be cancelled") {
                showToast(serverMsg, "error");
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
