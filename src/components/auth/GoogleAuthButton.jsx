import { BACKEND_URL } from "../../constants/urls.js";

const GoogleAuthButton = () => {
    const handleGoogleAuth = () => {
        window.location.href = `${BACKEND_URL}/api/auth/google-login`;
    };

    return (
        <button
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-lg hover:bg-gray-50 mb-6"
        >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
            <span className="font-medium">Continue with Google</span>
        </button>
    );
}

export default GoogleAuthButton;
