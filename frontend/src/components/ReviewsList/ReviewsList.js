
const ReviewsList = ({ review }) => {
    // const dateCreated = () => new Date(review.createdAt);
    // const month = dateCreated.getMonth();

    return (
        <div>
            <h3>
                {review.User?.firstName}
            </h3>
            {/* <p>
                {month}
            </p> */}
            <p>
                {review.review}
            </p>
        </div>
    )
};

export default ReviewsList;
