import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { displaySpotThunk } from '../../store/spots';
import { useEffect } from 'react';
import './SpotShow.css';


const SpotShow = () => {
    const { spotId } = useParams();
    const spotObj = useSelector(state => state.spots.singleSpot);
    const imagesArr = spotObj.SpotImages;

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
            <div className='spot-details'>
                <div>
                    <h2>Hosted by {spotObj.Owner.firstName} {spotObj.Owner.lastName}</h2>
                    <p>{spotObj.description}</p>
                </div>
                <div className='reserve-box'>
                    <div className='spot-info-above-reserve'>
                        <i className="fa-solid fa-dollar-sign icon dolla-sign icon-large" />
                        <p className='price'>{spotObj.price}</p>
                        <i className="fa-solid fa-star icon star-icon" />
                        <span
                            className='avg-rating'
                        >{Number(spotObj.avgStarRating) ? Number(spotObj.avgStarRating).toFixed(1) : "0.0"}</span>
                        <span
                            className='num-reviews'
                        >{spotObj.numReviews}</span>
                        <p
                            className='reviews-word'
                        >reviews</p>
                    </div>
                    <button
                        className='reserve-button'
                    >Reserve</button>
                </div>
            </div>
        </div>
    )

}

export default SpotShow;
