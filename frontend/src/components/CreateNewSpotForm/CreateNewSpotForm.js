import { useEffect, useState } from "react";
import './CreateNewSpotForm.css';

function CreateNewSpotForm() {
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
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
                    <span className="disclaim">Guests will only get your exact address once they have booked a reservation.</span></p>
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
            </div>
        </form>
    )
}

export default CreateNewSpotForm;
