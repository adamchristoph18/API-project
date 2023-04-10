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
            <h2>Create a new Spot</h2>
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
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
            </label>
        </form>
    )
}

export default CreateNewSpotForm;
