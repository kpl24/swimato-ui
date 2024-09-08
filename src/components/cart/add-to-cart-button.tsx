import { useDispatch, useSelector } from "react-redux";
import { MenuItemType } from "../../constants/types";
import { CartItemType, addCartItem, removeCartItem, removeRestaurantId, setRestaurantId, updateCartItem } from "../../redux/reducers/cart";
import { RootState } from "../../redux/store";
import { GrFormSubtract, GrFormAdd } from "react-icons/gr";
import { useEffect } from "react";


const AddToCart = ({ item }: { item: MenuItemType }) => {

    const dispatch = useDispatch();
    const { cart, restaurant_id } = useSelector((state: RootState) => state.cartDetails);

    const isInCart: CartItemType[] = cart.filter(cartItem => cartItem.item._id === item._id);
    const isAddDisabled = restaurant_id && restaurant_id !== item.restaurant_id

    useEffect(() => {
        if (cart.length === 0 && restaurant_id) {
            dispatch(removeRestaurantId());
        }
    }, [cart])

    const handleCartItems = (quantity: number) => {
        if (quantity === 0) dispatch(removeCartItem({ item, quantity }));
        else dispatch(updateCartItem({ item, quantity }));
    }

    const addToCart = () => {
        if (!isAddDisabled) {
            dispatch(addCartItem({ item, quantity: 1 }));
            dispatch(setRestaurantId({ restaurant_id: item.restaurant_id }));
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
        <div className="user-select-none" role="button" onClick={addToCart}>
            <div className={`${isAddDisabled ? 'bg-secondary' : 'bg-danger'} text-light px-2 rounded`}>Add</div>
        </div>
    );
}

export default AddToCart;