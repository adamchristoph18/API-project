import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { displaySpotThunk } from '../../store/spots';
import { useEffect } from 'react';
import './SpotShow.css';


const SpotShow = () => {
    const { spotId } = useParams();
    const spotObj = useSelector(state => state.spots.singleSpot);
    const imagesArr = spotObj.SpotImages;

    console.log('first image ----------> ', spotId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(displaySpotThunk(spotId));
    }, [dispatch, spotId]);

    if (!spotObj) return null;
    if (!imagesArr) return null;

    return (
        <div className='spot-details-page'>
            <div>
                <h1>{spotObj.name}</h1>
                    <p>{spotObj.city}, {spotObj.state}, {spotObj.country}</p>
            </div>
            <div className='spot-images'>
                <img
                    className='preview-image'
                    src={imagesArr[0].url}
                    alt="spot's preview image"
                />
                <div className='extra-images'>
                    {imagesArr.length > 1 ?
                                        <img
                                            className='extra-image x-image-one'
                                            src={imagesArr[1].url}
                                            alt="spot image"
                                        />
                                        : null
                                        }
                    {imagesArr.length > 2 ?
                                        <img
                                            className='extra-image x-image-two'
                                            src={imagesArr[2].url}
                                            alt="spot image"
                                        />
                                        : null
                                        }
                    {imagesArr.length > 3 ?
                                        <img
                                            className='extra-image x-image-three'
                                            src={imagesArr[3].url}
                                            alt="spot image"
                                        />
                                        : null
                                        }
                    {imagesArr.length > 4 ?
                                        <img
                                            className='extra-image x-image-four'
                                            src={imagesArr[4].url}
                                            alt="spot image"
                                        />
                                        : null
                                        }
                </div>
            </div>

        </div>
    )

}

export default SpotShow;
