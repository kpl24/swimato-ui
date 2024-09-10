interface CategoryType {
    createdAt: string
    restaurant_id: string
    title: string
    updatedAt: string
    _id: string
}

interface RestaurantType {
    _id: string,
    owner_id: string,
    is_approved: boolean,
    average_rating?: number,
    total_ratings?: number,
    logo: string,
    name: string,
    tags: string[],
    country: string,
    state: string,
    city: string,
    address_line: string,
    menu?: MenuType[],
    categories: CategoryType[],
    menu_items: MenuItemType[],
    location: {
        latitude: string,
        longitude: string
    }
}

interface UserType {
    _id: string,
    name: string,
    email: string,
    password: string,
    confirm: string,
    role?: "user" | "admin"
    display_picture: string
}

interface StyleSheetType {
    [key: string]: React.CSSProperties;
}

interface MenuItemType {
    _id: string,
    category_id: string,
    image: string,
    description: string,
    is_egg_only: boolean,
    is_veg: boolean,
    price: number,
    title: string,
    restaurant_id: string,
}

interface MenuType {
    _id: string,
    count: number,
    items: [MenuItemType],
    title: string
}

interface RatingType {
    _id: string,
    rating: number,
    description: string,
    updatedAt: string,
    user: UserType
}

interface APIResponse {
    status: {
        code: number,
        message: string
    }
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    data: any
}

interface OrderSummaryType {
    item_total: number
    taxes: number,
    delivery_charges: number,
    packaging_charges: number,
    platform_fee: number,
    grand_total: number
}

interface OrderItemType {
    title: string,
    price: number,
    is_veg: boolean,
    quantity: number,
    _id: string
}

interface OrderType {
    _id: string,
    restaurant_id: RestaurantType,
    user_id: string,
    status: 'placed' | 'confirmed' | 'transit' | 'delivered' | 'cancelled',
    items: OrderItemType[],
    item_total: number,
    taxes: number,
    delivery_charges: number,
    packaging_charges: number,
    platform_fee: number,
    grand_total: number,
    createdAt: string,
    updatedAt: string
}

export {
    type RestaurantType,
    type StyleSheetType,
    type MenuType,
    type CategoryType,
    type MenuItemType,
    type APIResponse,
    type UserType,
    type RatingType,
    type OrderSummaryType,
    type OrderType
}