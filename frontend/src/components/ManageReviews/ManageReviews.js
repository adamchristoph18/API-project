import { useDispatch, useSelector } from "react-redux";
import { getCurrentUsersReviewsThunk } from "../../store/reviews";
import ReviewsList from "../ReviewsList/ReviewsList"
import "./ManageReviews.css";
import { useEffect } from "react";

const ManageReviews = () => {
    const reviewsObj = useSelector(state => state.reviews.user);
    const reviewsArr = Object.values(reviewsObj);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUsersReviewsThunk());
    }, [dispatch]);


    if (!reviewsObj) return null;

    return (
        <div>
            <h1>Manage Reviews</h1>
            {reviewsArr.map(review => (
                <ReviewsList
                    review={review}
                    key={review.id}
                />
            ))}
        </div>
    )
};


export default ManageReviews;
