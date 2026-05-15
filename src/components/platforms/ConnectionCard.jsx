const ConnectionCard = ({
                            icon,
                            name,
                            description,
                            connected,
                            connectedAt,
                            onConnect,
                            onDisconnect,
                            disconnecting,
                            comingSoon = false,
                        }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return null;
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    return (
        <div className={`border rounded-xl p-5 flex items-center justify-between transition-all ${
            connected ? "border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950/30" :
                comingSoon ? "border-gray-200 dark:border-gray-700 opacity-50" :
                    "border-gray-200 dark:border-gray-700"
        }`}>
            <div className="flex items-center gap-4">
                <img src={icon} className="w-8 h-8" alt={name}/>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{name}</p>
                        {comingSoon && (
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-full">
                                Coming Soon
                            </span>
                        )}
                        {connected && (
                            <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                                ✓ Connected
                            </span>
                        )}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                        {connected && connectedAt
                            ? `Connected on ${formatDate(connectedAt)}`
                            : description
                        }
                    </p>
                </div>
            </div>

            {comingSoon ? (
                <button disabled className="bg-gray-100 dark:bg-gray-700 text-gray-400 text-sm px-4 py-2 rounded-lg cursor-not-allowed">
                    Soon
                </button>
            ) : connected ? (
                <button
                    onClick={onDisconnect}
                    disabled={disconnecting}
                    className="border border-red-200 dark:border-red-800 text-red-500 dark:text-red-400 text-sm px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-all">
                    Disconnect
                </button>
            ) : (
                <button
                    onClick={onConnect}
                    className="!bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:!bg-indigo-700"
                >
                    Connect
                </button>
            )}
        </div>
    );
}

export default ConnectionCard;
