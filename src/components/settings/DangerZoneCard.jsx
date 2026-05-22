import { useState } from "react";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { deleteAccount } from "../../api/authApi.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../toast/ToastProvider.jsx";

const DangerZoneCard = () => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const [deleting, setDeleting] = useState(false);
    const { signOut } = useAuth();
    const { addToast } = useToast();

    const CONFIRM_PHRASE = "DELETE MY ACCOUNT";

    const handleDelete = async () => {
        if (confirmText !== CONFIRM_PHRASE) return;
        setDeleting(true);
        try {
            await deleteAccount();
            addToast("Account deleted. Goodbye!", "success");
            signOut();
        } catch {
            addToast("Failed to delete account. Please try again.", "error");
            setDeleting(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-red-100 dark:border-red-900/40 overflow-hidden h-full">
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-red-100 dark:border-red-900/40">
                <div className="w-8 h-8 bg-red-50 dark:bg-red-900/40 rounded-lg flex items-center justify-center">
                    <AlertTriangle size={16} className="text-red-500" />
                </div>
                <div>
                    <h2 className="text-base font-semibold text-red-700 dark:text-red-400">Danger Zone</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Irreversible and destructive actions</p>
                </div>
            </div>

            <div className="px-6 py-5">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Delete Account</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Permanently delete your account and all associated data. This cannot be undone.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 border border-red-200 dark:border-red-800 transition-colors"
                    >
                        <Trash2 size={14} />
                        Delete
                    </button>
                </div>
            </div>

            {/* Confirmation modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6 max-w-md w-full">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={22} className="text-red-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 text-center mb-2">
                            Delete Your Account?
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-5 leading-relaxed">
                            This will permanently delete your account, all reviews data, and cancel your subscription.
                            <strong className="text-gray-800 dark:text-gray-200 block mt-2">This action cannot be undone.</strong>
                        </p>

                        <div className="mb-4">
                            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1.5">
                                Type <span className="font-bold text-red-500">{CONFIRM_PHRASE}</span> to confirm
                            </label>
                            <input
                                type="text"
                                value={confirmText}
                                onChange={e => setConfirmText(e.target.value)}
                                placeholder={CONFIRM_PHRASE}
                                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => { setShowConfirm(false); setConfirmText(""); }}
                                className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={confirmText !== CONFIRM_PHRASE || deleting}
                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                            >
                                {deleting ? (
                                    <>
                                        <Loader2 size={14} className="animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    "Delete Account"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DangerZoneCard;
