import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";


const AllSpots = () => {

    const spotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsObj); // turn into array to map below

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch]);

    return ( // should create extra component for spot card
        <div className="all-spots">
            <ul>
                {/* {spots.map(spot => (

                ))} */}
            </ul>
        </div>
    )
};

export default AllSpots;
