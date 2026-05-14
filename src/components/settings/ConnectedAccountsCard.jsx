import ConnectionCard from "../platforms/ConnectionCard.jsx";

const ConnectedAccountsCard = ({ loading, connections, handleConnectGoogle, handleDisconnect, disconnecting }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <div className="w-8 h-8 bg-green-50 dark:bg-green-900/40 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
            </div>
            <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Connected Accounts</h2>
                <p className="text-xs text-gray-400 dark:text-gray-500">Platforms connected to fetch and reply to reviews</p>
            </div>
        </div>

        <div className="px-6 py-5">
            {loading ? (
                <div className="flex flex-col gap-3">
                    {[1, 2].map(i => (
                        <div key={i} className="border border-gray-100 dark:border-gray-700 rounded-xl p-5 animate-pulse">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
                                <div className="flex-1">
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2" />
                                    <div className="h-2 bg-gray-100 dark:bg-gray-600 rounded w-48" />
                                </div>
                                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg" />
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
