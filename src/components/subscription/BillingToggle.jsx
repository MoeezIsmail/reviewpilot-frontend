import { Flame } from "lucide-react";
import { YEARLY_DISCOUNT_PCT, LIFETIME_SPOTS_LEFT } from "../../constants/subscriptionMeta.js";

const PERIODS = [
    {
        value: "monthly",
        label: "Monthly",
    },
    {
        value: "yearly",
        label: "Yearly",
        badge: `Save ${YEARLY_DISCOUNT_PCT}%`,
        badgeClass: "bg-emerald-100 text-emerald-600",
    },
    {
        value: "lifetime",
        label: "Lifetime",
        badge: `${LIFETIME_SPOTS_LEFT} spots left`,
        badgeClass: "bg-orange-100 text-orange-600",
        Icon: Flame,
    },
];

const BillingToggle = ({ billingPeriod, setBillingPeriod }) => (
    <div className="flex items-center justify-center">
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-2xl">
            {PERIODS.map(({ value, label, badge, badgeClass, Icon }) => (
                <button
                    key={value}
                    onClick={() => setBillingPeriod(value)}
                    className={`
                        flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                        ${billingPeriod === value
                            ? "bg-white shadow-sm text-gray-900 font-semibold border border-indigo-600"
                            : "text-gray-500 hover:text-gray-700"}
                    `}
                >
                    {label}
                    {badge && (
                        <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>
                            {Icon && <Icon size={10} />}
                            {badge}
                        </span>
                    )}
                </button>
            ))}
        </div>
    </div>
);

export default BillingToggle;
