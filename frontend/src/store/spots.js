import { csrfFetch } from "./csrf";

// Action type constants
const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const CREATE_SPOT = 'reports/CREATE_SPOT';


// Action creators
export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
});


// Thunk action creators
// Get all spots thunk
export const getAllSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const spots = await response.json();
        dispatch(loadSpots(spots));
    }
};

// Create a spot thunk
export const createNewSpotThunk = (payload) => async (dispatch) => {
    const {
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        spotImages
    } = payload;

    const newSpot = {
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    };

    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSpot)
    });

    if (response.ok) {
        const spot = await response.json();

        for (let i = 0; i < spotImages.length; i++) {
            const image = spotImages[i];
            await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(image)
            });
        }

        dispatch(createSpot(spot)); // this line updates the state
        return spot; // this sends the new spot to the frontend

    } else {
        const errors = await response.json();
        return errors;
    }
};

// Spots reducer
const initialState = { allSpots: {}, singleSpot: {} }; // is this correct? Look at github wiki?
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = {...state, allSpots: {...state.allSpots}};
            action.spots.Spots.forEach(spot => { // normalizing my spots data
                newState.allSpots[spot.id] = spot
            });
            return newState;
        }
        case CREATE_SPOT: {
            const newState = {...state, allSpots: {...state.allSpots}};
            newState.allSpots[action.spot.id] = action.spot;
            // console.log("this is my state ----> ", newState);
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer;
