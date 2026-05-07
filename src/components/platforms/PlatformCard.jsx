import {CheckCircle2} from "lucide-react";
import Button from "../ui/Button.jsx";
import PlatformIcon from "./PlatformIcon.jsx";

const PlatformCard = ({ platform, connected, onConnect }) => {
    return (
        <div className={`border rounded-xl p-4 flex items-center justify-between transition-all ${
            connected
                ? "border-green-300 bg-green-50"
                : !platform.available
                    ? "border-gray-100 bg-gray-50 opacity-60"
                    : "border-gray-200 hover:border-indigo-200"
        }`}>
            <div className="flex items-center gap-3">
                <PlatformIcon platform={platform} />
                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-black">{platform.name}</p>
                        {!platform.available && (
                            <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                                Soon
                            </span>
                        )}
                        {connected && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                ✓ Connected
                            </span>
                        )}
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5">{platform.description}</p>
                </div>
            </div>

            {connected ? (
                <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
            ) : platform.available ? (
                <Button variant="primary" size="sm" onClick={onConnect}>
                    Connect
                </Button>
            ) : (
                <Button variant="gray" size="sm" disabled>
                    Soon
                </Button>
            )}
        </div>
    );
};

export default PlatformCard;
