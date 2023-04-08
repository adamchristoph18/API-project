import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllSpotsThunk } from "../../store/spots";


const AllSpots = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch]);

    return (
        <div>
            <h1>Hello</h1>
        </div>
    )
};

export default AllSpots;
