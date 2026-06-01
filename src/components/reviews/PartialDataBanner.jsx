import { AlertTriangle, RefreshCw } from "lucide-react";

/**
 * Shown on Dashboard and Analytics when the cache contains partial data —
 * i.e., the background fetch was interrupted (token expiry, network error,
 * or the safety page-cap was hit). Numbers are labeled as estimates so users
 * understand the data is not complete. (Edge Case 10)
 */
const PartialDataBanner = ({ fetchedPages, totalPages, fetchError, onRetry }) => {
    const known   = fetchedPages    ?? 0;
    const total   = totalPages      ?? 0;
    const reviews = known * 50;

    return (
        <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl px-5 py-4">
            <AlertTriangle size={16} className="text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                    Showing partial data
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5 leading-relaxed">
                    {total > 0
                        ? `${known} of ${total} page${total !== 1 ? "s" : ""} synced (~${reviews} reviews). Statistics shown are estimates — your actual totals may differ.`
                        : "Some review pages could not be synced. Statistics shown are estimates."
                    }
                    {fetchError && (
                        <span className="block mt-0.5 opacity-80">
                            Reason: {fetchError}
                        </span>
                    )}
                </p>
            </div>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="flex items-center gap-1.5 shrink-0 text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40 hover:bg-amber-200 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-700 rounded-xl px-3 py-1.5 transition-colors"
                >
                    <RefreshCw size={11} />
                    Retry sync
                </button>
            )}
        </div>
    );
};

export default PartialDataBanner;
