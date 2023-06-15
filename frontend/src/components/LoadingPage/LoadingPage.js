import BeatLoader from "react-spinners/BeatLoader";
import "./LoadingPage.css";

function LoadingPage() {
    return (
        <div className="loading-page">
            <BeatLoader
                loading={true}
                color="#ff5A5F"
                size={20}
                />
        </div>
    )
}

export default LoadingPage;
