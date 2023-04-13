import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { displaySpotThunk } from '../../store/spots';
import SpotForm from "../SpotForm/SpotForm";

const UpdateSpotForm = () => {
    const { spotId } = useParams();

    const spotObj = useSelector(state => state.spots.singleSpot);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(displaySpotThunk(spotId));
    }, [dispatch, spotId]);

    if (!spotObj) return null;

    return (
        <SpotForm
            spot={spotObj}
            formType="update"
            />
    );
};

export default UpdateSpotForm;
