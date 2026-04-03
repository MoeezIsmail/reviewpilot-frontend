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
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {label}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className={`w-full border p-3 rounded-lg text-black transition-all
                    focus:outline-none focus:border-indigo-500
                    ${error ? "border-red-500" : "border-gray-300"}
                `}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}

export default InputField;