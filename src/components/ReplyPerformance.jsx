const ReplyPerformance = () => {

    const stats = [
        { label: "Auto-replied", value: 72, color: "bg-orange-500" },
        { label: "Manually edited", value: 18, color: "bg-yellow-400" },
        { label: "Pending", value: 10, color: "bg-red-500" }
    ]

    return (
        <div className="bg-white rounded-xl shadow-sm p-6 h-72 sticky top-0 z-10">

            <h2 className="text-lg font-semibold mb-6">
                Reply Performance
            </h2>

            <div className="space-y-6">

                {stats.map((s, i) => (

                    <div key={i}>

                        <div className="flex justify-between text-sm mb-2">
                            <span>{s.label}</span>
                            <span className="font-medium">{s.value}%</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2">

                            <div
                                className={`${s.color} h-2 rounded-full`}
                                style={{ width: `${s.value}%` }}
                            />

                        </div>

                    </div>

                ))}

            </div>

        </div>
    )
}

export default ReplyPerformance