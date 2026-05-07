import { useState, useEffect } from "react";
import { useToast } from "../components/toast/ToastProvider.jsx";
import {disconnectPlatform, getConnectionStatus} from "../api/settingsApi.js";
import { updateBusinessInfo } from "../api/authApi.js";
import { BACKEND_URL } from "../constants/urls.js";
import axios from "axios";
import {useAuth} from "../context/AuthContext.jsx";

const useSettings = () => {
    const { addToast } = useToast();
    const { user, updateUser } = useAuth();

    const [connections, setConnections] = useState({
        google: { connected: false, connectedAt: null },
        yelp: { connected: false, connectedAt: null },
    });

    const [loading, setLoading] = useState(true);
    const [disconnecting, setDisconnecting] = useState(null);

    const [businessForm, setBusinessForm] = useState({
        businessName: user?.businessName || "",
        businessType: user?.businessType || "",
    });
    const [isEditingBusiness, setIsEditingBusiness] = useState(false);
    const [savingBusiness, setSavingBusiness] = useState(false);

    useEffect(() => {
        if (user) {
            setBusinessForm({
                businessName: user.businessName || "",
                businessType: user.businessType || "",
            });
        }
    }, [user]);

    useEffect(() => {
        fetchStatus();
    }, []);

    const fetchStatus = async () => {
        try {
            setLoading(true);
            const res = await getConnectionStatus();
            setConnections(res.data.connections);
        } catch (err) {
            addToast("Failed to load connection status", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleConnectGoogle = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${BACKEND_URL}/api/auth/google/init`,
                {from: 'settings'},
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );
            window.location.href = `${BACKEND_URL}/api/auth/google`;
        } catch (err) {
            addToast("Failed to connect Google. Try again.", "error");
        }
    };

    const handleDisconnect = async (platform) => {
        // Confirm karo
        const confirmed = window.confirm(
            `Are you sure you want to disconnect ${platform === "google" ? "Google Business Profile" : "Yelp"}? Your reviews will no longer be fetched.`
        );
        if (!confirmed) return;

        setDisconnecting(platform);
        try {
            await disconnectPlatform(platform);

            // Local state update karo — real-time
            setConnections((prev) => ({
                ...prev,
                [platform]: { connected: false, connectedAt: null },
            }));

            if (user) {
                updateUser({
                    ...user,
                    platforms: {
                        ...user.platforms,
                        [platform]: null,
                    }
                });
            }

            addToast(`${platform === "google" ? "Google" : "Yelp"} disconnected successfully.`, "success");
        } catch (err) {
            addToast("Failed to disconnect. Try again.", "error");
        } finally {
            setDisconnecting(null);
        }
    };

    const handleSaveBusinessInfo = async () => {
        if (!businessForm.businessName.trim() || !businessForm.businessType) {
            addToast("Business name and type are required.", "error");
            return;
        }
        setSavingBusiness(true);
        try {
            await updateBusinessInfo({
                businessName: businessForm.businessName.trim(),
                businessType: businessForm.businessType,
            });
            updateUser({ ...user, businessName: businessForm.businessName.trim(), businessType: businessForm.businessType });
            addToast("Business info updated successfully.", "success");
            setIsEditingBusiness(false);
        } catch (err) {
            addToast(err.response?.data?.message || "Failed to update business info.", "error");
        } finally {
            setSavingBusiness(false);
        }
    };

    const handleCancelBusinessEdit = () => {
        setBusinessForm({ businessName: user?.businessName || "", businessType: user?.businessType || "" });
        setIsEditingBusiness(false);
    };

    return {
        connections,
        loading,
        disconnecting,
        handleDisconnect,
        handleConnectGoogle,
        businessForm,
        setBusinessForm,
        isEditingBusiness,
        setIsEditingBusiness,
        savingBusiness,
        handleSaveBusinessInfo,
        handleCancelBusinessEdit,
    };
}

export default useSettings;