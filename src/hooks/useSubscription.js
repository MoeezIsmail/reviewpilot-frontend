import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCurrentPlan, fetchPlans, createCheckoutSession, createPortalSession, cancelPlan } from "../api/subscriptionApi.js";
import { useToast } from "../components/toast/ToastProvider.jsx";

const useSubscription = () => {
    const [plans, setPlans] = useState({});
    const [currentPlan, setCurrentPlan] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [gateway, setGateway] = useState("stripe");
    const [loadingPlan, setLoadingPlan] = useState(null);
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

    return {
        plans,
        currentPlan,
        subscription,
        gateway,
        setGateway,
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
