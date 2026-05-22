import { Sparkles, RefreshCw, Loader2, AlertCircle } from "lucide-react";
import { useReviews } from "../../context/ReviewsContext.jsx";

const ReviewsSummary = ({ reviews, stats }) => {
    const { reviewSummary, summaryLoading, summaryError, summaryAnalyzedCount, generateReviewSummary } = useReviews();

    const positive = stats?.positiveReviews ?? 0;
    const neutral = stats?.averageReviews ?? 0;
    const negative = stats?.negativeReviews ?? 0;
    const sentimentTotal = positive + neutral + negative || 1;
    const positivePct = Math.round((positive / sentimentTotal) * 100);
    const neutralPct = Math.round((neutral / sentimentTotal) * 100);
    const negativePct = Math.round((negative / sentimentTotal) * 100);

    const isEmpty = !reviews?.length;

    return (
        <div className="relative overflow-hidden rounded-2xl shadow-lg"
            style={{ background: "linear-gradient(135deg, #6d28d9 0%, #4f46e5 60%, #3730a3 100%)" }}
        >
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-indigo-400/10" />

            <div className="relative p-6 sm:p-7">
                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
                            <Sparkles size={15} className="text-violet-200" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white/90 uppercase tracking-wider">
                                AI Review Summary
                            </p>
                            {summaryAnalyzedCount > 0 && !summaryLoading && (
                                <p className="text-xs text-white/50 mt-0.5">
                                    Based on {summaryAnalyzedCount} review{summaryAnalyzedCount !== 1 ? "s" : ""}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => generateReviewSummary(reviews)}
                        disabled={summaryLoading || isEmpty}
                        title="Regenerate summary"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        <RefreshCw size={12} className={summaryLoading ? "animate-spin" : ""} />
                        Refresh
                    </button>
                </div>

                {/* Content */}
                {isEmpty ? (
                    <p className="text-white/50 text-sm py-4">No reviews loaded yet.</p>

                ) : summaryLoading ? (
                    <div className="space-y-3 py-2">
                        <div className="flex items-center gap-3 mb-4">
                            <Loader2 size={16} className="text-violet-300 animate-spin shrink-0" />
                            <span className="text-sm text-white/60">AI is reading your reviews…</span>
                        </div>
                        <div className="h-3 bg-white/10 rounded-full animate-pulse w-full" />
                        <div className="h-3 bg-white/10 rounded-full animate-pulse w-11/12" />
                        <div className="h-3 bg-white/10 rounded-full animate-pulse w-4/5" />
                        <div className="h-3 bg-white/10 rounded-full animate-pulse w-2/3" />
                    </div>

                ) : summaryError ? (
                    <div className="flex items-start gap-2.5 bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-4">
                        <AlertCircle size={15} className="text-rose-300 shrink-0 mt-0.5" />
                        <p className="text-xs text-rose-200 leading-relaxed">{summaryError}</p>
                    </div>

                ) : reviewSummary ? (
                    <div className="mb-5">
                        <span
                            aria-hidden
                            className="block text-6xl font-serif text-white/10 leading-none -mb-3 select-none"
                        >
                            "
                        </span>
                        <p className="text-white text-base sm:text-lg font-light leading-relaxed pl-2">
                            {reviewSummary}
                        </p>
                    </div>
                ) : null}

                {/* Sentiment pills */}
                {!summaryLoading && !isEmpty && (
                    <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 transition-colors rounded-full px-3 py-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                            <span className="text-xs text-white font-medium">{positivePct}% Positive</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 transition-colors rounded-full px-3 py-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-300 shrink-0" />
                            <span className="text-xs text-white font-medium">{neutralPct}% Neutral</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 transition-colors rounded-full px-3 py-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                            <span className="text-xs text-white font-medium">{negativePct}% Negative</span>
                        </div>
                        <span className="ml-auto text-[10px] text-white/30 hidden sm:block">
                            Generated by AI · Not a substitute for reading individual reviews
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewsSummary;
