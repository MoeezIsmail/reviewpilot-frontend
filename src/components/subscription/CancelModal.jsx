import { X, Loader2 } from "lucide-react";

const CancelModal = ({ onConfirm, onClose, loading }) => (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-start justify-between mb-1">
                <h3 className="font-bold text-gray-900 text-lg">Cancel your plan?</h3>
                <div
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-xl !text-gray-400 hover:!text-gray-700 hover:!bg-gray-100 transition-colors"
                >
                    <X size={16} />
                </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">
                Your plan will be downgraded to <strong className="text-gray-700">Starter (Free)</strong> immediately and paid features will be disabled.
            </p>
            <div className="flex gap-3">
                <button
                    onClick={onClose}
                    className="flex-1 py-3 rounded-2xl border !border-gray-200 text-sm font-semibold !text-gray-600 hover:!bg-gray-50 transition"
                >
                    Keep Plan
                </button>
                <button
                    onClick={onConfirm}
                    disabled={loading}
                    className="flex-1 py-3 rounded-2xl !bg-red-500 !text-white text-sm font-semibold hover:!bg-red-600 transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                    {loading && <Loader2 size={14} className="animate-spin" color={'indigo'} />}
                    Yes, Cancel
                </button>
            </div>
        </div>
    </div>
);

export default CancelModal;
