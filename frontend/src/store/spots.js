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

// Spots reducer
const initialState = { spots: {} }; // is this correct? Look at github wiki?
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS:
            const newState = {...state, spots: {...state.spots}};
            newState.spots.allSpots = {};
            action.spots.forEach(spot => { // normalizing my spots data
                newState.spots.allSpots[spot.id] = spot
            });
            return newState;
        default:
            return state;
    }
}

export default spotsReducer;
