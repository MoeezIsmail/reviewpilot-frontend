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
        aiRepliesPerMonth: -1,   // unlimited
        bulkGenerate: true,
        bulkPosting: true,
        analytics: true,
    },
};

const usePlanFeatures = () => {
    const { user } = useAuth();

    const plan = user?.subscription?.plan || "starter";
    const status = user?.subscription?.status || "active";
    const aiRepliesUsed = user?.subscription?.aiRepliesUsed || 0;

    // Agar past_due hai to starter treat karo
    const effectivePlan = status === "past_due" ? "starter" : plan;
    const limits = PLAN_LIMITS[effectivePlan] || PLAN_LIMITS.starter;

    const canUseAiReply = () => {
        if (limits.aiRepliesPerMonth === -1) return true;  // unlimited
        return aiRepliesUsed < limits.aiRepliesPerMonth;
    };

    const remainingAiReplies = () => {
        if (limits.aiRepliesPerMonth === -1) return Infinity;
        return Math.max(0, limits.aiRepliesPerMonth - aiRepliesUsed);
    };

    return {
        plan: effectivePlan,
        limits,
        canUseAiReply: canUseAiReply(),
        remainingAiReplies: remainingAiReplies(),
        canBulkGenerate: limits.bulkGenerate,
        canBulkPost: limits.bulkPosting,
        canViewAnalytics: limits.analytics,
    };
};

export default usePlanFeatures;