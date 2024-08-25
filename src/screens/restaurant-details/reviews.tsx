import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../helpers/axios";
import { methods } from "../../constants";
import { APIResponse, Rating, StyleSheet } from "../../constants/types";
import RatingTag from "../../components/rating-tag";
import moment from "moment";
import Loader from "../../components/loader";
import LoadError from "../../components/load-error";

const ReviewDetails = ({ review }: { review: Rating }) => {

    const { user } = review;

    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-row align-items-start my-3">
                <img src={user.display_picture} style={styles.avatar} />
                <div className="mx-2">
                    <div style={styles.name}>{user.name}</div>
                    <div style={styles.name}>0 followers</div>
                </div>
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
                <RatingTag small rating={review.rating} />
                <div style={styles.date}>{moment(review.updatedAt).fromNow()}</div>
            </div>
            <div style={styles.description}>{review.description}</div>
            <hr />
        </div>
    );
}

const Reviews = () => {

    const { restaurantId } = useParams();
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        api({ method: methods.GET, url: `/restaurant/${restaurantId}/ratings` })
            .then((results: APIResponse) => {
                if (results.status.code === 200) {
                    setLoading(false);
                    setRatings(results.data.ratings)
                } else {
                    setLoading(false);
                    setError(results.status.message)
                }
            })
            .catch(err => {
                setLoading(false);
                setError(err)
            })
    }, [])


    return (
        <div>
            {loading && <Loader message="Loading restaurant reviews" />}
            {error && <LoadError error={error} />}
            {ratings.map((item: Rating) => <ReviewDetails key={item._id} review={item} />)}
        </div>
    );
}

const styles: StyleSheet = {
    avatar: { height: '44px', width: '44px', borderRadius: '50%' },
    date: { color: '9c9c9c', fontSize: '12px', fontWeight: "300" },
    description: { fontWeight: "400", marginTop: "15px" },
    name: { fontWeight: "300" },
}

export default Reviews;