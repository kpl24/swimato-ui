import { useEffect, useState } from "react";
import { methods } from "../constants";
import { AddressState, OlaAddressComponent, Restaurant, StyleSheet } from "../constants/types";
import RestaurantCard from "../components/restaurant-card";
import { api } from "../helpers/axios";
import Loader from "../components/loader";
import LoadError from "../components/load-error";

const Home = () => {

    const [address, setAddress] = useState<AddressState>({ addressLine: "", city: "", location: { latitude: "", longitude: "" } });
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [loadingRestaurants, setLoadingRestaurants] = useState(false);
    const [error, setError] = useState<string>('');

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            const url = `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${latitude},${longitude}&api_key=${import.meta.env.VITE_MAP_API_KEY}`
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setLoadingLocation(false);
                    const city = data?.results[0]?.address_components?.filter((item: OlaAddressComponent) => item.types[0] === "administrative_area_level_3" || item.types[0] === "locality");
                    if (city.length) {
                        setAddress({
                            addressLine: data.results[0]?.formatted_address,
                            city: city[0].short_name,
                            location: { latitude: latitude.toString(), longitude: longitude.toString() }
                        })
                    }
                })
                .catch(() => {
                    setError('Error loading your location!');
                    setLoadingLocation(false);
                })
        })
    }, []);

    useEffect(() => {
        if (address.city) {
            setLoadingRestaurants(true);
            api({ method: methods.GET, url: `/restaurant?city=${'sangli'}` })
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
        }
    }, [address])


    return loadingLocation ?
        <Loader message="Locating you" /> : loadingRestaurants ?
            <Loader message="Finding restaurants!" /> : error ?
                <LoadError error={error} /> : (
                    <div className="my-4">
                        <h1 className="px-3" style={styles.heading}>{`Order food online in ${address?.city}`}</h1>
                        <div className="row row-cols-12 row-cols-lg-4">
                            {restaurants.map((item: Restaurant) => <RestaurantCard restaurant={item} />)}
                        </div>
                    </div>
                );
}

const styles: StyleSheet = {
    heading: { fontSize: '22px', fontWeight: '500' },
}

export default Home;