import ReviewsTable from "../components/ReviewTable"
import {useReviews} from "../context/ReviewsContext.jsx";
import {useEffect} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";
import {useToast} from "../components/ToastProvider.jsx";

export default function Reviews() {
    const { loading: authLoading } = useAuth();
    const { isAnyPlatformConnected } = useReviews();
    const navigate = useNavigate();
    const {addToast} = useToast();

    useEffect(() => {
        if (!authLoading && isAnyPlatformConnected === false) {
            addToast('No platform connected!', 'error');
            navigate('/settings');
        }
    }, [isAnyPlatformConnected, authLoading]);


    return <ReviewsTable />

}