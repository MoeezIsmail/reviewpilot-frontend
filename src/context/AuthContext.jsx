import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
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

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await getProfile();
                setUser(res.data.message);
            } catch (err) {
                setError("Failed to fetch profile, please try again.");
                localStorage.removeItem("token");
            }

            setLoading(false);
        }

        fetchProfile();

    }, [token]);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, error, saveToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);