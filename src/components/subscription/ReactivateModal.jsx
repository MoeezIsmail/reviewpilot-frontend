import { X, Loader2, RotateCcw } from "lucide-react";

const ReactivateModal = ({ onConfirm, onClose, loading }) => (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-start justify-between mb-1">
                <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">Reactivate your plan?</h3>
                <div
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-xl !text-gray-500 dark:!text-gray-400 hover:!text-gray-700 dark:hover:!text-gray-200 hover:!bg-gray-100 dark:hover:!bg-gray-700 cursor-pointer transition-colors"
                >
                    <X size={16} />
                </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Your plan will be <strong className="text-gray-700 dark:text-gray-200">reactivated immediately</strong> and will continue to renew at the end of your current billing period. No new charges will be made today.
            </p>
            <div className="flex gap-3">
                <button
                    onClick={onClose}
                    className="flex-1 py-3 rounded-2xl border !border-gray-200 dark:!border-gray-600 text-sm font-semibold !text-gray-600 dark:!text-gray-300 hover:!bg-gray-50 dark:hover:!bg-gray-700 transition"
                >
                    Never mind
                </button>
                <button
                    onClick={onConfirm}
                    disabled={loading}
                    className="flex-1 py-3 rounded-2xl !bg-emerald-500 !text-white text-sm font-semibold hover:!bg-emerald-600 transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                    {loading
                        ? <Loader2 size={14} className="animate-spin" />
                        : <RotateCcw size={14} />
                    }
                    Yes, Reactivate
                </button>
            </div>
        </div>
    </div>
);

export default ReactivateModal;
