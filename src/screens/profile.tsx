import { useDispatch } from "react-redux";
import { removeUser } from "../redux/reducers/user";
import { api } from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";

const Profile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        api({ method: "get", url: "/user/logout" })
            .then(() => dispatch(removeUser()))
            .catch(() => dispatch(removeUser()));
        navigate('/');
    }

    return (
        <div>
            <div role="button" onClick={() => navigate('/admin/restaurants')} className="mb-2 mt-4 d-flex justify-content-between">
                <div>My Restaurants</div>
                <div><IoChevronForward /></div>
            </div>
            <hr />
            <div role="button" onClick={() => navigate('/orders')} className="my-2 d-flex justify-content-between">
                <div>My Orders</div>
                <div><IoChevronForward /></div>
            </div>
            <hr />
            <div role="button" onClick={logout} className="text-danger my-2">Logout</div>
            <hr />
        </div>
    );
}

export default Profile;