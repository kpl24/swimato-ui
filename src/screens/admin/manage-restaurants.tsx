import { MdAddToPhotos } from "react-icons/md";
import { useWindowWidth } from "../../helpers/useWindowDimentions";
import AdminHeader from "../../components/admin-header";
import { useEffect, useState } from "react";
import { APIResponse, Restaurant } from "../../constants/types";
import { api } from "../../helpers/axios";
import Loader from "../../components/loader";
import { ManageRestaurantCard } from "../../components/restaurant-card";
import { useNavigate } from "react-router-dom";

const ManageRestaurants = () => {

    const { isMobile } = useWindowWidth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        api({ method: "get", url: "/restaurants", isAdmin: true })
            .then((results: APIResponse) => {
                setLoading(false);
                if (results.status.code === 200) {
                    setRestaurants(results.data.restaurants)
                }
            })
            .catch(() => {
                setLoading(false);
            })
    }, []);

    return (
        <AdminHeader
            title="Manage Restaurants"
            right={(
                <div role="button" onClick={() => navigate('/admin/restaurants/add')} className="d-flex flex-row align-items-center">
                    <MdAddToPhotos size={25} />
                    {!isMobile && <div className="ps-2 fs-6">Add Restaurants</div>}
                </div>
            )}
        >
            {loading && <Loader message="Loading restaurants" />}
            <div className="row row-cols-12 row-cols-lg-3">
                {restaurants.map((item: Restaurant) => <ManageRestaurantCard key={item._id} restaurant={item} />)}
            </div>
        </AdminHeader>

    );
}

export default ManageRestaurants;