interface Category {
    createdAt: string
    restaurant_id: string
    title: string
    updatedAt: string
    _id: string
}

interface Restaurant {
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
    categories: Category[],
    menu_items: MenuItem[],
    location: {
        latitude: string,
        longitude: string
    }
}

interface User {
    _id: string,
    name: string,
    email: string,
    password: string,
    confirm: string,
    role?: "user" | "admin"
    display_picture: string
}

interface StyleSheet {
    [key: string]: React.CSSProperties;
}

interface MenuItem {
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
    items: [MenuItem],
    title: string
}

interface Rating {
    _id: string,
    rating: number,
    description: string,
    updatedAt: string,
    user: User
}

interface APIResponse {
    status: {
        code: number,
        message: string
    }
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    data: any
}

export {
    type Restaurant,
    type StyleSheet,
    type MenuType,
    type Category,
    type MenuItem,
    type APIResponse,
    type User,
    type Rating
}