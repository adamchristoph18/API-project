import './SpotCard.css';

const SpotCard = ({ spot }) => {

    return (
        <div className="spot-card">
            <img
                className="spot-image"
                src={spot.previewImage}
                alt="{spot.name}image"
            />
            <p className='spot-name'>{spot.name}</p>
            <i className="fa-solid fa-star" />
            <p className='spot-price'>${spot.price}/night</p>
        </div>
    )

}

export default SpotCard;
