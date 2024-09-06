import { useDispatch, useSelector } from "react-redux";
import { MenuItem } from "../constants/types";
import { CartItemType, addCartItem, removeCartItem, updateCartItem } from "../redux/reducers/app";
import { RootState } from "../redux/store";
import { GrFormSubtract, GrFormAdd } from "react-icons/gr";


const ManageCart = ({ item }: { item: MenuItem }) => {

    const dispatch = useDispatch();
    const { cart, restaurant_id } = useSelector((state: RootState) => state.appDetails);

    const isInCart: CartItemType[] = cart.filter(cartItem => cartItem._id === item._id);
    const isAddDisabled = restaurant_id && restaurant_id !== item.restaurant_id

    const handleCartItems = (quantity: number) => {
        if (quantity === 0) {
            dispatch(removeCartItem({ _id: item._id, quantity }));
        } else {
            dispatch(updateCartItem({ _id: item._id, quantity }));
        }
    }

    return isInCart.length ? (
        <div role="button" className="user-select-none">
            <div className="bg-danger text-light rounded">
                <div className="d-flex">
                    <div className="px-2" onClick={() => handleCartItems(isInCart[0].quantity - 1)}><GrFormSubtract /></div>
                    <div style={{ width: "8px" }}>{isInCart[0].quantity}</div>
                    <div className="px-2" onClick={() => handleCartItems(isInCart[0].quantity + 1)}><GrFormAdd /></div>
                </div>
            </div>
        </div>
    ) : (
        <div
            className="user-select-none"
            role="button"
            onClick={() => isAddDisabled ? null : dispatch(addCartItem({ _id: item._id, quantity: 1, restaurant_id: item.restaurant_id }))}
        >
            <div className={`${isAddDisabled ? 'bg-secondary' : 'bg-danger'} text-light px-2 rounded`}>Add</div>
        </div>
    );
}

export default ManageCart;