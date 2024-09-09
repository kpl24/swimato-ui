import { Fragment, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { api } from "../../helpers/axios";
import Loader from "../../components/shared/loader";
import { APIResponse, RestaurantType, StyleSheetType } from "../../constants/types";
import { getTags } from "../../helpers";
import RatingTag from "../../components/shared/rating-tag";
import LoadError from "../../components/shared/load-error";
import Menu from "../../components/menu";
import { useWindowWidth } from "../../helpers/useWindowDimentions";

const ORDER = "ORDER";
const REVIEWS = "REVIEWS";

const Tabs = ({ restaurant }: { restaurant: RestaurantType }) => {

    const getInitialTab = (visitedTab: string) => {
        switch (visitedTab) {
            case '':
                return ORDER;
            case '/reviews':
                return REVIEWS;
            default:
                return ORDER;
        }
    }


    const { pathname } = useLocation();
    const [activeTab, setActiveTab] = useState(getInitialTab(pathname.split(`/restaurant/${restaurant._id}`)[1]));
    const navigate = useNavigate();
    const {isMobile} = useWindowWidth();

    useEffect(() => {
        setActiveTab(getInitialTab(pathname.split(`/restaurant/${restaurant._id}`)[1]))
    }, [pathname])

    return (
        <div className={isMobile ? "mt-2" : "mt-5"}>
            <div className="d-flex flex-row">
                <div
                    style={activeTab === ORDER ? styles.activeTab : styles.tab}
                    onClick={() => { setActiveTab(ORDER); navigate('') }}
                    className="text-danger fs-5">
                    Order Online
                </div>
                <div
                    style={activeTab === REVIEWS ? styles.activeTab : styles.tab}
                    onClick={() => { setActiveTab(REVIEWS); navigate('reviews') }}
                    className="text-danger fs-5">
                    Reviews
                </div>
            </div>
            <hr style={{ marginTop: '-2px', borderWidth: '2px', borderColor: "rgba(0,0,0,0.2)" }} />
            <div className="my-3">
                {activeTab === ORDER && <Menu menu={restaurant?.menu || []} />}
                <Outlet />
            </div>
        </div>
    );
}

const RestaurantDetails = () => {

    const { restaurantId } = useParams();
    const [loading, setLoading] = useState(false);
    const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { isMobile } = useWindowWidth();

    useEffect(() => {
        setLoading(true);
        if (restaurantId?.length === 24) {
            api({ method: "GET", url: `/restaurant/v2/${restaurantId}` })
                .then((res) => {
                    if (res?.status?.code === 200) {
                        setRestaurant(res.data.restaurant);
                        setLoading(false);
                    }
                })
                .catch((err: APIResponse) => {
                    setError(err?.status?.message);
                    setLoading(false);
                })
        }
    }, []);

    return (
        <Fragment>
            {loading && <Loader />}
            {error && <LoadError error={error} />}
            {restaurant && <div className="mt-4">
                <div className="d-flex flex-row justify-content-between align-items-start">
                    <h1 style={styles.heading}>{restaurant?.name}</h1>
                    {!isMobile && <div className="d-flex flex-row align-items-center">
                        <RatingTag rating={restaurant?.average_rating} />
                        <div className="d-flex flex-column ms-2">
                            <span className={isMobile ? "text-center" : ""} style={styles.ratingHeading}><strong>{restaurant?.total_ratings}</strong></span>
                            {restaurant?.total_ratings && <span style={styles.ratingDescription}>Delivery Ratings</span>}
                        </div>
                    </div>}
                </div>
                <div style={styles.tagsContainer}>{getTags(restaurant?.tags)}</div>
                <div style={styles.address}>{`${restaurant?.address_line}, ${restaurant?.city}.`}</div>
                {isMobile && <div className="d-flex flex-row align-items-center mt-4">
                    <RatingTag rating={restaurant?.average_rating} />
                    <div className="d-flex flex-column ms-2">
                        <span className={isMobile ? "text-center" : ""} style={styles.ratingHeading}><strong></strong></span>
                        {restaurant?.total_ratings && <span style={styles.ratingDescription}>{`${restaurant?.total_ratings} Delivery Ratings`}</span>}
                    </div>
                </div>}
                <Tabs restaurant={restaurant} />
            </div>}
        </Fragment>
    );
}

const styles: StyleSheetType = {
    heading: { fontWeight: '500', color: '#1c1c1c' },
    tagsContainer: { fontSize: '16px', color: '#696969', textTransform: 'capitalize' },
    address: { fontSize: '16px', color: '#9c9c9c', textTransform: 'capitalize', marginTop: '5px' },
    ratingHeading: { fontSize: '13px', marginBottom: '-2px' },
    ratingDescription: { fontSize: '13px', color: '#363636' },
    tab: { paddingTop: "10px", paddingBottom: "10px", marginRight: '20px', cursor: 'pointer' },
    activeTab: { paddingTop: "10px", paddingBottom: "10px", marginRight: '20px', cursor: 'pointer', borderBottom: "2px solid #dc3545" },
}

export default RestaurantDetails;