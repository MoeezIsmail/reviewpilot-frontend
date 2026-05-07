import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "../components/toast/ToastProvider.jsx";
import ConnectionCard from "../components/platforms/ConnectionCard.jsx";
import useSettings from "../hooks/useSettings.js";
import InputField from "../components/ui/InputField.jsx";
import Button from "../components/ui/Button.jsx";
import { Pencil } from "lucide-react";

const BUSINESS_TYPES = [
    "Restaurant", "Hotel", "Cafe", "Bakery", "Gym",
    "Salon", "Clinic", "Retail Store", "Auto Service", "Other"
];

const Settings = () => {
    const {
        connections, loading, handleConnectGoogle, handleDisconnect, disconnecting,
        businessForm, setBusinessForm,
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

    return (
        <div className="max-w-2xl space-y-6">
            <p className="!text-gray-500 text-lg">
                Manage your connected platforms and account preferences
            </p>

            {/* Business Info Section */}
            <div className="!bg-white rounded-xl shadow-sm border !border-gray-200 p-6">
                <div className="flex items-center justify-between mb-1">
                    <h2 className="text-base font-semibold !text-gray-800">Business Info</h2>
                    {!isEditingBusiness && (
                        <button
                            onClick={() => setIsEditingBusiness(true)}
                            className="flex items-center gap-1.5 text-sm text-indigo-600 hover:underline"
                        >
                            <Pencil size={14} /> Edit
                        </button>
                    )}
                </div>
                <p className="!text-gray-400 text-sm mb-5">
                    Update your business name and type
                </p>

                {isEditingBusiness ? (
                    <div className="space-y-4">
                        <InputField
                            label="Business Name"
                            placeholder="e.g. Pizza House"
                            value={businessForm.businessName}
                            onChange={(e) => setBusinessForm(prev => ({ ...prev, businessName: e.target.value }))}
                        />

                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                Business Type
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {BUSINESS_TYPES.map((type) => {
                                    const isSelected = businessForm.businessType === type;
                                    return (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setBusinessForm(prev => ({ ...prev, businessType: type }))}
                                            className={`px-4 py-2.5 rounded-lg border-2 text-left text-sm font-medium transition-all ${
                                                isSelected
                                                    ? "!bg-indigo-50 border-indigo-500 text-indigo-600"
                                                    : "bg-white border-gray-200 text-gray-700 hover:border-indigo-300"
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex gap-3 pt-1">
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
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <span className="text-sm text-gray-500">Business Name</span>
                            <span className="text-sm font-medium text-gray-800">
                                {businessForm.businessName || <span className="text-gray-400">Not set</span>}
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <span className="text-sm text-gray-500">Business Type</span>
                            <span className="text-sm font-medium text-gray-800">
                                {businessForm.businessType || <span className="text-gray-400">Not set</span>}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Connected Accounts Section */}
            <div className="!bg-white rounded-xl shadow-sm border !border-gray-200 p-6">
                <h2 className="text-base font-semibold !text-gray-800 mb-1">
                    Connected Accounts
                </h2>
                <p className="!text-gray-400 text-sm mb-5">
                    Connect your review platforms to fetch and reply to reviews
                </p>

                {loading ? (
                    <div className="flex flex-col gap-3">
                        {[1, 2].map(i => (
                            <div key={i} className="border !border-gray-100 rounded-xl p-5 animate-pulse">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 !bg-gray-200 rounded-full" />
                                    <div className="flex-1">
                                        <div className="h-3 !bg-gray-200 rounded w-32 mb-2" />
                                        <div className="h-2 !bg-gray-100 rounded w-48" />
                                    </div>
                                    <div className="h-8 w-20 !bg-gray-200 rounded-lg" />
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
    );
}

export default Settings;
