import { useEffect, useState } from "react";

function CreateNewSpotForm() {
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState({});

    return (
        <div>Hello!</div>
    )
}

export default CreateNewSpotForm;
