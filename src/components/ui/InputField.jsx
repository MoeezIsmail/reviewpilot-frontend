const InputField = ({
                        label,
                        type = "text",
                        placeholder,
                        value,
                        onChange,
                        onKeyDown,
                        error,
                        className = "",
                    }) => {
    return (
        <div className={`${className}`}>
            {label && (
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className={`w-full border p-3 rounded-lg transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:border-indigo-500
                    ${error ? "border-red-500" : "border-gray-300 dark:border-gray-600"}
                `}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}

export default InputField;
