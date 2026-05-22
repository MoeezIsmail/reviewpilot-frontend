import { Link2 } from "lucide-react";
import ConnectionCard from "../platforms/ConnectionCard.jsx";

const ConnectedAccountsCard = ({ loading, connections, handleConnectGoogle, handleDisconnect, disconnecting }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden h-full">
        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <div className="w-8 h-8 bg-emerald-50 dark:bg-emerald-900/40 rounded-lg flex items-center justify-center">
                <Link2 size={16} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
                <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">Connected Accounts</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Platforms for fetching and replying to reviews</p>
            </div>
        </div>

        <div className="px-6 py-5">
            {loading ? (
                <div className="flex flex-col gap-3">
                    {[1, 2].map(i => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 animate-pulse">
                            <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-xl shrink-0" />
                            <div className="flex-1">
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2" />
                                <div className="h-2 bg-gray-100 dark:bg-gray-600 rounded w-48" />
                            </div>
                            <div className="h-7 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg shrink-0" />
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
                        onDisconnect={() => handleDisconnect("google")}
                        disconnecting={disconnecting === "google"}
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

export default ConnectedAccountsCard;
