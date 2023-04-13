import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { displaySpotThunk } from '../../store/spots';
import SpotForm from "../SpotForm/SpotForm";

const UpdateSpotForm = () => {
    const { spotId } = useParams();
    const [spotObj, setSpotObj] = useState(null); // this needs to be null to first hit the guard clause, then
                                            // hit the useEffect/dispatch to update
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(displaySpotThunk(spotId))
            .then((res) => setSpotObj(res)); // the thunk on the line before this returns a spot
    }, [dispatch, spotId]);

    if (!spotObj) return null; // guard clause

    return (
        <SpotForm
            spot={spotObj}
            formType="update"
            />
    );
};

export default UpdateSpotForm;
