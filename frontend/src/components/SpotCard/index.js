import { useHistory } from "react-router-dom";
import OpenModalConfirmDelete from "../ConfirmDeleteModal/OpenModalConfirmDelete";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import './SpotCard.css';


const SpotCard = (props) => {
    const { spot } = props;
    const history = useHistory();

    return (
        <div
            title={spot.name}
            className="spot-card clickable"
            onClick={(e) => {
                history.push(`/spots/${spot.id}`)
            }}
        >
            <img
                className="spot-image clickable"
                src={spot.previewImage || "https://onlyusedtesla.com/images/no-image.png"}
                alt="{spot.name} preview"
            />
            <div className='spot-card-info clickable'>
                <div className='spot-info-top'>
                    <p className='spot-local'>{spot.city}, {spot.state}</p>
                    <div className='rating-or-new'>
                        <i className="fa-solid fa-star icon" />{Number(spot.avgRating) ?
                                                                                        Number(spot.avgRating).toFixed(1)
                                                                                        : "New"}
                    </div>
                </div>
                <p className='spot-price'>${spot.price}/night</p>
                {props.manage ?
                                <div className="update-delete-options">
                                    <button
                                        className='update-button clickable'
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            history.push(`/spots/${spot.id}/edit`)
                                        }}
                                    >Update</button>
                                    <OpenModalConfirmDelete
                                        itemText="Delete"
                                        modalComponent={<ConfirmDeleteModal spot={spot} />}
                                    />
                                </div>
                                : null}
            </div>
        </div>
    )

}

export default SpotCard;
