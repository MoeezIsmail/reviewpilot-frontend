import { CheckCircle2, Clock, Loader2 } from "lucide-react";

const ConnectionCard = ({
    icon,
    name,
    description,
    connected,
    connectedAt,
    onConnect,
    onDisconnect,
    disconnecting,
    comingSoon = false,
}) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return null;
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric",
        });
    };

    return (
        <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
            connected
                ? "border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/60 dark:bg-emerald-950/20"
                : comingSoon
                    ? "border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-700/20 opacity-60"
                    : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        }`}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 shrink-0">
                <img src={icon} className="w-5 h-5" alt={name} />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{name}</p>
                    {comingSoon && (
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
                            Coming Soon
                        </span>
                    )}
                    {connected && (
                        <span className="flex items-center gap-1 text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                            <CheckCircle2 size={10} /> Connected
                        </span>
                    )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {connected && connectedAt
                        ? `Connected ${formatDate(connectedAt)}`
                        : description}
                </p>
            </div>

            {comingSoon ? (
                <button disabled className="shrink-0 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 px-3 py-1.5 rounded-lg cursor-not-allowed">
                    Soon
                </button>
            ) : connected ? (
                <button
                    onClick={onDisconnect}
                    disabled={disconnecting}
                    className="shrink-0 flex items-center gap-1.5 text-xs font-medium border border-red-200 dark:border-red-800 text-red-500 dark:text-red-400 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 disabled:opacity-50 transition-all"
                >
                    {disconnecting ? <Loader2 size={12} className="animate-spin" /> : null}
                    Disconnect
                </button>
            ) : (
                <button
                    onClick={onConnect}
                    className="shrink-0 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                >
                    Connect
                </button>
            )}
        </div>
    );
};

export default ConnectionCard;
