import { Loader2 } from "lucide-react";
import FeatureRow from "./FeatureRow.jsx";
import { PLAN_META } from "../../constants/subscriptionMeta.js";

const formatFeature = (label, value) => {
    if (typeof value === "boolean") return value ? label : null;
    if (value === -1) return `Unlimited ${label}`;
    return `${value} ${label}`;
};

const PlanCard = ({ planKey, plan, currentPlan, onUpgrade, onCancel, loadingPlan }) => {
    const isActive = currentPlan === planKey;
    const isStarter = planKey === "starter";
    const meta = PLAN_META[planKey];
    const Icon = meta.icon;
    const isLoadingThis = loadingPlan === planKey;

    const features = [
        formatFeature("reviews / month", plan.features.reviewsPerMonth),
        formatFeature("AI replies / month", plan.features.aiRepliesPerMonth),
        plan.features.bulkGenerate ? "Bulk AI Generate" : null,
        plan.features?.bulkPosting ? "Bulk Posting" : null,
        plan.features.analytics ? "Advanced Analytics" : null,
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

export default PlanCard;
