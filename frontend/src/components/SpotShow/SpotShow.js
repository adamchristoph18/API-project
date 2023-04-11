import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { displaySpotThunk } from '../../store/spots';
import { useEffect } from 'react';
import './SpotShow.css';


const SpotShow = () => {
    const { spotId } = useParams();
    const spotObj = useSelector(state => state.spots.singleSpot);

    const imagesArr = spotObj.SpotImages;
    // console.log('tis is the imgs ----------> ', imagesArr[0]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(displaySpotThunk(spotId));
    }, [dispatch, spotId]);

    return (
        <div className='spot-details-page'>
            <div className='spot-details-header'>
                <h1>{spotObj.name}</h1>
                    <p>{spotObj.city}, {spotObj.state}, {spotObj.country}</p>
            </div>
            <div className='spot-images'>
                <img src={imagesArr[0].url} />
            </div>

        </div>
    )

}

export default SpotShow;
