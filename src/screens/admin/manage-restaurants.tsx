import { MdAddToPhotos } from "react-icons/md";
import { useWindowWidth } from "../../helpers/useWindowDimentions";
import AdminHeader from "../../components/shared/admin-header";
import { useEffect, useState } from "react";
import { APIResponse, RestaurantType } from "../../constants/types";
import { api } from "../../helpers/axios";
import Loader from "../../components/shared/loader";
import { ManageRestaurantCard } from "../../components/restaurant-card";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const ManageRestaurants = () => {

    const { isMobile } = useWindowWidth();
    const navigate = useNavigate();
    const { token } = useSelector((s: RootState) => s.userDetails);
    const [loading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);

    useEffect(() => {
        api({ method: "get", url: "/admin/restaurants", token })
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
                {restaurants.map((item: RestaurantType) => <ManageRestaurantCard key={item._id} restaurant={item} />)}
                {!restaurants.length && !loading && <div className="fs-5">No any restaurants added yet</div>}
            </div>
        </AdminHeader>

    );
}

export default ManageRestaurants;