const AnalyticsCharts = () => {
    return (
        <div className="grid grid-cols-2 gap-6">

            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-4">
                    Review Trends
                </h3>

                <div className="h-40 flex items-center justify-center text-gray-400">
                    Chart here
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold mb-4">
                    Rating Distribution
                </h3>

                <div className="h-40 flex items-center justify-center text-gray-400">
                    Chart here
                </div>
            </div>

        </div>
    )
}

export default AnalyticsCharts;