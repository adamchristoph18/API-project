import './SpotCard.css';

const SpotCard = ({ spot }) => {

    return (
        <div className="spot-card">
            <img
                className="spot-image"
                src={spot.previewImage}
                alt="{spot.name}image"
            />
            <div className='spot-card-info'>
                <div className='spot-info-top'>
                    <p className='spot-name'>{spot.city}, {spot.state}</p>
                    <i className="fa-solid fa-star" />
                    {spot.avgRating}
                </div>
                <p className='spot-price'>${spot.price}/night</p>
            </div>
        </div>
    )

}

export default SpotCard;
