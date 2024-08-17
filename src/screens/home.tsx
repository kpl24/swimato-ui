import { useEffect, useState } from "react";
import { backgroundImage } from "../constants";
import { AddressState, OlaAddressComponent, Restaurant } from "../constants/types";

const Home = () => {

    const [address, setAddress] = useState<AddressState>({ addressLine: "", city: "", location: { latitude: "", longitude: "" } });

    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            const url = `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${latitude},${longitude}&api_key=${import.meta.env.VITE_MAP_API_KEY}`
            fetch(url).then(res => res.json()).then(data => {
                const city = data?.results[0]?.address_components?.filter((item: OlaAddressComponent) => item.types[0] === "administrative_area_level_3" || item.types[0] === "locality");
                if (city.length) {
                    setAddress({
                        addressLine: data.results[0]?.formatted_address,
                        city: city[0].short_name,
                        location: { latitude: latitude.toString(), longitude: longitude.toString() }
                    })
                }
            })
        })
    }, []);

    useEffect(() => {
        if (address.city) {
            fetch(`https://food-delivery-server-s65z.onrender.com/restaurant?city=${'sangli'}`)
                .then(res => res.json())
                .then(result => {
                    if (result?.data?.restaurants) {
                        setRestaurants(result.data.restaurants)
                    }
                })
        }
    }, [address])


    return (
        <div className="position-relative">
            <img height="500px" width="100%" style={{ objectFit: "cover" }} src={backgroundImage} alt="background" />
            <div style={{ width: "100%", height: "500px", backgroundColor: "rgba(0,0,0,0.6)", color: "white" }} className="position-absolute top-0 start-0 d-flex flex-column justify-content-center align-items-center">
                <h1 style={{ fontSize: 60 }}><i>swimato</i></h1>
                <div style={{ fontSize: 40, marginBottom: "20px" }}>{`Discover the best food & drinks in ${address.city}`}</div>
                <div className="form-control w-50">
                    <div className="row">
                        <div className="col-4 text-truncate my-2">{address.addressLine}</div>
                        <div className="col-8"><input className="form-control align-self-stretch" placeholder="Search" /></div>
                    </div>
                </div>
            </div>
            {restaurants.map((item: Restaurant) => {
                return (
                    <div>
                        <img src={item.logo} style={{height: 100, width: 100}} />
                        {item.name}
                    </div>
                );
            })}
        </div>
    );
}

export default Home;