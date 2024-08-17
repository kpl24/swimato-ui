import { Restaurant } from "../constants/types";

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
    return (
        <div className="d-flex flex-column col-4 p-3">
            <img src={restaurant.logo} className="w-100 rounded" />
            <div className="py-2 w-100">
                <div className="py-1" style={{fontSize: '18px'}}>{restaurant.name}</div>
                <div style={{fontSize: '12px', color: '#d6d6d6'}} className="text-truncate py-1">{restaurant.tags.map((item) => `${item}, `)}</div>
            </div>
        </div>
    );
}

export default RestaurantCard;