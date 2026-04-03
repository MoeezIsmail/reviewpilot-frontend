import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "../components/ToastProvider.jsx";
import ConnectionCard from "../components/ConnectionCard.jsx";
import useSettings from "../hooks/useSettings.js";

const Settings = () => {
    const { connections, loading, handleConnectGoogle } = useSettings();
    const { addToast } = useToast();
    const [searchParams] = useSearchParams();

    // Google callback handle karo
    useEffect(() => {
        const google = searchParams.get("google");
        const error = searchParams.get("error");

        if (google === "success") addToast("Google Business connected!", "success");
        if (error === "state_expired") addToast("Session expired. Try again.", "error");
        if (error) addToast("Connection failed. Try again.", "error");
    }, []);

    return (
        <div className="max-w-2xl">
            <p className="!text-gray-500 text-lg mb-8">
                Manage your connected platforms and account preferences
            </p>

            {/* Connected Accounts Section */}
            <div className="!bg-white rounded-xl shadow-sm border !border-gray-200 p-6">
                <h2 className="text-base font-semibold !text-gray-800 mb-1">
                    Connected Accounts
                </h2>
                <p className="!text-gray-400 text-sm mb-5">
                    Connect your review platforms to fetch and reply to reviews
                </p>

                {loading ? (
                    <div className="flex flex-col gap-3">
                        {[1, 2].map(i => (
                            <div key={i} className="border !border-gray-100 rounded-xl p-5 animate-pulse">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 !bg-gray-200 rounded-full" />
                                    <div className="flex-1">
                                        <div className="h-3 !bg-gray-200 rounded w-32 mb-2" />
                                        <div className="h-2 !bg-gray-100 rounded w-48" />
                                    </div>
                                    <div className="h-8 w-20 !bg-gray-200 rounded-lg" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <ConnectionCard
                            icon="https://www.google.com/favicon.ico"
                            name="Google Business Profile"
                            description="Fetch & reply to Google reviews"
                            connected={connections.google.connected}
                            connectedAt={connections.google.connectedAt}
                            onConnect={handleConnectGoogle}
                        />
                        <ConnectionCard
                            icon="https://www.yelp.com/favicon.ico"
                            name="Yelp"
                            description="Fetch & reply to Yelp reviews"
                            connected={connections.yelp.connected}
                            connectedAt={connections.yelp.connectedAt}
                            comingSoon={true}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Settings;