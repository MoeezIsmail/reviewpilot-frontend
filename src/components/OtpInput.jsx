const OtpInput = ({
    otp,
    onChange,
    onKeyDown,
    error
}) => {
    return (
        <div className="mb-4">
            <div className="flex gap-2 justify-between">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => onChange(index, e.target.value)}
                        onKeyDown={(e) => onKeyDown(index, e)}
                        className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg text-black focus:border-indigo-500 focus:outline-none"
                    />
                ))}
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
    );
}

export default OtpInput;