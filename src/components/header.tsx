import { Outlet, useNavigate } from "react-router-dom";
import { StyleSheet, User } from "../constants/types";
import { IoSearch, IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { useWindowWidth } from "../helpers/useWindowDimentions";
import Authenticate, { ShowAuthScreenOptions } from "../screens/authenticate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeUser } from "../redux/reducers/user";
import { api } from "../helpers/axios";

const actionContainerStyle = "position-absolute d-flex align-items-end flex-column bg-white pe-3 py-2 shadow-lg rounded";

const UserAction = ({ user }: { user: User }) => {

    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        api({ method: "get", url: "/user/logout" })
            .then(() => dispatch(removeUser()))
            .catch(() => dispatch(removeUser()));
        navigate('/');
    }

    const styles: StyleSheet = {
        imageContainer: { height: "44px", width: "44px" },
        actionContainer: { left: -20, top: 52, width: "200px", animation: "fadeIn 5s" }
    }

    return (
        <div className="position-relative">
            <div role="button" className="d-flex align-items-center" onClick={() => setOpen(!isOpen)}>
                <img src={user.display_picture} className="rounded-full" style={styles.imageContainer} />
                <div className="px-2 user-select-none">{user.name}</div>
                {isOpen ? <IoChevronUpOutline size={16} /> : <IoChevronDownOutline size={16} />}
            </div>
            {isOpen && <div className={actionContainerStyle} style={styles.actionContainer}>
                <div onClick={() => navigate('/admin/restaurants')} role="button" className="my-2">My Restaurants</div>
                <div onClick={logout} role="button" className="my-2">Logout</div>
            </div>}
        </div>
    );
}

const Header = () => {

    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.userDetails);
    const { isMobile } = useWindowWidth();
    const [showAuthScreen, setShowAuthScreen] = useState<ShowAuthScreenOptions>({
        show: false,
        type: ''
    });

    useEffect(() => {
        if (user) setShowAuthScreen({ show: false, type: 'login' });
    }, [user])

    const styles: StyleSheet = {
        container: { width: isMobile ? "100%" : "80%", margin: "auto", padding: isMobile ? "10px" : 0 },
        logo: { fontWeight: "bold" },
        buttons: { fontWeight: "300", cursor: "pointer", fontSize: "18px" },
        searchBar: { height: '50px' },
        input: { color: "black", height: '100%', borderWidth: 0, width: '100%', outline: "none" },
        locationInput: { color: "black", height: '100%', borderWidth: 0, width: '50%', outline: "none" }
    }

    return (
        <div style={styles.container}>
            <div className="d-flex flex-row align-items-center justify-content-between py-3">
                <div className="d-flex align-items-center w-50">
                    <div role="button" style={styles.logo} className="pe-4 fs-2 user-select-none" onClick={() => navigate('/')}><i>swimato</i></div>
                    {!isMobile && <div style={styles.searchBar} className="d-flex w-100 form-control shadow-none align-items-center">
                        <FaLocationDot color="#ff7e8b" size="25px" />
                        <input
                            style={styles.locationInput}
                            placeholder="Location"
                            className="shadow-none ms-2"
                            type="text"
                        />
                        <IoSearch color="#9c9c9c" size="40px" />
                        <input
                            style={styles.input}
                            placeholder="Search for restaurants"
                            className="shadow-none ms-2"
                            type="text"
                        />
                    </div>}
                </div>
                <div className="d-flex flex-grow">
                    {user && <UserAction user={user} />}
                    {!user && <div onClick={() => setShowAuthScreen({ show: true, type: 'login' })} style={styles.buttons} className="d-flex ms-2 ps-2">Login</div>}
                    {!user && <div onClick={() => setShowAuthScreen({ show: true, type: 'signup' })} style={styles.buttons} className="d-flex ms-2 ps-2">Register</div>}
                </div>
            </div>
            {!user && <Authenticate showAuthScreenOptions={showAuthScreen} handleModal={(options: ShowAuthScreenOptions) => setShowAuthScreen(options)} />}
            <Outlet />
        </div>
    );
}


export default Header;