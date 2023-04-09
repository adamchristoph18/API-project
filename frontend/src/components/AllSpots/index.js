import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";
import SpotCard from "../SpotCard";


const AllSpots = () => {

    const spotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsObj); // turn into array to map below

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch]);

    return (
        <div className="all-spots">
            <div>
                {spots.map(spot => (
                    <SpotCard
                        spot={spot}
                        key={spot.id}
                    />
                ))}
            </div>
        </div>
    )
};

export default AllSpots;
