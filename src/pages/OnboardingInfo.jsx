import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/toast/ToastProvider.jsx";
import { saveBusinessInfo } from "../api/authApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import { ArrowRight } from 'lucide-react';
import InputField from "../components/ui/InputField.jsx";
import Button from "../components/ui/Button.jsx";

const BUSINESS_TYPES = [
    "Restaurant", "Hotel", "Cafe", "Bakery", "Gym",
    "Salon", "Clinic", "Retail Store", "Auto Service", "Other"
];

export default function OnboardingInfo() {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const { updateUser } = useAuth();

    const isGoogleUser = localStorage.getItem("isGoogleUser") === "true";

    const [userName, setUserName] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessType, setBusinessType] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [customBusinessType, setCustomBusinessType] = useState("");

    const validate = () => {
        const newErrors = {};
        if (!isGoogleUser && !userName.trim()) newErrors.userName = "Name is required";

        if (!businessName.trim()) newErrors.businessName = "Business name is required";

        if (!businessType) newErrors.businessType = "Please select a business type";

        if (businessType === "Other" && !customBusinessType.trim()) {
            newErrors.customBusinessType = "Please specify your business type";
        }

        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        setLoading(true);
        const finalType = businessType === "Other" ? customBusinessType : businessType;
        try {
            await saveBusinessInfo({
                userName: isGoogleUser ? null : userName,
                businessName,
                businessType: finalType,
            });
            updateUser({ businessName, businessType: finalType, onboardingCompleted: true });
            addToast("Setup complete!", "success");
            navigate("/");
        } catch (err) {
            addToast(err.response?.data?.message || "Failed to save info", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-screen flex items-center justify-center !bg-gray-50 dark:!bg-gray-900">
            <div className="!bg-white dark:!bg-gray-800 p-10 rounded-xl shadow-lg w-[480px]">

                {/* Progress Indicator */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Connect Platform</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600 mx-2" />
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full !bg-indigo-600 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">2</span>
                        </div>
                        <span className="text-sm font-semibold text-indigo-600">Business Info</span>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-black dark:text-white mb-1">Tell us about your business</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                    This helps us generate better AI replies for your reviews
                </p>

                {!isGoogleUser && (
                    <InputField
                        label="Your Name"
                        placeholder="e.g. John Doe"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        error={errors.userName}
                    />
                )}

                <InputField
                    label="Business Name"
                    placeholder="e.g. Pizza House"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    error={errors.businessName}
                />

                {/* Business Type */}
                <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
                        Business Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {BUSINESS_TYPES.map((type, index) => {
                            const icons = ["🍕","🏨","☕","🥐","💪","✂️","🏥","🛍️","🔧","➕"];
                            const isSelected = businessType === type;
                            return (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => {
                                        setBusinessType(type);
                                        if (type !== "Other") setCustomBusinessType("");
                                    }}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all text-left ${
                                        isSelected
                                            ? "!bg-indigo-50 dark:!bg-indigo-900/40 border-indigo-500"
                                            : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500"
                                    }`}
                                >
                                    <span className="text-base">{icons[index]}</span>
                                    <span className={`text-sm font-medium flex-1 ${isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-gray-700 dark:text-gray-200"}`}>
                        {type}
                    </span>
                                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                        isSelected ? "bg-indigo-600 border-indigo-600" : "border-gray-300 dark:border-gray-500"
                                    }`}>
                        {isSelected && (
                            <svg width="8" height="8" viewBox="0 0 10 10">
                                <polyline points="2,5 4,7 8,3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                            </svg>
                        )}
                    </span>
                                </button>
                            );
                        })}
                    </div>
                    {errors.businessType && <p className="text-red-500 text-sm mt-2">{errors.businessType}</p>}
                </div>

                {businessType === "Other" && (
                    <InputField
                        label=""
                        placeholder="e.g. Photography Studio"
                        value={customBusinessType}
                        onChange={(e) => setCustomBusinessType(e.target.value)}
                        error={errors.customBusinessType}
                    />
                )}

                <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={loading}
                    disabled={loading || (!isGoogleUser && !userName) || !businessName || !businessType || (businessType === "Other" && !customBusinessType.trim())}
                    onClick={handleSubmit}
                >
                    Complete Setup <ArrowRight size={18} />
                </Button>

            </div>
        </div>
    );
}