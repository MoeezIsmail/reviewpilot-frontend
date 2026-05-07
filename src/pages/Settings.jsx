import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "../components/toast/ToastProvider.jsx";
import ConnectionCard from "../components/platforms/ConnectionCard.jsx";
import useSettings from "../hooks/useSettings.js";
import InputField from "../components/ui/InputField.jsx";
import Button from "../components/ui/Button.jsx";
import { Pencil, Building2, Tag, X, Check } from "lucide-react";

const BUSINESS_TYPES = [
    "Restaurant", "Hotel", "Cafe", "Bakery", "Gym",
    "Salon", "Clinic", "Retail Store", "Auto Service", "Other"
];

const BUSINESS_TYPE_ICONS = {
    Restaurant: "🍕", Hotel: "🏨", Cafe: "☕", Bakery: "🥐", Gym: "💪",
    Salon: "✂️", Clinic: "🏥", "Retail Store": "🛍️", "Auto Service": "🔧", Other: "➕"
};

const Settings = () => {
    const {
        connections, loading, handleConnectGoogle, handleDisconnect, disconnecting,
        businessForm, setBusinessForm,
        customBusinessType, setCustomBusinessType,
        isEditingBusiness, setIsEditingBusiness,
        savingBusiness, handleSaveBusinessInfo, handleCancelBusinessEdit,
    } = useSettings();
    const { addToast } = useToast();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const google = searchParams.get("google");
        const error = searchParams.get("error");
        if (google === "success") addToast("Google Business connected!", "success");
        else if (error === "state_expired") addToast("Session expired. Try again.", "error");
        else if (error) addToast("Connection failed. Try again.", "error");
    }, []);

    const displayType = businessForm.businessType === "Other"
        ? (customBusinessType || "Other")
        : businessForm.businessType;

    return (
        <div className="max-w-screen space-y-6">
            {/* ── Business Info Card ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Card Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
                            <Building2 size={16} className="text-indigo-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">Business Info</h2>
                            <p className="text-xs text-gray-400">Your business name and category</p>
                        </div>
                    </div>

                    {!isEditingBusiness && (
                        <button
                            onClick={() => setIsEditingBusiness(true)}
                            className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-all"
                        >
                            <Pencil size={12} /> Edit
                        </button>
                    )}
                </div>

                {/* Card Body */}
                <div className="px-6 py-5">
                    {isEditingBusiness ? (
                        <div className="space-y-5">
                            {/* Business Name */}
                            <InputField
                                label="Business Name"
                                placeholder="e.g. Pizza House"
                                value={businessForm.businessName}
                                onChange={(e) => setBusinessForm(prev => ({ ...prev, businessName: e.target.value }))}
                            />

                            {/* Business Type */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-3 block">
                                    Business Type
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                                                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-left text-sm font-medium transition-all ${
                                                    isSelected
                                                        ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                                                        : "bg-white border-gray-200 text-gray-600 hover:border-indigo-200 hover:bg-indigo-50/40"
                                                }`}
                                            >
                                                <span className="text-base leading-none">{BUSINESS_TYPE_ICONS[type]}</span>
                                                <span className="truncate">{type}</span>
                                                {isSelected && (
                                                    <span className="ml-auto shrink-0 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                                                        <Check size={10} strokeWidth={3} className="text-white" />
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Custom input when "Other" is selected */}
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

                            {/* Actions */}
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
                        <div className="space-y-3">
                            {/* Business Name Row */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0">
                                    <Building2 size={16} className="text-gray-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-400 mb-0.5">Business Name</p>
                                    <p className="text-sm font-semibold text-gray-800 truncate">
                                        {businessForm.businessName || <span className="text-gray-400 font-normal">Not set</span>}
                                    </p>
                                </div>
                            </div>

                            {/* Business Type Row */}
                            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0">
                                    <Tag size={16} className="text-gray-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-400 mb-0.5">Business Type</p>
                                    <div className="flex items-center gap-2">
                                        {displayType ? (
                                            <>
                                                <span className="text-base leading-none">
                                                    {BUSINESS_TYPE_ICONS[businessForm.businessType] || "🏢"}
                                                </span>
                                                <p className="text-sm font-semibold text-gray-800">{displayType}</p>
                                            </>
                                        ) : (
                                            <p className="text-sm text-gray-400">Not set</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Connected Accounts Card ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100">
                    <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Connected Accounts</h2>
                        <p className="text-xs text-gray-400">Platforms connected to fetch and reply to reviews</p>
                    </div>
                </div>

                <div className="px-6 py-5">
                    {loading ? (
                        <div className="flex flex-col gap-3">
                            {[1, 2].map(i => (
                                <div key={i} className="border border-gray-100 rounded-xl p-5 animate-pulse">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full" />
                                        <div className="flex-1">
                                            <div className="h-3 bg-gray-200 rounded w-32 mb-2" />
                                            <div className="h-2 bg-gray-100 rounded w-48" />
                                        </div>
                                        <div className="h-8 w-20 bg-gray-200 rounded-lg" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <ConnectionCard
                                icon="https://www.google.com/favicon.ico"
                                name="Google Business Profile"
                                description="Fetch & reply to Google reviews"
                                connected={connections.google.connected}
                                connectedAt={connections.google.connectedAt}
                                onConnect={handleConnectGoogle}
                                onDisconnect={() => handleDisconnect("google")}
                                disconnecting={disconnecting === "google"}
                            />
                            <ConnectionCard
                                icon="https://www.yelp.com/favicon.ico"
                                name="Yelp"
                                description="Fetch & reply to Yelp reviews"
                                connected={connections.yelp.connected}
                                connectedAt={connections.yelp.connectedAt}
                                comingSoon={true}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;
