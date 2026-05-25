import { CheckCircle2 } from "lucide-react";
import PlatformIcon from "./PlatformIcon.jsx";

const PlatformCard = ({ platform, connected, onConnect, isDark = false }) => {
    const baseCard = connected
        ? isDark
            ? 'bg-emerald-500/10 border-emerald-500/25'
            : 'bg-emerald-50 border-emerald-200'
        : !platform.available
            ? isDark
                ? 'bg-white/[0.02] border-white/[0.06] opacity-50'
                : 'bg-gray-50/50 border-gray-100 opacity-55'
            : isDark
                ? 'bg-white/[0.05] border-white/[0.09] hover:border-indigo-400/30 hover:bg-white/[0.08]'
                : 'bg-white/60 border-indigo-100/70 hover:border-indigo-200 hover:bg-white/80';

    return (
        <div className={`rounded-xl p-3.5 flex items-center justify-between transition-all border ${baseCard}`}>
            <div className="flex items-center gap-3 min-w-0">
                <PlatformIcon platform={platform} />
                <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <p className={`font-semibold text-sm truncate ${isDark ? 'text-white/90' : 'text-gray-900'}`}>
                            {platform.name}
                        </p>
                        {!platform.available && (
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0
                                ${isDark ? 'bg-white/10 text-white/40' : 'bg-gray-100 text-gray-400'}`}>
                                Soon
                            </span>
                        )}
                        {connected && (
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0
                                ${isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                                ✓ Connected
                            </span>
                        )}
                    </div>
                    <p className={`text-xs mt-0.5 truncate ${isDark ? 'text-white/35' : 'text-gray-500'}`}>
                        {platform.description}
                    </p>
                </div>
            </div>

            <div className="shrink-0 ml-3">
                {connected ? (
                    <CheckCircle2 size={19} className="text-emerald-500" />
                ) : platform.available ? (
                    <button
                        onClick={onConnect}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                            ${isDark
                                ? 'bg-indigo-500/80 hover:bg-indigo-500 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'}
                        `}
                    >
                        Connect
                    </button>
                ) : (
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-medium
                        ${isDark ? 'text-white/20' : 'text-gray-300'}`}>
                        Soon
                    </span>
                )}
            </div>
        </div>
    );
};

export default PlatformCard;
