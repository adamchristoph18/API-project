import { useDispatch, useSelector } from "react-redux";
import { getCurrentUsersReviewsThunk } from "../../store/reviews";
import ReviewsList from "../ReviewsList/ReviewsList"
import "./ManageReviews.css";
import { useEffect } from "react";

const ManageReviews = () => {
    const reviewsObj = useSelector(state => state.reviews.user);
    const reviewsArr = Object.values(reviewsObj).reverse();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUsersReviewsThunk());
    }, [dispatch, reviewsArr.length]);

    if (!reviewsObj) return null;

    return (
        <div className="manage-reviews-div">
            <h1>Manage Reviews</h1>
            {reviewsArr.length === 0 ? <p>You have not posted any reviews yet!</p>
            : reviewsArr.map(review => (
                <ReviewsList
                    review={review}
                    key={review.id}
                />
            ))}
        </div>
    )
};


export default ManageReviews;
