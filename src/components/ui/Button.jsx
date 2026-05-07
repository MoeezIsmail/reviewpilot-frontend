const Button = ({
                    children,
                    onClick,
                    disabled = false,
                    variant = "primary",   // "primary" | "success" | "danger" | "gray" | "outline"
                    size = "md",           // "sm" | "md" | "lg"
                    loading = false,
                    className = "",
                    type = "button",
                    fullWidth = false,
                               }) => {
    const variants = {
        primary: "!bg-indigo-600 text-white hover:!bg-indigo-700",
        success: "!bg-green-500 text-white hover:!bg-green-600",
        danger:  "!bg-red-500 text-white hover:!bg-red-600",
        gray:    "!bg-gray-200 text-gray-700 hover:!bg-gray-300",
        outline: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "p-3 text-base",
    };

    const isDisabled = disabled || loading;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={`
                ${variants[variant]}
                ${sizes[size]}
                ${fullWidth ? "w-full" : ""}
                ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                rounded-lg font-medium transition-all flex items-center justify-center gap-2
                ${className}
            `}
        >
            {children}
        </button>
    );
}

export default Button;
