import { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../api/authApi.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const saveToken = (t) => {
        localStorage.setItem('token', t);
        setToken(t);
    };

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isGoogleUser');
        setToken(null);
        setUser(null);
    }

    const clearAuth = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isGoogleUser');
        setToken(null);
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
            if (!token) {
                setLoading(false);
                setUser(null);
                return;
            }

            try {
                const res = await getProfile();
                setUser(res.data.message);
            } catch (err) {
                setError("Failed to fetch profile, please try again.");
                clearAuth();
            } finally {
                setLoading(false);
            }
        }

        setLoading(true);
        fetchProfile();

    }, [token]);

    return (
        <AuthContext.Provider value={{ user, setUser, updateUser, updateAiUsage, updateSubscription, loading, error, saveToken, signOut, clearAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);