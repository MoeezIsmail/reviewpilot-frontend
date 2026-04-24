import {useState, useEffect} from "react";
import ReviewRow from "./ReviewRow";
import {useReviews} from "../context/ReviewsContext.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import Lottie from "lottie-react";
import loader from "../assets/loading.json";

const ReviewsTable = () => {
    const [filter, setFilter] = useState("all"); // all / replied / pending
    const [search, setSearch] = useState("");

    const {reviewsData, loadNextPage, loading, setReviewsData, aiReplies} = useReviews();
    const {user} = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            const bottom = document.documentElement.scrollHeight === document.documentElement.scrollTop + window.innerHeight;
            if (bottom && !loading && reviewsData.nextPageToken) {
                loadNextPage(user._id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [reviewsData.nextPageToken, loading, user?._id, loadNextPage]);

    const filteredReviews = reviewsData.reviews
        ?.filter((r) => {
            // Combine server reply + locally generated reply
            const reply = r.aiReply?.trim() || aiReplies[r.review_id]?.reply?.trim() || "";

            if (filter === "replied") return reply !== "";
            if (filter === "pending") return reply === "";
            return true; // all
        })
        ?.filter((r) =>
            r.user.name.toLowerCase().includes(search.toLowerCase()) ||
            r.snippet.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            <div className="py-6 px-4 flex flex-col gap-6">

                {/* Search input */}
                <input
                    placeholder="Search by customer or review..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border bg-gray-50 border-gray-300 rounded-lg p-2 w-2/5 focus:border-indigo-600"
                />

                {/* Filter buttons */}
                <div className="flex gap-2">
                    <button
                        className={`px-4 py-1 rounded-lg font-medium ${
                            filter === "all" ? "!bg-indigo-600 text-white" : "!bg-gray-200"
                        }`}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-1 rounded-lg font-medium ${
                            filter === "replied" ? "!bg-indigo-600 text-white" : "!bg-gray-200"
                        }`}
                        onClick={() => setFilter("replied")}
                    >
                        Replied
                    </button>
                    <button
                        className={`px-4 py-1 rounded-lg font-medium ${
                            filter === "pending" ? "!bg-indigo-600 text-white" : "!bg-gray-200"
                        }`}
                        onClick={() => setFilter("pending")}
                    >
                        Pending
                    </button>
                </div>

                {/* Reviews table */}
                <table className="w-full text-sm border-collapse rounded-lg relative">
                    <thead className="bg-gray-600 text-white sticky top-0">
                    <tr>
                        <th className="p-3 text-left rounded-tl-lg">Customer</th>
                        <th className="p-3">Rating</th>
                        <th className="p-3 text-left">Review</th>
                        <th className="p-3 text-left">AI Reply</th>
                        <th className="p-3 rounded-tr-lg">Actions</th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                    {filteredReviews?.length > 0 ? (
                        filteredReviews?.map((review, i) => (
                            <ReviewRow key={i} review={review}/>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-gray-500">
                                <Lottie animationData={loader} loop={true} className="w-full h-72"/>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                {/* Load More Button */}
                {reviewsData?.nextPageToken && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => loadNextPage(user._id)}
                            disabled={loading}
                            className={`px-4 py-2 rounded-lg text-white ${loading ? '!bg-gray-400' : '!bg-indigo-600'}`}
                        >
                            {loading ? "Loading..." : "Load More Reviews"}
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ReviewsTable;