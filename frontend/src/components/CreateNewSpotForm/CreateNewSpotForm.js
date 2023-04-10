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
                        like fast wifi or parking, and what you love about the neighborhood.</span></p>
            </div>
            </div>
        </form>
    )
}

export default CreateNewSpotForm;
