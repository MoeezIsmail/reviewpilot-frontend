import { useState, useEffect, useRef } from "react";
import { Sparkles, RefreshCw, Loader2, AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { fetchReviewsSummary } from "../../api/reviewsApi.js";

const ReviewsSummary = ({ reviews }) => {
    const [summary, setSummary] = useState(null);
    const [analyzedCount, setAnalyzedCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(true);
    const hasFetched = useRef(false);

    const generate = async () => {
        if (!reviews?.length) return;
        setLoading(true);
        setError(null);
        try {
            const data = await fetchReviewsSummary(reviews);
            setSummary(data.summary);
            setAnalyzedCount(data.analyzedCount ?? reviews.length);
        } catch (err) {
            const msg = err?.response?.data?.message;
            if (err?.response?.status === 429) {
                setError("Rate limit reached — please wait a few minutes before refreshing.");
            } else {
                setError(msg || "Could not generate summary. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Auto-generate once when reviews are first available
    useEffect(() => {
        if (reviews?.length && !hasFetched.current) {
            hasFetched.current = true;
            generate();
        }
    }, [reviews]);

    const isEmpty = !reviews?.length;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-violet-50 dark:bg-violet-900/40 rounded-lg flex items-center justify-center">
                        <Sparkles size={15} className="text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            AI Review Summary
                        </h2>
                        {analyzedCount > 0 && !loading && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Based on {analyzedCount} recent review{analyzedCount !== 1 ? 's' : ''}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Refresh button */}
                    <button
                        onClick={generate}
                        disabled={loading || isEmpty}
                        title="Regenerate summary"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                    </button>

                    {/* Expand/collapse */}
                    <button
                        onClick={() => setExpanded(p => !p)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        {expanded
                            ? <ChevronUp size={14} />
                            : <ChevronDown size={14} />
                        }
                    </button>
                </div>
            </div>

            {/* Body */}
            {expanded && (
                <div className="px-5 py-4">
                    {isEmpty ? (
                        <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">
                            No reviews loaded yet.
                        </p>

                    ) : loading ? (
                        <div className="flex items-start gap-3 py-2">
                            <Loader2 size={16} className="text-violet-500 animate-spin shrink-0 mt-0.5" />
                            <div className="flex-1 space-y-2">
                                <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full animate-pulse w-full" />
                                <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full animate-pulse w-5/6" />
                                <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full animate-pulse w-4/6" />
                                <p className="text-xs text-gray-400 dark:text-gray-500 pt-1">
                                    AI is reading your reviews…
                                </p>
                            </div>
                        </div>

                    ) : error ? (
                        <div className="flex items-start gap-2.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 rounded-xl px-4 py-3">
                            <AlertCircle size={15} className="text-rose-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-rose-600 dark:text-rose-400 leading-relaxed">{error}</p>
                        </div>

                    ) : summary ? (
                        <div className="relative">
                            {/* Decorative quote mark */}
                            <span
                                aria-hidden
                                className="absolute -top-1 -left-1 text-5xl font-serif text-violet-100 dark:text-violet-900/60 select-none leading-none"
                            >
                                "
                            </span>
                            <p className="relative text-sm text-gray-700 dark:text-gray-300 leading-relaxed pl-4">
                                {summary}
                            </p>
                            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                                <Sparkles size={11} className="text-violet-400" />
                                <span className="text-[10px] text-gray-400 dark:text-gray-500">
                                    Generated by AI · Not a substitute for reading individual reviews
                                </span>
                            </div>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default ReviewsSummary;
