import { Pencil, Building2, Tag, Check, X } from "lucide-react";
import InputField from "../ui/InputField.jsx";
import Button from "../ui/Button.jsx";
import { BUSINESS_TYPES, BUSINESS_TYPE_ICONS } from "../../constants/businessMeta.js";

const BusinessInfoCard = ({
    loading,
    businessForm, setBusinessForm,
    customBusinessType, setCustomBusinessType,
    isEditingBusiness, setIsEditingBusiness,
    savingBusiness, handleSaveBusinessInfo, handleCancelBusinessEdit,
}) => {
    const displayType = businessForm.businessType === "Other"
        ? (customBusinessType || "Other")
        : businessForm.businessType;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden h-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg flex items-center justify-center">
                        <Building2 size={16} className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">Business Info</h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Your business name and category</p>
                    </div>
                </div>
                {loading ? (
                    <div className="h-7 w-14 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse" />
                ) : !isEditingBusiness && (
                    <button
                        onClick={() => setIsEditingBusiness(true)}
                        className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 px-3 py-1.5 rounded-lg transition-all"
                    >
                        <Pencil size={12} /> Edit
                    </button>
                )}
            </div>

            <div className="px-6 py-5">
                {loading ? (
                    <div className="space-y-3 animate-pulse">
                        <div className="h-16 bg-gray-50 dark:bg-gray-700/50 rounded-xl" />
                        <div className="h-16 bg-gray-50 dark:bg-gray-700/50 rounded-xl" />
                    </div>
                ) : isEditingBusiness ? (
                    <div className="space-y-4">
                        <InputField
                            label="Business Name"
                            placeholder="e.g. Pizza House"
                            value={businessForm.businessName}
                            onChange={(e) => setBusinessForm(prev => ({ ...prev, businessName: e.target.value }))}
                        />

                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5 block">
                                Business Type
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {BUSINESS_TYPES.map((type) => {
                                    const isSelected = businessForm.businessType === type;
                                    return (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => {
                                                setBusinessForm(prev => ({ ...prev, businessType: type }));
                                                if (type !== "Other") setCustomBusinessType("");
                                            }}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                                                isSelected
                                                    ? "bg-indigo-50 dark:bg-indigo-900/40 border-indigo-500 text-indigo-700 dark:text-indigo-300"
                                                    : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-indigo-200 hover:bg-indigo-50/40 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/20"
                                            }`}
                                        >
                                            <span className="text-base leading-none">{BUSINESS_TYPE_ICONS[type]}</span>
                                            <span className="truncate flex-1">{type}</span>
                                            {isSelected && (
                                                <span className="shrink-0 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                                                    <Check size={10} strokeWidth={3} className="text-white" />
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                            {businessForm.businessType === "Other" && (
                                <div className="mt-3">
                                    <InputField
                                        placeholder="Describe your business type, e.g. Photography Studio"
                                        value={customBusinessType}
                                        onChange={(e) => setCustomBusinessType(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex gap-2 pt-1">
                            <Button
                                variant="primary"
                                onClick={handleSaveBusinessInfo}
                                loading={savingBusiness}
                                disabled={savingBusiness}
                            >
                                Save Changes
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleCancelBusinessEdit}
                                disabled={savingBusiness}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/40 rounded-xl">
                            <div className="w-9 h-9 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center shrink-0">
                                <Building2 size={15} className="text-indigo-500 dark:text-indigo-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Business Name</p>
                                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                                    {businessForm.businessName || <span className="font-normal text-gray-400 dark:text-gray-500">Not set</span>}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/40 rounded-xl">
                            <div className="w-9 h-9 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg flex items-center justify-center shrink-0">
                                <Tag size={15} className="text-indigo-500 dark:text-indigo-400" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">Business Type</p>
                                {displayType ? (
                                    <div className="flex items-center gap-2">
                                        <span className="text-base leading-none">
                                            {BUSINESS_TYPE_ICONS[businessForm.businessType] || "🏢"}
                                        </span>
                                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{displayType}</p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-400 dark:text-gray-500">Not set</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusinessInfoCard;
