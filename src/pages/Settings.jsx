import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useToast } from "../components/toast/ToastProvider.jsx";
import useSettings from "../hooks/useSettings.js";
import { useAuth } from "../context/AuthContext.jsx";
import BusinessInfoCard from "../components/settings/BusinessInfoCard.jsx";
import ConnectedAccountsCard from "../components/settings/ConnectedAccountsCard.jsx";
import ThemeCard from "../components/settings/ThemeCard.jsx";
import DangerZoneCard from "../components/settings/DangerZoneCard.jsx";
import { ArrowRight, Crown } from "lucide-react";

const PLAN_CONFIG = {
    starter:  { label: "Starter",  bg: "bg-white/20",       text: "text-white",      icon: null },
    growth:   { label: "Growth",   bg: "bg-indigo-200/30",   text: "text-white",      icon: null },
    pro:      { label: "Pro",      bg: "bg-violet-200/30",   text: "text-white",      icon: Crown },
    lifetime: { label: "Lifetime", bg: "bg-amber-200/30",    text: "text-amber-200",  icon: Crown },
};

const getInitials = (name) => {
    if (!name) return "U";
    return name.trim().split(/\s+/).map(w => w[0]).join("").toUpperCase().slice(0, 2);
};

const ProfileCard = ({ user }) => {
    const plan = user?.subscription?.plan || "starter";
    const pc = PLAN_CONFIG[plan] || PLAN_CONFIG.starter;
    const PlanIcon = pc.icon;

    return (
        <div
            className="relative rounded-2xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #6d28d9 100%)" }}
        >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-white/5 rounded-full pointer-events-none" />

            <div className="relative px-6 py-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white text-xl font-bold shrink-0 select-none">
                    {getInitials(user?.name)}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="text-base font-bold text-white leading-tight truncate max-w-[180px]">
                            {user?.name || "User"}
                        </p>
                        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${pc.bg} ${pc.text}`}>
                            {PlanIcon && <PlanIcon size={10} />}
                            {pc.label}
                        </span>
                    </div>
                    <p className="text-sm text-white/65 truncate">{user?.email}</p>
                </div>

                <Link
                    to="/subscription"
                    className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-colors"
                >
                    Manage Plan <ArrowRight size={12} />
                </Link>
            </div>
        </div>
    );
};

const Settings = () => {
    const {
        connections, loading, handleConnectGoogle, handleDisconnect, disconnecting,
        businessForm, setBusinessForm,
        customBusinessType, setCustomBusinessType,
        isEditingBusiness, setIsEditingBusiness,
        savingBusiness, handleSaveBusinessInfo, handleCancelBusinessEdit,
    } = useSettings();
    const { user } = useAuth();
    const { addToast } = useToast();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const google = searchParams.get("google");
        const error = searchParams.get("error");
        if (google === "success") addToast("Google Business connected!", "success");
        else if (error === "state_expired") addToast("Session expired. Try again.", "error");
        else if (error) addToast("Connection failed. Try again.", "error");
    }, []);

    return (
        <div className="space-y-5">
            {/* Page header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Manage your account, business info, and preferences
                </p>
            </div>

            <ProfileCard user={user} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <BusinessInfoCard
                    loading={loading}
                    businessForm={businessForm}
                    setBusinessForm={setBusinessForm}
                    customBusinessType={customBusinessType}
                    setCustomBusinessType={setCustomBusinessType}
                    isEditingBusiness={isEditingBusiness}
                    setIsEditingBusiness={setIsEditingBusiness}
                    savingBusiness={savingBusiness}
                    handleSaveBusinessInfo={handleSaveBusinessInfo}
                    handleCancelBusinessEdit={handleCancelBusinessEdit}
                />
                <ConnectedAccountsCard
                    loading={loading}
                    connections={connections}
                    handleConnectGoogle={handleConnectGoogle}
                    handleDisconnect={handleDisconnect}
                    disconnecting={disconnecting}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <ThemeCard />
                <DangerZoneCard />
            </div>
        </div>
    );
};

export default Settings;
