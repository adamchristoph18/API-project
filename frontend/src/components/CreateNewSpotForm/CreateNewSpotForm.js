import { useEffect, useState } from "react";
import './CreateNewSpotForm.css';

function CreateNewSpotForm() {
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [prevImgUrl, setPrevImgUrl] = useState('');
    const [prevImgUrlTwo, setPrevImgUrlTwo] = useState(''); // these aren't required
    const [prevImgUrlThree, setPrevImgUrlThree] = useState(''); // these aren't required
    const [prevImgUrlFour, setPrevImgUrlFour] = useState(''); // turn these into an array?
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const err = {};
        setErrors(err);
    }, [country, address, city, state, description, title, price]);

    return (
        <form
            className="new-spot-form"
        >
            <div>
                <h2 className="form-title">Create a new Spot</h2>
                <p><span className="subtitle">Where's your place located?</span>
                    <br/>
                    <span className="disclaim">*Guests will only get your exact address once they have booked a reservation.</span></p>
            </div>
            <div className="form-info">
                <label>
                    Country
                    <br/>
                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Street Address
                    <br/>
                    <input
                        type="text"
                        name="address"
                        placeholder="Street Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </label>
                <div className="city-state-pair">
                    <label>
                        City
                        <br/>
                        <input
                            className="city-input"
                            type="text"
                            name="city"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                    <p className="separating-comma">,</p>
                    <label>
                        State
                        <br/>
                        <input
                            className="state-input"
                            type="text"
                            name="state"
                            placeholder="STATE"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="lat-lng-pair">
                    <label>
                        Latitude
                        <br/>
                        <input
                            className="lat-input"
                            type="number"
                            name="latitude"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            required
                        />
                    </label>
                    <p className="separating-comma">,</p>
                    <label>
                        Longitude
                        <br/>
                        <input
                            className="lng-input"
                            type="number"
                            name="longitude"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div>
                    <p><span className="describe-title">Describe your place to guests!</span>
                        <br/>
                        <span className="describe-tips">Mention the best features of your space, any special amenities
                            like fast wifi or<br/> parking, and what you love about the neighborhood.</span></p>
                </div>
                <div className="description-div">
                    <textarea
                        className="description-text-area"
                        placeholder="Please write at least 30 characters"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="title-div">
                    <p><span className="spot-title-title">Create a title for your spot</span>
                        <br/>
                        <span className="title-tips">Catch guests' attention with a spot title that highlights
                            what makes your place special.</span></p>
                    <input
                        className="title-input"
                        type="text"
                        name="title"
                        placeholder="Name of your spot"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        />
                </div>
                <div className="title-div">
                    <p><span className="price-title">Set a base price for your spot</span>
                        <br/>
                        <span className="price-tips">Competitive pricing can help your listing stand out and rank
                            higher in search results.</span></p>
                    <div className="price-line">
                        <i className="fa-solid fa-dollar-sign icon dolla" />
                            <input
                                className="price-input"
                                type="number"
                                name="price"
                                placeholder="Price per night (USD)"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                                />
                        <p className="per-night">/ per night (USD)</p>
                    </div>
                </div>
                <div className="photos-div">
                    <p><span className="photo-title">Liven up your spot with photos!</span>
                        <br/>
                        <span className="photo-tips">Submit a link to at least one photo to publish your spot.</span></p>
                        <input
                            className="image-input"
                            type="text"
                            name="image-url-one"
                            placeholder="Preview Image URL"
                            value={prevImgUrl}
                            onChange={(e) => setPrevImgUrl(e.target.value)}
                            required
                        />
                        <input
                            className="image-input"
                            type="text"
                            name="image-url-two"
                            placeholder="Image URL"
                            value={prevImgUrlTwo}
                            onChange={(e) => setPrevImgUrlTwo(e.target.value)}
                        />
                        <input
                            className="image-input"
                            type="text"
                            name="image-url-three"
                            placeholder="Image URL"
                            value={prevImgUrlThree}
                            onChange={(e) => setPrevImgUrlThree(e.target.value)}
                        />
                        <input
                            className="last-image-input"
                            type="text"
                            name="image-url-four"
                            placeholder="Image URL"
                            value={prevImgUrlFour}
                            onChange={(e) => setPrevImgUrlFour(e.target.value)}
                        />
                </div>
            </div>
            <button
                className="create-spot-button clickable"
                type="submit"
            >
                Create Spot
            </button>
        </form>
    )
}

export default CreateNewSpotForm;
