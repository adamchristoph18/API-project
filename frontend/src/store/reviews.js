import { csrfFetch } from "./csrf";

// Action type constants
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';

// Action creators
export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
});

// Thunk action creators
// Get all reviews for a spot thunk
export const getReviewsForSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviewsObj = await response.json();
        const reviews = reviewsObj.Reviews;
        dispatch(loadReviews(reviews));

        return reviews;
    }
};

// Create a review thunk
// export const createAReviewThunk = (spotId) => async (dispatch) => {
//     const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

//     if (response.ok) {

//     }
// };

// Reviews reducer
const initialState = { spot: {}, user: {} };
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = {...state, spot: {}};
            action.reviews.forEach(review => {
                newState.spot[review.id] = review
            });
            return newState;
        }
        default:
            return state;
    }
}

export default reviewsReducer;
