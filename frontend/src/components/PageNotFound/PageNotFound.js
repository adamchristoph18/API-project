import { useHistory } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
    const history = useHistory();

    return (
        <div className="page-not-found">
            <p className="oops">Oops! Page Not Found</p>
            <button className="go-to-home clickable" onClick={() => {history.push('/')}}>Go to home</button>
        </div>
    )
}

export default PageNotFound;
