import { Star, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react"

const DashboardCards = ({ stats }) => {
    const statsName = [
        { label: "Total Reviews", icon: MessageSquare, value: stats?.totalReviews },
        { label: "Average Rating", icon: Star, value: stats?.averageRating },
        { label: "Positive Reviews", icon: ThumbsUp, value: stats?.positiveReviews },
        { label: "Average Reviews", icon: ThumbsUp, value: stats?.averageReviews },
        { label: "Negative Reviews", icon: ThumbsDown, value: stats?.negativeReviews }
    ];

    return (
        <div className="grid grid-cols-2 xl:grid-cols-5 gap-6">
            {statsName.map((s, i) => (
                <div
                    key={i}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm transition-all duration-300 ease-in-out transform hover:scale-102 hover:shadow-lg"
                >
                    <div className="flex items-center justify-between">
                        <div className="bg-indigo-100 dark:bg-indigo-900/40 p-3 rounded-xl">
                            <s.icon className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />
                        </div>
                        <span className="text-gray-400 dark:text-gray-500 text-sm">{s.label}</span>
                    </div>

                    <div className="text-3xl font-bold mt-8 text-gray-900 dark:text-gray-100">
                        {s.value}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DashboardCards;
