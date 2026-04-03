import {useState} from "react";

const PlatformIcon = ({ platform }) => {
    const [imgError, setImgError] = useState(false);

    if (!platform.icon || imgError) {
        return (
            <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: platform.color || "#6B7280" }}
            >
                {platform.initials}
            </div>
        );
    }

    return (
        <img
            src={platform.icon}
            className="w-8 h-8 rounded-lg flex-shrink-0"
            alt={platform.name}
            onError={() => setImgError(true)}
        />
    );
};

export default PlatformIcon;