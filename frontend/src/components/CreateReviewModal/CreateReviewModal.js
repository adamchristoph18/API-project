import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./CreateReviewModal.css";
// import thunk here

function CreateReviewModal() {
    const [rating, setRating] = useState(1);
    const [activeRating, setActiveRating] = useState(1);
    const [review, setReview] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const dispatch = useDispatch();

    const onSubmit = async event => {
        event.preventDefault();

        const newReview = {
            review,
            stars: rating
        };

        const err = {};
        if (review.length < 10) err.review = "Please make your review at least 10 characters";

        setErrors(err);
        if (Object.keys(errors).length) return;
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
