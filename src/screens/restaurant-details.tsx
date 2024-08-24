import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../helpers/axios";
import Loader from "../components/loader";
import { Menu, Restaurant, StyleSheet } from "../constants/types";
import { getTags } from "../helpers";
import RatingTag from "../components/rating-tag";
import LoadError from "../components/load-error";
import { MenuItem } from "../components/menu";

const RestaurantDetails = () => {

    const { restaurantId } = useParams();
    const [loading, setLoading] = useState(false);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true);
        if (restaurantId?.length === 24) {
            api({ method: "GET", url: `/restaurant/v2/${restaurantId}` })
                .then((res) => {
                    if (res?.status?.code === 200) {
                        setRestaurant(res.data.restaurant);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    setError(err);
                    setLoading(false);
                })
        }
    }, []);

    return loading ? <Loader /> : error ? <LoadError error={error} /> : (
        <div className="mt-4">
            <div className="d-flex flex-row justify-content-between align-items-start">
                <h1 style={styles.heading}>{restaurant?.name}</h1>
                <div className="d-flex flex-row align-items-center">
                    <RatingTag rating={restaurant?.average_rating} />
                    <div className="d-flex flex-column mx-2">
                        <span style={styles.ratingHeading}><strong>{restaurant?.total_ratings}</strong></span>
                        <span style={styles.ratingDescription}>Delivery Ratings</span>
                    </div>
                </div>
            </div>
            <div style={styles.tagsContainer}>{getTags(restaurant?.tags)}</div>
            <div style={styles.address}>{`${restaurant?.address_line}, ${restaurant?.city}.`}</div>
            <div className="mt-5">
                <div className="text-danger fs-5">Order Online</div>
                <hr />
                {restaurant?.menu?.map((item: Menu, index: number) => <MenuItem key={index} menu={item} />)}
            </div>
        </div>
    );
}

const styles: StyleSheet = {
    heading: { fontWeight: '500', color: '#1c1c1c' },
    tagsContainer: { fontSize: '16px', color: '#696969', textTransform: 'capitalize' },
    address: { fontSize: '16px', color: '#9c9c9c', textTransform: 'capitalize', marginTop: '5px' },
    ratingHeading: { fontSize: '14px', marginBottom: '-2px' },
    ratingDescription: { fontSize: '13px', color: '#363636' },
}

export default RestaurantDetails;