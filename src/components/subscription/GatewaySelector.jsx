import { GATEWAY_OPTIONS } from "../../constants/subscriptionMeta.js";

const GatewaySelector = ({ gateway, setGateway }) => (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-5 shadow-sm">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Payment Method</p>
        <div className="flex gap-3">
            {GATEWAY_OPTIONS.map((g) => (
                <button
                    key={g.value}
                    onClick={() => !g.disabled && setGateway(g.value)}
                    disabled={g.disabled}
                    className={`
                        flex-1 flex flex-col items-start px-4 py-3.5 rounded-2xl border-2 transition-all text-left
                        ${g.disabled ? "opacity-40 cursor-not-allowed border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50" : ""}
                        ${!g.disabled && gateway === g.value
                            ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 shadow-sm"
                            : !g.disabled ? "border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 bg-gray-50/50 dark:bg-gray-700/30" : ""}
                    `}
                >
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">{g.label}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{g.sub}</span>
                </button>
            ))}
        </div>
    </div>
);

export default GatewaySelector;
