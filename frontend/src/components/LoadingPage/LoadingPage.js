import BeatLoader from "react-spinners/BeatLoader";
import "./LoadingPage.css";

function LoadingPage() {
    return (
        <div className="loading-page">
            <BeatLoader
                loading={true}
                color="#36d7b7"
                size={150}
                />
        </div>
    )
}

export default LoadingPage;
