import './SpotCard.css';

const SpotCard = ({ spot }) => {

    // const roundRating = (spot) => spot.avgRating ? (spot.avgRating).toFixed(1) : null;

    return (
        <div className="spot-card">
            <img
                className="spot-image clickable"
                src={spot.previewImage || "https://onlyusedtesla.com/images/no-image.png"}
                alt="{spot.name} preview"
            />
            <div className='spot-card-info clickable'>
                <div className='spot-info-top'>
                    <p className='spot-local'>{spot.city}, {spot.state}</p>
                    <div>
                        <i className="fa-solid fa-star icon" />{spot.avgRating ? spot.avgRating : " New"}
                    </div>
                </div>
                <p className='spot-price'>${spot.price}/night</p>
            </div>
        </div>
    )

}

export default SpotCard;
