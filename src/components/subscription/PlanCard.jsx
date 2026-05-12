import { Loader2, Flame } from "lucide-react";
import FeatureRow from "./FeatureRow.jsx";
import { PLAN_META, PLAN_FEATURES, PLAN_PRICING, PLAN_PRICING_ORIGINAL, LIFETIME_SPOTS_LEFT, MONTHLY_DISCOUNT_PCT } from "../../constants/subscriptionMeta.js";

const PlanCard = ({ planKey, plan, currentPlan, billingPeriod, onUpgrade, onCancel, loadingPlan }) => {
    const isActive = currentPlan === planKey;
    const isStarter = planKey === "starter";
    const meta = PLAN_META[planKey];
    const Icon = meta.icon;
    const isLoadingThis = loadingPlan === planKey;
    const features = PLAN_FEATURES[planKey] ?? [];

    const price = PLAN_PRICING[planKey]?.[billingPeriod] ?? plan.price;
    const original = PLAN_PRICING_ORIGINAL[planKey];
    const yearlySavingsPct = original ? Math.round((1 - PLAN_PRICING[planKey].yearly / original.monthly) * 100) : 0;
    const lifetimeSavings = original ? original.lifetime - PLAN_PRICING[planKey].lifetime : 0;

    return (
        <div className={`
            relative flex flex-col rounded-3xl border-2 bg-white transition-[transform,box-shadow,border-color] duration-300
            ${isActive
                ? `border-transparent ring-2 ${meta.ringClass} shadow-2xl ${meta.glow} z-10`
                : "border-gray-100 hover:border-gray-200 hover:shadow-xl hover:-translate-y-1.5 hover:z-10"}
        `}>
            {/* Lifetime spots ribbon */}
            {billingPeriod === "lifetime" && !isStarter && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md shadow-orange-200 whitespace-nowrap">
                    <Flame size={11} />
                    {LIFETIME_SPOTS_LEFT} spots remaining
                </div>
            )}

            <div className="p-6 flex flex-col flex-1">
                {/* Badge row */}
                <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${meta.badgeClass}`}>
                        {meta.badge}
                    </span>
                    {isActive && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-600">
                            ✓ Active
                        </span>
                    )}
                </div>

                {/* Icon + Name + Description */}
                <div className="flex items-center gap-3 mb-1">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shadow-md shrink-0`}>
                        <Icon size={18} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">{plan.name}</h3>
                        <p className="text-xs text-gray-400">{meta.description}</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 my-4" />

                {/* Price */}
                <div className="mb-5">
                    {isStarter ? (
                        <div className="flex items-end gap-1">
                            <span className="text-4xl font-extrabold text-gray-900">$0</span>
                            <span className="text-gray-400 text-sm mb-1">/ month</span>
                        </div>
                    ) : billingPeriod === "lifetime" ? (
                        <div>
                            <div className="flex items-end gap-1">
                                <span className={`text-4xl font-extrabold bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>
                                    ${price}
                                </span>
                                <span className="text-gray-400 text-sm mb-1">one-time</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-400 line-through">${original?.lifetime}</span>
                                <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                                    Save ${lifetimeSavings}
                                </span>
                            </div>
                        </div>
                    ) : billingPeriod === "yearly" ? (
                        <div>
                            <div className="flex items-end gap-1.5">
                                <span className={`text-4xl font-extrabold bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>
                                    ${price}
                                </span>
                                <span className="text-gray-400 text-sm mb-1">/ month</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-400 line-through">${original?.monthly}/mo</span>
                                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                    Save {yearlySavingsPct}%
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-end gap-1">
                                <span className={`text-4xl font-extrabold bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>
                                    ${price}
                                </span>
                                <span className="text-gray-400 text-sm mb-1">/ month</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-400 line-through">${original?.monthly}/mo</span>
                                <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                                    {MONTHLY_DISCOUNT_PCT}% off · Limited
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-7 flex-1">
                    {features.map((f, i) => (
                        <FeatureRow
                            key={i}
                            label={f.label}
                            included={f.included}
                            checkBg={meta.checkBg}
                            checkColor={meta.checkColor}
                        />
                    ))}
                </ul>

                {/* CTA Button */}
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
                        ) : billingPeriod === "lifetime" ? (
                            `Get ${plan.name} Lifetime →`
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
