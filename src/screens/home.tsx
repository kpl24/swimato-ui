import { Fragment } from "react";
import { useEffect, useState } from "react";
import { methods } from "../constants";
import { Restaurant, StyleSheet } from "../constants/types";
import RestaurantCard from "../components/restaurant-card";
import { api } from "../helpers/axios";
import Loader from "../components/loader";
import LoadError from "../components/load-error";

const CITY = 'sangli';

const Home = () => {

    const [loadingRestaurants, setLoadingRestaurants] = useState(true);
    const [error, setError] = useState<string>('');
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        setLoadingRestaurants(true);
        api({ method: methods.GET, url: `/restaurant?city=${CITY}` })
            .then(result => {
                setLoadingRestaurants(false);
                if (result?.data?.restaurants) {
                    setRestaurants(result.data.restaurants)
                }
            })
            .catch(err => {
                setLoadingRestaurants(false);
                setError(err)
            })
    }, []);

    return (
        <Fragment>
            {loadingRestaurants && <Loader message="Finding restaurants!" />}
            {error && <LoadError error={error} />}
            {restaurants.length > 0 && <div className="my-4">
                <h1 className="pe-3" style={styles.heading}>{`Order food online in ${CITY.charAt(0).toUpperCase() + CITY.slice(1)}`}</h1>
                <div className="row row-cols-12 row-cols-lg-3">
                    {restaurants.map((item: Restaurant) => <RestaurantCard key={item._id} restaurant={item} />)}
                </div>
            </div>}
        </Fragment>
    );
}

const styles: StyleSheet = {
    heading: { fontSize: '22px', fontWeight: '500' },
}

export default Home;