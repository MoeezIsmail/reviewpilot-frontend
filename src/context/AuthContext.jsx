import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getProfile } from "../api/authApi.js";
import { authApi } from "../api/axios.js";

const AuthContext = createContext();

// Non-sensitive hint: tells us whether an auth cookie likely exists.
// The real auth check is always done server-side via the cookie.
// This avoids an unnecessary getProfile() call (and skeleton flash) for guests.
const SESSION_HINT_KEY = 'rp_session';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(() => !!localStorage.getItem(SESSION_HINT_KEY));
    const [error, setError] = useState(null);

    const signOut = async () => {
        try {
            await authApi.post('/logout');
        } catch (_) {}
        localStorage.removeItem(SESSION_HINT_KEY);
        localStorage.removeItem('isGoogleUser');
        setUser(null);
    };

    const clearAuth = () => {
        localStorage.removeItem(SESSION_HINT_KEY);
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

    const refreshUser = useCallback(async () => {
        setLoading(true);
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
    }, []);

    useEffect(() => {
        // Only fetch profile if we have reason to believe a cookie exists.
        // If no hint, skip the round-trip — guests see auth page immediately.
        if (!localStorage.getItem(SESSION_HINT_KEY)) {
            setLoading(false);
            return;
        }
        refreshUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, updateUser, updateAiUsage, updateSubscription, loading, error, signOut, clearAuth, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
