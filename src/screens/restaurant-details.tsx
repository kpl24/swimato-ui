import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../helpers/axios";
import Loader from "../components/loader";
import { Menu, Restaurant, StyleSheet } from "../constants/types";
import { getTags } from "../helpers";
import RatingTag from "../components/rating-tag";
import LoadError from "../components/load-error";
import { Category } from "../components/menu";

const RestaurantDetails = () => {

    const { restaurantId } = useParams();
    const [loading, setLoading] = useState(false);
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [menu, setMenu] = useState([]);
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true);
        if (restaurantId?.length === 24) {
            api({ method: "GET", url: `/restaurant/${restaurantId}` })
                .then((res) => {
                    if (res?.status?.code === 200) {
                        setRestaurant(res.data.restaurant);
                        setMenu(res.data.menu);
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
                <RatingTag />
            </div>
            <div style={styles.tagsContainer}>{getTags(restaurant?.tags)}</div>
            <div style={styles.address}>{`${restaurant?.address_line}, ${restaurant?.city}.`}</div>
            <div className="mt-5">
                <div className="text-danger fs-5">Order Online</div>
                <hr />
                {menu.map((item: Menu, index: number) => <Category key={index} menu={item} />)}
            </div>
        </div>
    );
}

const styles: StyleSheet = {
    heading: { fontWeight: '500', color: '#1c1c1c' },
    tagsContainer: { fontSize: '16px', color: '#696969', textTransform: 'capitalize' },
    address: { fontSize: '16px', color: '#9c9c9c', textTransform: 'capitalize', marginTop: '5px' },
}

export default RestaurantDetails;