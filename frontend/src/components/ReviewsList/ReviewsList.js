
const ReviewsList = ({ review }) => {
    // const month =

    return (
        <div>
            <h3>
                {review.User?.firstName}
            </h3>
            {/* <p>
                {() => Date(review.createdAt).getMonth()}
            </p> */}
            <p>
                {review.review}
            </p>
        </div>
    )
};

export default ReviewsList;
