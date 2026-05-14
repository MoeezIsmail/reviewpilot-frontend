import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "../components/toast/ToastProvider.jsx";
import useSettings from "../hooks/useSettings.js";
import BusinessInfoCard from "../components/settings/BusinessInfoCard.jsx";
import ConnectedAccountsCard from "../components/settings/ConnectedAccountsCard.jsx";
import ThemeCard from "../components/settings/ThemeCard.jsx";

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
        <div className="max-w-screen space-y-6">
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
        </div>
    );
};

export default Settings;
