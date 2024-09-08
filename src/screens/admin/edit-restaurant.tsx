import { Fragment, useEffect, useState } from "react";
import AdminHeader from "../../components/shared/admin-header";
import { useParams } from "react-router-dom";
import { APIResponse, CategoryType, MenuItemType, RestaurantType } from "../../constants/types";
import { IoAddCircle } from "react-icons/io5";
import { BiCheckboxSquare } from "react-icons/bi";
import { api } from "../../helpers/axios";
import Loader from "../../components/shared/loader";
import LoadError from "../../components/shared/load-error";
import AddCategory from "./add-category";
import AddMenu from "./add-menu";

const CategoriesAndMenu = ({ restaurant }: { restaurant: RestaurantType }) => {

    const [categories, setCategories] = useState(restaurant.categories);
    const [menuItems, setMenuItems] = useState(restaurant.menu_items);
    const [selectedCat, setSelectedCat] = useState(categories.length > 0 ? categories[0] : null);
    const [showAddCat, setShowAddCat] = useState(false);
    const [showAddMenu, setShowAddMenu] = useState(false);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center">
                <h5>Menu Categories</h5>
                <div role="button" onClick={() => setShowAddCat(true)}>Add Cateogry <IoAddCircle className="text-danger fs-3" /></div>
            </div>
            <AddCategory
                onAdd={(newCat) => {
                    setCategories([...categories, newCat])
                    setSelectedCat(newCat)
                }}
                restaurant_id={restaurant._id}
                categories={categories}
                show={showAddCat} handleCategoryModal={setShowAddCat}
            />
            {selectedCat && <AddMenu onAdd={(newItem) => setMenuItems([...menuItems, newItem])} restaurant_id={restaurant._id} category_id={selectedCat._id} menu_items={menuItems} show={showAddMenu} handleMenuModal={setShowAddMenu} />}
            {categories.length > 0 && <Fragment>
                <hr />
                <div className="d-flex gap-4 overflow-x-scroll horizontal-items">
                    {categories.map((item: CategoryType) => {
                        return (
                            <div
                                key={item._id}
                                role="button"
                                onClick={() => setSelectedCat(item)}
                                className={`text-nowrap pb-2 border-bottom border-4 ${selectedCat?._id === item?._id ? "border-danger" : "border-light"}`}
                            >
                                {item.title}
                            </div>
                        );
                    })}
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                    <h5>Menu Items</h5>
                    <div role="button" onClick={() => setShowAddMenu(true)}>{`Add ${selectedCat?.title}`} <IoAddCircle className="text-danger fs-3" /></div>
                </div>
                <div className="row row-cols-1 row-cols-lg-3 mt-4">
                    {menuItems.filter((item: MenuItemType) => item?.category_id === selectedCat?._id).map((item) => {
                        return (
                            <div className="col d-flex border-bottom border-2 py-3">
                                <div><BiCheckboxSquare size={20} color={item.is_veg ? "green" : "rgb(191, 76, 67)"} /></div>
                                <div className="d-flex flex-column">
                                    <div>{item.title}</div>
                                    <div className="pt-1">{`₹ ${item.price}`}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Fragment>}
        </div>
    );
}

const EditRestaurant = () => {

    const { restaurantId } = useParams();
    const [loading, setLoading] = useState(false);
    const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError('');
        if (restaurantId?.length === 24) {
            api({ method: "GET", url: `/admin/restaurants/${restaurantId}` })
                .then((result: APIResponse) => {
                    setLoading(false);
                    if (result?.status?.code === 200) {
                        setRestaurant(result.data.restaurant);
                    } else {
                        setError(result?.status?.message);
                    }
                })
                .catch((err: APIResponse) => {
                    setError(err?.status?.message);
                    setLoading(false);
                })
        }
    }, []);

    return (
        <AdminHeader title={`Edit Menu ${restaurant ? `for ${restaurant.name}` : ""}`}>
            {loading && <Loader message="Loading Restaurant Details" />}
            {error && <LoadError error={error} />}
            {restaurant && <CategoriesAndMenu restaurant={restaurant} />}
        </AdminHeader>
    );
}

export default EditRestaurant;