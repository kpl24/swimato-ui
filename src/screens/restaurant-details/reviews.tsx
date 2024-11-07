import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../helpers/axios";
import { methods } from "../../constants";
import { APIResponse, RatingType, StyleSheetType } from "../../constants/types";
import RatingTag from "../../components/shared/rating-tag";
import moment from "moment";
import Loader from "../../components/shared/loader";
import LoadError from "../../components/shared/load-error";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ReviewDetails = ({ review }: { review: RatingType }) => {

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
    const { token } = useSelector((s: RootState) => s.userDetails);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        api({ method: methods.GET, url: `/restaurant/${restaurantId}/ratings`, token })
            .then((results: APIResponse) => {
                if (results.status.code === 200) {
                    setLoading(false);
                    setRatings(results.data.ratings)
                } else {
                    setLoading(false);
                    setError(results.status.message)
                }
            })
            .catch((err: APIResponse) => {
                setLoading(false);
                setError(err?.status?.message)
            })
    }, [])


    return (
        <div>
            {loading && <Loader message="Loading restaurant reviews" />}
            {error && <LoadError error={error} />}
            {ratings.length === 0 && !loading ? <div className="fs-6 text-center mt-2">This restaurant don't have any ratings yet</div> : null}
            {ratings.map((item: RatingType) => <ReviewDetails key={item._id} review={item} />)}
        </div>
    );
}

const styles: StyleSheetType = {
    avatar: { height: '44px', width: '44px', borderRadius: '50%' },
    date: { color: '9c9c9c', fontSize: '12px', fontWeight: "300" },
    description: { fontWeight: "400", marginTop: "15px" },
    name: { fontWeight: "300" },
}

export default Reviews;