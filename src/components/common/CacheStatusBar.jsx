import { Loader2, CheckCircle, AlertTriangle, AlertCircle, RefreshCw } from "lucide-react";

const timeAgo = (date) => {
    if (!date) return "";
    const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (seconds < 60)  return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60)  return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24)    return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
};

const hoursOld = (date) => {
    if (!date) return Infinity;
    return (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60);
};

const CacheStatusBar = ({ analyticsData, onRefresh }) => {
    if (!analyticsData?.isLoaded) return null;

    const {
        isFetching,
        cachedAt,
        totalReviewCount,
        fetchError,
        isPartialCache,
        fetchedPages,
        totalPagesEstimate,
    } = analyticsData;

    // ── State: Fetch error ───────────────────────────────────────────────────
    if (fetchError && !isFetching) {
        return (
            <div className="flex items-center justify-between bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-xl px-4 py-2.5">
                <div className="flex items-center gap-2">
                    <AlertCircle size={13} className="text-red-500 shrink-0" />
                    <span className="text-sm text-red-700 dark:text-red-400">
                        Sync failed — showing cached data.
                    </span>
                </div>
                {onRefresh && (
                    <button
                        onClick={onRefresh}
                        className="flex items-center gap-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors shrink-0 ml-3"
                    >
                        <RefreshCw size={11} />
                        Retry
                    </button>
                )}
            </div>
        );
    }

    // ── State: Background fetch in progress ──────────────────────────────────
    if (isFetching) {
        return (
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-xl px-4 py-2.5">
                <Loader2 size={13} className="animate-spin text-blue-500 shrink-0" />
                <span className="text-sm text-blue-700 dark:text-blue-400">
                    Syncing all reviews in the background…
                </span>
            </div>
        );
    }

    // ── State: Partial cache (EC10) ──────────────────────────────────────────
    if (isPartialCache) {
        return (
            <div className="flex items-center justify-between bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 rounded-xl px-4 py-2.5">
                <div className="flex items-center gap-2">
                    <AlertTriangle size={13} className="text-amber-500 shrink-0" />
                    <span className="text-sm text-amber-700 dark:text-amber-400">
                        Partial data — {fetchedPages} of {totalPagesEstimate} page{totalPagesEstimate !== 1 ? "s" : ""} synced.
                        Stats may be incomplete.
                    </span>
                </div>
                {onRefresh && (
                    <button
                        onClick={onRefresh}
                        className="flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors shrink-0 ml-3"
                    >
                        <RefreshCw size={11} />
                        Retry sync
                    </button>
                )}
            </div>
        );
    }

    const age = hoursOld(cachedAt);

    // ── State: Stale cache — older than 6 hours ──────────────────────────────
    if (age > 6) {
        return (
            <div className="flex items-center justify-between bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 rounded-xl px-4 py-2.5">
                <div className="flex items-center gap-2">
                    <AlertTriangle size={13} className="text-amber-500 shrink-0" />
                    <span className="text-sm text-amber-700 dark:text-amber-400">
                        Last synced {timeAgo(cachedAt)}
                    </span>
                </div>
                {onRefresh && (
                    <button
                        onClick={onRefresh}
                        className="flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors shrink-0 ml-3"
                    >
                        <RefreshCw size={11} />
                        Refresh now
                    </button>
                )}
            </div>
        );
    }

    // ── State: Fresh cache — synced within the last hour ─────────────────────
    if (cachedAt && age <= 1) {
        return (
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                <CheckCircle size={12} className="shrink-0" />
                <span>
                    {totalReviewCount > 0 ? `${totalReviewCount.toLocaleString()} reviews synced` : "Synced"} · {timeAgo(cachedAt)}
                </span>
            </div>
        );
    }

    // ── Default: cached, 1–6 hours old ───────────────────────────────────────
    if (cachedAt) {
        return (
            <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                <CheckCircle size={12} className="shrink-0" />
                <span>
                    {totalReviewCount > 0 ? `${totalReviewCount.toLocaleString()} reviews` : "Synced"} · Updated {timeAgo(cachedAt)}
                </span>
            </div>
        );
    }

    return null;
};

export default CacheStatusBar;
