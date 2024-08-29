import { Outlet, useNavigate } from "react-router-dom";
import { StyleSheet } from "../constants/types";
import { IoSearch } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { useWindowWidth } from "../helpers/useWindowDimentions";
import Authenticate, { ShowAuthScreenOptions } from "../screens/authenticate";
import { useState } from "react";

const Header = () => {

    const navigate = useNavigate();
    const { isMobile } = useWindowWidth();
    const [showAuthScreen, setShowAuthScreen] = useState<ShowAuthScreenOptions>({
        show: false,
        type: ''
    });

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
                    <div role="button" style={styles.logo} className="pe-4 fs-2" onClick={() => navigate('/')}><i>swimato</i></div>
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
                    <div onClick={() => setShowAuthScreen({ show: true, type: 'login' })} style={styles.buttons} className="d-flex ms-2 ps-2">Log in</div>
                    <div onClick={() => setShowAuthScreen({ show: true, type: 'signup' })} style={styles.buttons} className="d-flex ms-2 ps-2">Sign up</div>
                </div>
            </div>
            <Authenticate showAuthScreenOptions={showAuthScreen} handleModal={(options: ShowAuthScreenOptions) => setShowAuthScreen(options)} />
            <Outlet />
        </div>
    );
}


export default Header;