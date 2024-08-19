import { render } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import RestaurantCard from '../../components/restaurant-card';
import { Restaurant } from '../../constants/types';

const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
   ...vi.importActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

describe('Restaurant Card', () => {
    const restaurant: Restaurant = {
        _id: "123456789012345678890987",
        owner_id: "123456789012345678890987",
        is_approved: true,
        logo: "",
        name: "Test Restaurant",
        tags: ["test tag 1"],
        country: "India",
        state: "MH",
        city: "Miraj",
        address_line: "Near Gandhi Chowk, Miraj",
        location: {
            latitude: "1234",
            longitude: "1234"
        }
    };

    it('should render the Restaurant component correctly', () => {
        render(<RestaurantCard restaurant={restaurant} />)
    });
})