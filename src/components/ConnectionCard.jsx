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
            connected ? "border-green-300 bg-green-50" :
                comingSoon ? "border-gray-200 opacity-50" :
                    "border-gray-200"
        }`}>
            <div className="flex items-center gap-4">
                <img src={icon} className="w-8 h-8" alt={name}/>
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-black">{name}</p>
                        {comingSoon && (
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                                Coming Soon
                            </span>
                        )}
                        {connected && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                ✓ Connected
                            </span>
                        )}
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5">
                        {connected && connectedAt
                            ? `Connected on ${formatDate(connectedAt)}`
                            : description
                        }
                    </p>
                </div>
            </div>

            {comingSoon ? (
                <button disabled className="bg-gray-100 text-gray-400 text-sm px-4 py-2 rounded-lg cursor-not-allowed">
                    Soon
                </button>
            ) : connected ? (
                <button
                    onClick={onDisconnect}
                    disabled={disconnecting}
                    className="border border-red-200 text-red-500 text-sm px-4 py-2 rounded-lg hover:bg-red-50 transition-all">
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