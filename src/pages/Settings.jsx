import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../components/toast/ToastProvider.jsx";
import useSettings from "../hooks/useSettings.js";
import BusinessInfoCard from "../components/settings/BusinessInfoCard.jsx";
import ConnectedAccountsCard from "../components/settings/ConnectedAccountsCard.jsx";
import ThemeCard from "../components/settings/ThemeCard.jsx";
import DangerZoneCard from "../components/settings/DangerZoneCard.jsx";
import { Settings2 } from "lucide-react";

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

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Settings2 size={18} className="text-indigo-500" />
                    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage your business profile, connected platforms, and account preferences.
                </p>
            </div>

            <BusinessInfoCard
                loading={loading}
                businessForm={businessForm}
                setBusinessForm={setBusinessForm}
                customBusinessType={customBusinessType}
                setCustomBusinessType={setCustomBusinessType}
                isEditingBusiness={isEditingBusiness}
                setIsEditingBusiness={setIsEditingBusiness}
                savingBusiness={savingBusiness}
                handleSaveBusinessInfo={handleSaveBusinessInfo}
                handleCancelBusinessEdit={handleCancelBusinessEdit}
            />
            <ConnectedAccountsCard
                loading={loading}
                connections={connections}
                handleConnectGoogle={handleConnectGoogle}
                handleDisconnect={handleDisconnect}
                disconnecting={disconnecting}
            />
            <ThemeCard />
            <DangerZoneCard />
        </div>
    );
};

export default Settings;
