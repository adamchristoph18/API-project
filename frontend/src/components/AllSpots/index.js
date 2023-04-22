import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import SpotCard from "../SpotCard";
import './AllSpots.css';


const AllSpots = () => {
    // Grab the spots object directly from the store
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsObj); // turn into array to map below

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch]);

    return (
        <div className="all-spots">
            {spots.map(spot => (
                <SpotCard
                    spot={spot}
                    key={spot.id}
                />
            ))}
        </div>
    )
};

export default AllSpots;
