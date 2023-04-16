import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { displaySpotThunk } from '../../store/spots';
import { getReviewsForSpotThunk } from '../../store/reviews';
import { useEffect } from 'react';
import ReviewsList from '../ReviewsList/ReviewsList';
import CreateReviewModal from '../CreateReviewModal/CreateReviewModal';
import OpenCreateReview from '../CreateReviewModal/OpenCreateReview';
import './SpotShow.css';

const SpotShow = () => {
    const { spotId } = useParams();
    const spotObj = useSelector(state => state.spots.singleSpot);
    const imagesArr = spotObj?.SpotImages;

    const reviewsObj = useSelector(state => state.reviews.spot);
    const reviewsArr = Object.values(reviewsObj).reverse();

    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviewsForSpotThunk(spotId));
        dispatch(displaySpotThunk(spotId));
    }, [dispatch, spotId, reviewsArr.length]);

    if (!spotObj) return null;
    // if (!reviewsObj) return null;
    // if (!imagesArr) return null;
    // if (!reviewsArr.length) return null;

    const ownerOfSpotId = spotObj.Owner.id;

    const numReviews = spotObj.numReviews;
    // helper function to check if the spot has any reviews
    const moreThanZeroReviews = () => numReviews > 0;
    // helper function to check if spot belongs to logged in user
    const userOwnsSpot = () => ownerOfSpotId === sessionUser?.id ? true : false;
    // helper function to check if current user has already written a review for the spot or not
    const userAlreadyWroteReview = () => reviewsArr.some(review => review.userId === sessionUser.id);


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
                    alt="spot's preview"
                />
                <div className='extra-images'>
                    {imagesArr.length > 1 ?
                                        <img
                                            className='extra-image x-image-one'
                                            src={imagesArr[1].url}
                                            alt="spot extra one"
                                        />
                                        : null
                                        }
                    {imagesArr.length > 2 ?
                                        <img
                                            className='extra-image x-image-two'
                                            src={imagesArr[2].url}
                                            alt="spot extra two"
                                        />
                                        : null
                                        }
                    {imagesArr.length > 3 ?
                                        <img
                                            className='extra-image x-image-three'
                                            src={imagesArr[3].url}
                                            alt="spot extra three"
                                        />
                                        : null
                                        }
                    {imagesArr.length > 4 ?
                                        <img
                                            className='extra-image x-image-four'
                                            src={imagesArr[4].url}
                                            alt="spot extra four"
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
                        >{Number(spotObj.avgStarRating) ? Number(spotObj.avgStarRating).toFixed(1) : "New"}</span>
                        <span
                            className='num-reviews'
                        >{spotObj.numReviews}</span>
                        <p
                            className='reviews-word'
                        >{spotObj.numReviews === 1 ? "Review" : "Reviews"}</p>
                    </div>
                    <button
                        onClick={() => alert("Feature coming soon!")}
                        className='reserve-button clickable'
                    >Reserve</button>
                </div>
            </div>
                <div className='top-pillow'>
                    <div className='pillow'>
                    <i className="fa-solid fa-star icon star-icon big-big-star" />
                        <span
                            className='avg-rating-larger'
                        >{Number(spotObj.avgStarRating) ? Number(spotObj.avgStarRating).toFixed(1) : "New"}
                        </span>
                        {moreThanZeroReviews() ? numReviews === 1 ? <p className='number-reviews'>1 Review</p> :
                            <p className='number-reviews'>{numReviews} Reviews</p> : null}
                    </div>

                    {sessionUser && (userAlreadyWroteReview() || userOwnsSpot() ? null : <OpenCreateReview
                        itemText="Post Your Review"
                        modalComponent={<CreateReviewModal spotId={spotId} />}
                        />)}

                </div>
                <div>
                        {moreThanZeroReviews() ? reviewsArr.map(review => (
                            <ReviewsList
                                review={review}
                                key={review.id}
                            />
                        )) : userOwnsSpot() ? null : sessionUser && (<p>Be the first to post a review!</p>)}
                </div>
        </div>
    )

}

export default SpotShow;
