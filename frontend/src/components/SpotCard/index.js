import './SpotCard.css';
import { useHistory } from "react-router-dom";


const SpotCard = ({ spot }) => {
    const history = useHistory();

    return (
        <div
            className="spot-card clickable"
            onClick={(e) => history.push(`/spots/${spot.id}`)}
        >
            <img
                className="spot-image clickable"
                src={spot.previewImage || "https://onlyusedtesla.com/images/no-image.png"}
                alt="{spot.name} preview"
            />
            <div className='spot-card-info clickable'>
                <div className='spot-info-top'>
                    <p className='spot-local'>{spot.city}, {spot.state}</p>
                    <div>
                        <i className="fa-solid fa-star icon" />{Number(spot.avgRating) ? Number(spot.avgRating).toFixed(1) : " New"}
                    </div>
                </div>
                <p className='spot-price'>${spot.price}/night</p>
            </div>
        </div>
    )

}

export default SpotCard;
