import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editSpotThunk } from "../../store/spots";
import "../CreateNewSpotForm/CreateNewSpotForm.css";

const UpdateSpotForm = () => {
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.allSpots[spotId]);

};

export default UpdateSpotForm;
