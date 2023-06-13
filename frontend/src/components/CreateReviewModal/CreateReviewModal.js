import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAReviewThunk,
         getReviewsForSpotThunk,
         updateReviewThunk,
         getCurrentUsersReviewsThunk } from "../../store/reviews";
import { displaySpotThunk } from '../../store/spots';
import "./CreateReviewModal.css";

function CreateReviewModal({ spotId, oldReview }) {
    const [rating, setRating] = useState(1);
    const [activeRating, setActiveRating] = useState(oldReview?.stars || 1);
    const [review, setReview] = useState(oldReview?.review || "");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    useEffect(() => {
        getReviewsForSpotThunk();
    }, [dispatch]);

    const onSubmit = async event => {
        event.preventDefault();

        const newReview = {
            spotId,
            review,
            stars: rating
        };

        const updatedReview = {
            user: sessionUser,
            id: oldReview?.id,
            review,
            stars: rating
        };

        const err = {};
        if (review.length < 10) err.review = "Please make your review at least 10 characters";

        setErrors(err);
        if (Object.keys(errors).length) return;

        const retReview = oldReview ? await dispatch(updateReviewThunk(updatedReview)) : await dispatch(createAReviewThunk(newReview));

        if (retReview.errors) {
            setErrors(retReview.errors);
        } else {
            dispatch(getReviewsForSpotThunk(spotId));
            dispatch(getCurrentUsersReviewsThunk());
            dispatch(displaySpotThunk(spotId));
            closeModal();
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="create-review-mdl">
                <h2 className="how-was-your-stay">How was your stay?</h2>
                <textarea
                    className="new-review-text"
                    placeholder="Just a quick review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <p className="errors-modal">{errors.review}</p>
                <div className="star-average-rating-input">
                    <div
                        className={activeRating >= 1 ? "star-filled" : "star-empty"}
                        onMouseEnter={() => {
                            setActiveRating(1)
                        }}
                        onMouseLeave={() => {
                            setActiveRating(activeRating)
                        }}
                        onClick={() => {
                            setRating(1);
                        }}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" />
                    </div>
                    <div
                        className={activeRating >= 2 ? "star-filled" : "star-empty"}
                        onMouseEnter={() => {
                            setActiveRating(2)
                        }}
                        onMouseLeave={() => {
                            setActiveRating(activeRating)
                        }}
                        onClick={() => {
                            setRating(2);
                        }}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" />
                    </div>
                    <div
                        className={activeRating >= 3 ? "star-filled" : "star-empty"}
                        onMouseEnter={() => {
                            setActiveRating(3)
                        }}
                        onMouseLeave={() => {
                            setActiveRating(activeRating)
                        }}
                        onClick={() => {
                            setRating(3);
                        }}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" />
                    </div>
                    <div
                        className={activeRating >= 4 ? "star-filled" : "star-empty"}
                        onMouseEnter={() => {
                            setActiveRating(4)
                        }}
                        onMouseLeave={() => {
                            setActiveRating(activeRating)
                        }}
                        onClick={() => {
                            setRating(4);
                        }}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" />
                    </div>
                    <div
                        className={activeRating >= 5 ? "star-filled" : "star-empty"}
                        onMouseEnter={() => {
                            setActiveRating(5)
                        }}
                        onMouseLeave={() => {
                            setActiveRating(activeRating)
                        }}
                        onClick={() => {
                            setRating(5);
                        }}
                    >
                        <i className="fa-solid fa-star medium-big-star clickable" />
                    </div>
                </div>

                <button
                    type="submit"
                    className="submit-your-review-btn clickable"
                >
                    Submit your review
                </button>
            </div>
        </form>
    )
}

export default CreateReviewModal;
