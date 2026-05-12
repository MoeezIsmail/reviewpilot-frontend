import { Check } from "lucide-react";

const FeatureRow = ({ label, included = true, checkBg = "bg-indigo-100", checkColor = "text-indigo-600" }) => (
    <li className={`flex items-center gap-2.5 text-sm ${included ? "text-gray-700" : "text-gray-300 line-through"}`}>
        <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${included ? checkBg : "bg-gray-100"}`}>
            <Check size={10} className={included ? checkColor : "text-gray-300"} strokeWidth={3} />
        </span>
        {label}
    </li>
);

export default FeatureRow;
