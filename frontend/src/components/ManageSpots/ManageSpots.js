import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotsThunk } from "../../store/spots";
import SpotCard from "../SpotCard";
import "./ManageSpots.css";

const ManageSpots = () => {

    const spotsObj = useSelector(state => state.spots.allSpots);
    const spotsArr = Object.values(spotsObj);

    const sessionUser = useSelector(state => state.session.user);
    const currUserId = sessionUser.id;
    const currentUserSpots = spotsArr.filter(spot => spot.ownerId === currUserId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [dispatch]);

    return (
        <div>
            <div className='manage-spots-header'>
            <h1 className='manage-spots-title'>Manage your spots</h1>
            <button
                className='create-new-spot-button-ms'
            >
                Create a New Spot
            </button>
            </div>
        </div>
    );
};

export default ManageSpots;
