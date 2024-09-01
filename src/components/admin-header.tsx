import { useNavigate } from "react-router-dom";
import { api } from "../helpers/axios";
import { removeUser } from "../redux/reducers/user";
import { useDispatch } from "react-redux";
import { ReactNode, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useWindowWidth } from "../helpers/useWindowDimentions";

const AdminHeader = ({ children, right, title }: { children: ReactNode, right: ReactNode, title: string }) => {

    const [showSideBar, setShowSideBar] = useState(false);
    const { isMobile } = useWindowWidth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        api({ method: "get", url: "/user/logout" })
            .then(() => dispatch(removeUser()))
            .catch(() => dispatch(removeUser()));
        navigate('/');
    }

    return (
        <div>
            <div className={`offcanvas offcanvas-start d-flex justify-content-between ${showSideBar ? 'show' : 'hide'} text-bg-danger`} tabIndex={-1} id="offcanvasDark" aria-labelledby="offcanvasDarkLabel">
                <div>
                    <div className="offcanvas-header d-flex align-items-center">
                        <h5 role="button" onClick={() => navigate('/')} className="offcanvas-title" id="offcanvasDarkLabel"><i className="fs-5">swimato</i></h5>
                        <button type="button" className="btn-close btn-close-white" onClick={() => setShowSideBar(false)} data-bs-dismiss="offcanvasDark" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="py-2" onClick={() => navigate('/admin/restaurants')} role="button">Manage Restaurants</div>
                        <div className="py-2" onClick={() => navigate('/admin/restaurants/add')} role="button">Add Restaurant</div>
                    </div>
                </div>
                <div role="button" onClick={logout} className="px-3 py-3">
                    <div>Logout</div>
                </div>
            </div>
            <div className="px-4 py-3 d-flex flex-row justify-content-between bg-danger text-white">
                <div className="d-flex flex-row align-items-center">
                    <GiHamburgerMenu onClick={() => setShowSideBar(!showSideBar)} role="button" size={25} />
                    <div className="mx-3 fs-5">{title}</div>
                </div>
                {right}
            </div>
            <div className={`${isMobile ? "px-2 pt-1" : "p-4"}`}>
                {children}
            </div>
        </div>
    );
}

export default AdminHeader;