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
    menu?: Menu[],
    location: {
        latitude: string,
        longitude: string
    }
}

interface StyleSheet {
    [key: string]: React.CSSProperties;
}

interface MenuItem {
    image: string,
    description: string,
    is_egg_only: boolean,
    is_veg: boolean,
    price: number,
    title: string,
}

interface Menu {
    count: number,
    items: [MenuItem],
    title: string
}

export {
    type Restaurant,
    type StyleSheet,
    type Menu
}