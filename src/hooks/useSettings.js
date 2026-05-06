import { useState, useEffect } from "react";
import { useToast } from "../components/ToastProvider.jsx";
import {disconnectPlatform, getConnectionStatus} from "../api/settingsApi.js";
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

    return {
        connections,
        loading,
        disconnecting,
        handleDisconnect,
        handleConnectGoogle,
    };
}

export default useSettings;