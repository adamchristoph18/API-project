import { csrfFetch } from "./csrf";

// Action type constants
const LOAD_SPOTS = 'spots/LOAD_SPOTS';



// Action creators
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});


// Thunk action creators

// Get all spots thunk
export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = response.json();
        dispatch(loadSpots(spots));
    }
};
