import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../api/authApi.js";
import { authApi } from "../api/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const signOut = async () => {
        try {
            await authApi.post('/logout');
        } catch (_) {}
        localStorage.removeItem('isGoogleUser');
        setUser(null);
    };

    const clearAuth = () => {
        localStorage.removeItem('isGoogleUser');
        setUser(null);
    };

    const updateUser = (updates) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    const updateAiUsage = (used) => {
        setUser(prev => ({
            ...prev,
            subscription: { ...prev.subscription, aiRepliesUsed: used },
        }));
    };

    // Safe subscription updater — preserves aiRepliesUsed when backend doesn't return it
    const updateSubscription = (freshSub) => {
        setUser(prev => ({
            ...prev,
            subscription: {
                aiRepliesUsed: prev.subscription?.aiRepliesUsed,
                ...freshSub,
            },
        }));
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getProfile();
                setUser(res.data.message);
            } catch (err) {
                if (err.response?.status === 401) {
                    setUser(null);
                } else {
                    setError("Failed to fetch profile, please try again.");
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        fetchProfile();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, updateUser, updateAiUsage, updateSubscription, loading, error, signOut, clearAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
