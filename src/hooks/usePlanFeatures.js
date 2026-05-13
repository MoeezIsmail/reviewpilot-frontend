import { useAuth } from "../context/AuthContext.jsx";

const PLAN_LIMITS = {
    starter: {
        aiRepliesPerMonth: 10,
        bulkGenerate: false,
        bulkPosting: false,
        analytics: false,
    },
    growth: {
        aiRepliesPerMonth: 200,
        bulkGenerate: true,
        bulkPosting: true,
        analytics: true,
    },
    pro: {
        aiRepliesPerMonth: -1,
        bulkGenerate: true,
        bulkPosting: true,
        analytics: true,
    },
};

const isSubscriptionExpired = (subscription) => {
    if (!subscription?.expiresAt) return false;
    if (subscription.billingPeriod === "lifetime") return false;
    return new Date(subscription.expiresAt) < new Date();
};

const usePlanFeatures = () => {
    const { user } = useAuth();

    const subscription = user?.subscription;
    const plan = subscription?.plan || "starter";
    const status = subscription?.status || "active";
    const aiRepliesUsed = subscription?.aiRepliesUsed || 0;

    const isExpired = isSubscriptionExpired(subscription);
    const isDowngraded = status === "past_due" || status === "expired" || status === "cancelled" || isExpired;
    const effectivePlan = isDowngraded ? "starter" : plan;
    const limits = PLAN_LIMITS[effectivePlan] || PLAN_LIMITS.starter;

    const canUseAiReply = limits.aiRepliesPerMonth === -1 || aiRepliesUsed < limits.aiRepliesPerMonth;

    const remainingAiReplies = limits.aiRepliesPerMonth === -1
        ? Infinity
        : Math.max(0, limits.aiRepliesPerMonth - aiRepliesUsed);

    return {
        plan: effectivePlan,
        rawPlan: plan,
        status,
        isExpired,
        isDowngraded,
        limits,
        canUseAiReply,
        remainingAiReplies,
        canBulkGenerate: limits.bulkGenerate,
        canBulkPost: limits.bulkPosting,
        canViewAnalytics: limits.analytics,
    };
};

export default usePlanFeatures;