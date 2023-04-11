import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


const SpotShow = () => {
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.allSpots[spotId]);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch()
    // }, [dispatch, spotId]);
}

export default SpotShow;
