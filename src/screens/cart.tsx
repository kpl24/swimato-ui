import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import Loader from "../components/shared/loader";
import { api } from "../helpers/axios";
import { APIResponse, OrderSummaryType } from "../constants/types";
import { IoBagHandle } from "react-icons/io5";
import { IoMdPhonePortrait } from "react-icons/io";
import { FiPackage } from "react-icons/fi";
import { RiBankFill } from "react-icons/ri";
import { MdDeliveryDining } from "react-icons/md";
import toast from "../helpers/toast";
import AddToCart from "../components/cart/add-to-cart-button";
import Button from "../components/form/button";
import { resetCart } from "../redux/reducers/cart";
import { useNavigate } from "react-router-dom";

const SummaryComponent = ({ title, amount, icon }: { title: string, amount: number, icon: JSX.Element }) => {
    return (
        <div className="d-flex flex-row justify-content-between py-1">
            <div className="d-flex flex-row align-items-center">
                <div style={{ width: '30px' }}>{icon}</div>
                <div style={{ fontWeight: "500" }}>{title}</div>
            </div>
            <div style={{ fontWeight: "500" }}>{`₹ ${amount}`}</div>
        </div>
    );
}

const Cart = () => {

    const { cart, restaurant_id } = useSelector((state: RootState) => state.cartDetails);
    const [loading, setLoading] = useState(false);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [summary, setSummary] = useState<OrderSummaryType | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const items = cart.map((cartItem) => ({ _id: cartItem.item._id, quantity: cartItem.quantity }));

    useEffect(() => {
        if (cart.length) {
            setLoading(true);
            api({ method: "POST", url: `/order/summary`, data: { restaurant_id, items } })
                .then((results: APIResponse) => {
                    setLoading(false);
                    setSummary(results?.data?.summary)
                })
                .catch((err: APIResponse) => {
                    setLoading(false);
                    toast({ type: "error", title: "Error generating summary", message: err?.status?.message })
                })
        } else {
            setSummary(null);
        }
    }, [cart])

    const placeOrder = () => {
        setPlacingOrder(true);
        api({ method: "POST", url: `/order/place`, data: { restaurant_id, items, summary } })
            .then((results: APIResponse) => {
                setPlacingOrder(false);
                setSummary(null);
                dispatch(resetCart());
                navigate('/');
                toast({ type: "success", title: "Place order", message: results?.status?.message })
            })
            .catch((err: APIResponse) => {
                setPlacingOrder(false);
                toast({ type: "error", title: "Error placing order", message: err?.status?.message })
            })
    }

    return (
        <div className="py-3">
            {cart.length === 0 && <div className="fs-6 text-center">The cart is empty</div>}
            {!!cart.length && <div className="row">
                <div className="col-lg-6 col-12 p-1">
                    <div className="bg-light rounded p-4">
                        {cart.map((cartItem, index) => {
                            return (
                                <div key={index} className="d-flex flex-row justify-content-between mb-3">
                                    <div>
                                        <div className="mb-2">{cartItem.item.title}</div>
                                        <div style={{ fontSize: '14px' }}>{`₹ ${cartItem.item.price}`}</div>
                                    </div>
                                    <div className="d-flex flex-column align-items-end">
                                        <AddToCart item={cartItem.item} />
                                        <div className="mt-2" style={{ fontSize: '14px' }}>{`₹ ${cartItem.item.price * cartItem.quantity}`}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="col-lg-6 col-12 p-1">
                    <div className=" bg-light rounded px-4 pt-4">
                        {loading && <Loader message={summary ? 'Updating order summary' : 'Generating Order Summary'} />}
                        {summary && !loading && <div>
                            <SummaryComponent title="Item total" amount={summary.item_total} icon={<IoBagHandle className="text-danger fs-5" />} />
                            <SummaryComponent title="GST" amount={summary.taxes} icon={<RiBankFill className="text-danger fs-5" />} />
                            <SummaryComponent title="Delivery partner fee" amount={summary.delivery_charges} icon={<MdDeliveryDining className="text-danger fs-5" />} />
                            <SummaryComponent title="Platform fee" amount={summary.platform_fee} icon={<IoMdPhonePortrait className="text-danger fs-5" />} />
                            <SummaryComponent title="Restaurant Packing Charges" amount={summary.packaging_charges} icon={<FiPackage className="text-danger fs-5" />} />
                            <div className="d-flex flex-row justify-content-between mt-4">
                                <div className="d-flex flex-row align-items-center">
                                    <div className="fs-5" style={{ fontWeight: "500" }}>Grand Total</div>
                                </div>
                                <div className="fs-5" style={{ fontWeight: "500" }}>{`₹ ${summary.grand_total}`}</div>
                            </div>
                            {placingOrder ? <Loader message="Placing Order" /> : <Button onClick={placeOrder}>Place Order</Button>}
                        </div>}
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Cart;