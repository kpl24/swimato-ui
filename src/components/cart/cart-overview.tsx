import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FaArrowCircleRight } from "react-icons/fa";
import { useWindowWidth } from "../../helpers/useWindowDimentions";
import { StyleSheetType } from "../../constants/types";
import { useLocation, useNavigate } from "react-router-dom";

const CartOverview = () => {

    const { cart } = useSelector((state: RootState) => state.cartDetails);
    const { pathname } = useLocation();
    const { isMobile } = useWindowWidth();
    const navigate = useNavigate();

    const isOnCartPage = pathname.includes('/cart')
    let itemsAdded: number = 0;
    let estimatedPrice: number = 0;
    cart.map((cartItem) => {
        itemsAdded += (1 * cartItem.quantity)
        estimatedPrice += (cartItem.item.price * cartItem.quantity);
    })

    const navigateToCart = () => navigate('/cart');

    const Content = () => (
        <div className="d-flex flex-row justify-content-center align-items-center">
            <div className="d-flex flex-column align-items-center" >
                <span style={{ fontSize: '14px' }} className={"me-2"}>{`${itemsAdded} ${itemsAdded === 1 ? 'item' : 'items'} added`}</span>
                <div style={{ fontSize: '14px' }}>{`worth ₹ ${estimatedPrice}`}</div>
            </div>
            <FaArrowCircleRight color="white" size={20} />
        </div>
    );

    if (!!itemsAdded && !isOnCartPage && !isMobile) {
        return (
            <div onClick={navigateToCart} className="mx-4 bg-danger text-light px-4 py-1 rounded">
                <Content />
            </div>
        );
    }

    return !!itemsAdded && !isOnCartPage && isMobile && (
        <div onClick={navigateToCart} className="bg-danger text-light px-4 py-2" style={styles.container}>
            <Content />
        </div>
    );
}

const styles: StyleSheetType = {
    container: { position: 'fixed', bottom: 0, left: 0, width: '100vw' }
}

export default CartOverview;