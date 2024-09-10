import { useEffect, useState } from "react";
import { APIResponse, OrderType } from "../constants/types";
import Loader from "../components/shared/loader";
import { api } from "../helpers/axios";
import toast from "../helpers/toast";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { BiCheckboxSquare } from "react-icons/bi";
import { TbStar, TbStarFilled } from "react-icons/tb";
import { IconBaseProps } from "react-icons";

interface IconProps extends IconBaseProps {
    isActive: boolean
}

const ratings = [1, 2, 3, 4, 5];

const IconToggle = (props: IconProps) => props.isActive ? <TbStarFilled {...props} /> : <TbStar {...props} />

const Rating = () => {

    const [tempRating, setTempRating] = useState(0);
    const [rating, setRating] = useState<number>(0);

    return (
        <div>
            {ratings.map((number) => {
                return (
                    <IconToggle
                        onMouseOver={() => setTempRating(number)}
                        onMouseLeave={() => setTempRating(0)}
                        onClick={() => setRating(number)}
                        isActive={rating > number - 1}
                        role="button"
                        color={tempRating > number - 1 ? "#FFC107" : rating > number - 1 ? "#FFC107" : "#6c757d"}
                        className="rating-star"
                    />
                );
            })}
        </div>
    );
}

const Orders = () => {

    const [orders, setOrders] = useState<OrderType[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        api({ method: "get", url: '/order' })
            .then((results: APIResponse) => {
                setOrders(results?.data?.orders);
                setLoading(false);
            })
            .catch((err: APIResponse) => {
                setLoading(false);
                toast({ type: "error", title: "Get Orders", "message": err?.status?.message })
            })
    }, [])

    return (
        <div>
            {loading && <Loader message="Loading your orders" />}
            {orders.length === 0 && <div className="fs-6 text-center mt-5">No orders placed yet</div>}
            {orders.map((order) => {
                return (
                    <div key={order._id} className="bg-light p-3 mb-3 rounded">
                        <div className="d-flex ">
                            <img className="rounded" src={order.restaurant_id.logo} style={{ height: 70, width: 70, objectFit: "cover" }} />
                            <div className="d-flex flex-column justify-content-between ms-3">
                                <div className="fs-6">{order.restaurant_id.name}</div>
                                <div style={{ fontSize: '14px' }} className="text-secondary text-capitalize">{`${order.restaurant_id.address_line}, ${order.restaurant_id.city}`}</div>
                                <div role="button" onClick={() => navigate(`/restaurant/${order.restaurant_id._id}`)} className="text-danger" style={{ fontWeight: "500", fontSize: '14px' }}>{`View Menu >`}</div>
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex flex-column">
                            {order.items.map((item) => {
                                return (
                                    <div className="d-flex mb-2 align-items-center">
                                        <div><BiCheckboxSquare size={25} color={item.is_veg ? "green" : "rgb(191, 76, 67)"} /></div>
                                        <span className="me-1 text-secondary">{`${item.quantity} x`}</span>
                                        <span style={{ fontWeight: "500" }}>{item.title}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <hr />
                        <div role="button" className="d-flex justify-content-between align-items-center">
                            <div>
                                <div style={{ fontSize: '14px' }} className="text-secondary">{`Order placed on ${moment(order.createdAt).format('DD MMM, hh:mm A')}`}</div>
                                <div style={{ fontSize: '14px', fontWeight: "600" }} className="text-capitalize text-secondary-emphasis">{order.status}</div>
                            </div>
                            <div style={{ fontWeight: "600" }} className="fs-6">{`₹ ${order.grand_total}`}</div>
                        </div>
                        <hr />
                        <div className="mb-2">
                            {order.status === "delivered" && <Rating />}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Orders;