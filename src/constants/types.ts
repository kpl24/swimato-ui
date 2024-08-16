interface Restaurant {
    owner_id: string,
    is_approved: boolean,
    logo: string,
    name: string,
    tags: [string],
    country: string,
    state: string,
    city: string,
    address_line: string,
    location: {
        latitude: string,
        longitude: string
    }
}

interface AddressState {
    location: {
        latitude: string,
        longitude: string,
    }
    addressLine: string,
    city: string
}

interface OlaAddressComponent {
    types: [string],

}

export {
    type AddressState,
    type OlaAddressComponent,
    type Restaurant,
}