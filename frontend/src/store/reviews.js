import { csrfFetch } from "./csrf";

// Action type constants
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
const GET_USERS_REVIEWS = 'reviews/GET_USERS_REVIEWS';
const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';

// Action creators
export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

export const getUsersReviews = (reviews) => ({
    type: GET_USERS_REVIEWS,
    reviews
})

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    review
});

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});

export const updateReview = (review) => ({
    type: UPDATE_REVIEW,
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

// Get all of the current user's reviews thunk
export const getCurrentUsersReviewsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews/current');

    if (response.ok) {
        const reviewsObj = await response.json();
        const reviews = reviewsObj.Reviews;
        dispatch(getUsersReviews(reviews));

        return reviews;
    }
}

// Create a review thunk
export const createAReviewThunk = (payload) => async (dispatch) => {
    const { spotId, review, stars } = payload;
    const newReview = { review, stars };

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newReview)
    });

    if (response.ok) {
        const review = await response.json();
        dispatch(createReview(review));
        return review;
    } else {
        const errResponse = await response.json();
        return errResponse;
    }
};

// Delete a review thunk
export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(deleteReview(reviewId));
    }
};

// Update a review thunk
export const updateReviewThunk = (payload) => async (dispatch) => {
    const {
        user,
        id,
        review,
        stars
    } = payload;

    const newReview = { review, stars };
    console.log('yeeeet -------> ', newReview);
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newReview)
    });

    if (response.ok) {
        const review = await response.json();
        review.User = user;

        dispatch(updateReview(review));
        return review;
    } else {
        const errResponse = await response.json();
        return errResponse;
    }
};

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
        case GET_USERS_REVIEWS: {
            const newState = {...state, user: {}};
            action.reviews.forEach(review => {
                newState.user[review.id] = review
            });
            return newState;
        }
        case CREATE_REVIEW: {
            const newState = {...state, spot: {...state.spot}};
            newState.spot[action.review.id] = action.review;
            return newState;
        }
        case DELETE_REVIEW: {
            const newState = {...state, spot: {...state.spot}, user: {...state.user}};
            delete newState.spot[action.reviewId];
            delete newState.user[action.reviewId];
            return newState;
        }
        case UPDATE_REVIEW: {
            const newState = {...state, spot: {...state.spot}, user: {...state.user}};
            newState.spot[action.review.id] = action.review;
            newState.user[action.review.id] = action.review;
            return newState;
        }
        default:
            return state;
    }
}

export default reviewsReducer;
