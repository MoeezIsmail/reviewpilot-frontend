import { useState, useEffect } from "react";
import { useToast } from "../components/ToastProvider.jsx";
import { getConnectionStatus } from "../api/settingsApi.js";
import { BACKEND_URL } from "../constants/urls.js";
import axios from "axios";

const useSettings = () => {
    const { addToast } = useToast();

    const [connections, setConnections] = useState({
        google: { connected: false, connectedAt: null },
        yelp: { connected: false, connectedAt: null },
    });
    const [loading, setLoading] = useState(true);

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

    return {
        connections,
        loading,
        handleConnectGoogle,
    };
}

export default useSettings;