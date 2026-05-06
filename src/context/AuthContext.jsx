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
        localStorage.setItem('token', null);
        setToken(null);
    }

    const clearAuth = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isGoogleUser');
        setToken(null);
        setUser(null);
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
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
        <AuthContext.Provider value={{ user, setUser, updateUser, loading, error, saveToken, signOut, clearAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);