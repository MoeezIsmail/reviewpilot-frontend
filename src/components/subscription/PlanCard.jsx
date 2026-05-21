import { Loader2, Flame } from "lucide-react";
import FeatureRow from "./FeatureRow.jsx";
import { PLAN_META, PLAN_FEATURES, PLAN_PRICING_DISCOUNT, PLAN_PRICING_ORIGINAL, PLAN_PRICING_YEARLY_MONTHLY_EQUIV, LIFETIME_SPOTS_LEFT, MONTHLY_DISCOUNT_PCT } from "../../constants/subscriptionMeta.js";

const PlanCard = ({ planKey, plan, currentPlan, subscription, billingPeriod, onUpgrade, onCancel, loadingPlan }) => {
    const isStarter = planKey === "starter";
    const isActive = currentPlan === planKey && (isStarter || subscription?.billingPeriod === billingPeriod);
    const meta = PLAN_META[planKey];
    const Icon = meta.icon;
    const isLoadingThis = loadingPlan === planKey;
    const features = PLAN_FEATURES[planKey] ?? [];

    const price = PLAN_PRICING_DISCOUNT[planKey]?.[billingPeriod] ?? plan.price;
    const original = PLAN_PRICING_ORIGINAL[planKey];
    const yearlyEquiv = PLAN_PRICING_YEARLY_MONTHLY_EQUIV[planKey];
    const yearlySavingsPct = yearlyEquiv
        ? Math.round((1 - yearlyEquiv.discounted / yearlyEquiv.original) * 100)
        : 0;
    const lifetimeSavings = original ? original.lifetime - PLAN_PRICING_DISCOUNT[planKey].lifetime : 0;

    return (
        <div className={`
            relative flex flex-col rounded-3xl border-2 bg-white dark:bg-gray-800 transition-[transform,box-shadow,border-color] duration-300
            ${isActive
                ? `border-transparent ring-2 ${meta.ringClass} shadow-2xl ${meta.glow} z-10`
                : "border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-xl hover:-translate-y-1.5 hover:z-10"}
        `}>
            {/* Lifetime spots ribbon */}
            {billingPeriod === "lifetime" && !isStarter && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md shadow-orange-200 whitespace-nowrap">
                    <Flame size={11} />
                    {plan.lifetimeSpotsLeft ?? LIFETIME_SPOTS_LEFT} spots remaining
                </div>
            )}

            <div className="p-6 flex flex-col flex-1">
                {/* Badge row */}
                <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${meta.badgeClass}`}>
                        {meta.badge}
                    </span>
                    {isActive && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
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
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">{plan.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{meta.description}</p>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 dark:bg-gray-700 my-4" />

                {/* Price */}
                <div className="mb-5">
                    {isStarter ? (
                        <div className="flex items-end gap-1">
                            <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">$0</span>
                            <span className="text-gray-500 dark:text-gray-400 text-sm mb-1">/ month</span>
                        </div>
                    ) : billingPeriod === "lifetime" ? (
                        <div>
                            <div className="flex items-end gap-1">
                                <span className={`text-4xl font-extrabold bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>
                                    ${price}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 text-sm mb-1">one-time</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400 line-through">${original?.lifetime}</span>
                                <span className="text-xs font-semibold text-orange-600 bg-orange-50 dark:bg-orange-900/40 dark:text-orange-400 px-2 py-0.5 rounded-full">
                                    Save ${lifetimeSavings}
                                </span>
                            </div>
                        </div>
                    ) : billingPeriod === "yearly" ? (
                        <div>
                            <div className="flex items-end gap-1">
                                <span className={`text-4xl font-extrabold bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>
                                    ${yearlyEquiv?.discounted ?? price}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 text-sm mb-1.5">/mo</span>
                            </div>
                            <div className="flex flex-col gap-1 mt-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 line-through">${yearlyEquiv?.original}/mo</span>
                                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/40 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                                        Save {yearlySavingsPct}%
                                    </span>
                                </div>
                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                    Billed ${price}/year
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-end gap-1">
                                <span className={`text-4xl font-extrabold bg-gradient-to-r ${meta.gradient} bg-clip-text text-transparent`}>
                                    ${price}
                                </span>
                                <span className="text-gray-500 dark:text-gray-400 text-sm mb-1">/ month</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400 line-through">${original?.monthly}/mo</span>
                                <span className="text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-900/40 dark:text-rose-400 px-2 py-0.5 rounded-full">
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
                        <div className="w-full py-3 rounded-2xl text-sm font-semibold text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 select-none">
                            Your Current Plan
                        </div>
                    ) : (
                        <button
                            onClick={onCancel}
                            className="w-full py-3 rounded-2xl text-sm font-semibold text-red-500 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-950/60 transition-colors flex items-center justify-center"
                        >
                            Cancel Plan
                        </button>
                    )
                ) : isStarter ? (
                    <div className="w-full py-3 rounded-2xl text-sm font-semibold text-center text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 select-none">
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
