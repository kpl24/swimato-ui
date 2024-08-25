import { useState } from "react";
import { Restaurant, StyleSheet } from "../constants/types";
import { useNavigate } from "react-router-dom";
import RatingTag from "./rating-tag";

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {

    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="col my-4">
            <div data-testid="show-rest-details" onClick={() => navigate(`/restaurant/${restaurant._id}`)} style={styles.pointer} onMouseLeave={() => setIsHovered(false)} onMouseEnter={() => setIsHovered(true)} className={`border ${isHovered ? 'border-light-subtle shadow-lg' : 'border-white'} rounded-4 p-2`}>
                <img src={restaurant.logo} style={{maxHeight: "170px", objectFit: "cover"}} className="w-100 rounded-4 align-self-center" />
                <div className="py-2 w-100">
                    <div style={styles.headingContainer}>
                        <div style={styles.heading}>{restaurant.name}</div>
                        <RatingTag small rating={restaurant.average_rating} />
                    </div>
                    <div style={{ ...styles.headingContainer, ...styles.tagsContainer }}>
                        <div className="text-truncate py-1 w-50">
                            {restaurant.tags.map((item, index) => `${item}${index === restaurant.tags.length - 1 ? '.' : ','} `)}
                        </div>
                        <div>&#8377;200 for one</div>
                    </div>
                    <div style={styles.deliverTime} className="text-end">29 min</div>
                </div>
            </div>
        </div>
    );
}

const styles: StyleSheet = {
    pointer: {cursor: 'pointer'},
    headingContainer: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    heading: { fontSize: '16px', fontWeight: '500', color: '#1c1c1c' },
    rating: { fontSize: '13px', backgroundColor: '#ebffef', color: '#3ab757', border: '1px solid #3ab757' },
    tagsContainer: { fontSize: '14px', color: '#696969' },
    deliverTime: { fontSize: '14px', color: '#black', fontWeight:"500" },
}

export default RestaurantCard;