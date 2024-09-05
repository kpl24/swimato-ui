import { Fragment, useCallback } from "react";
import { useEffect, useState } from "react";
import { methods } from "../constants";
import { APIResponse, Restaurant, StyleSheet } from "../constants/types";
import RestaurantCard from "../components/restaurant-card";
import { api } from "../helpers/axios";
import Loader from "../components/loader";
import LoadError from "../components/load-error";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { debounce } from "../helpers";

const Home = () => {

    const [loadingRestaurants, setLoadingRestaurants] = useState(true);
    const [error, setError] = useState<string>('');
    const [restaurants, setRestaurants] = useState([]);
    const { filter: { location: { city }, name } } = useSelector((state: RootState) => state.appDetails);

    useEffect(() => {
        if (city || name) fetchRestaurants(city, name);
        else fetchRestaurants("sangli", "");
    }, [city, name]);

    const fetchRestaurants = useCallback(
        debounce((enteredCity: string, restaurantName: string) => {
            setLoadingRestaurants(true);
            let url = '';
            if (enteredCity && !restaurantName) url = `/restaurant?city=${enteredCity}`
            if (restaurantName && !enteredCity) url = `/restaurant?name=${restaurantName}`
            else url = `/restaurant?city=${enteredCity}&name=${restaurantName}`
            api({ method: methods.GET, url })
                .then((result: APIResponse) => {
                    setLoadingRestaurants(false);
                    if (result?.data?.restaurants) {
                        setRestaurants(result.data.restaurants)
                    }
                })
                .catch((err: APIResponse) => {
                    setLoadingRestaurants(false);
                    setError(err.status.message)
                })
        }, 500),
        []
    );

    return (
        <Fragment>
            {loadingRestaurants && <Loader message="Finding restaurants!" />}
            {error && <LoadError error={error} />}
            <div className="my-4">
                <h1 className="pe-3" style={styles.heading}>
                    {`${restaurants.length ? 'Search results for' : 'No results found for'} ${name ? `${name}` : 'restaurants'} ${city ? `in ${city}` : `near you`}`}
                </h1>
                <div className="row row-cols-12 row-cols-lg-3">
                    {restaurants.map((item: Restaurant) => <RestaurantCard key={item._id} restaurant={item} />)}
                </div>
            </div>
        </Fragment>
    );
}

const styles: StyleSheet = {
    heading: { fontSize: '22px', fontWeight: '500' },
}

export default Home;