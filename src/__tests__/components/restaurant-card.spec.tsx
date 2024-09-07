import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import RestaurantCard from '../../components/restaurant-card';
import { RestaurantType } from '../../constants/types';

const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
}));

describe('Restaurant Card', () => {
    const restaurant: RestaurantType = {
        _id: "123456789012345678890987",
        owner_id: "123456789012345678890987",
        is_approved: true,
        logo: "",
        name: "Test Restaurant",
        tags: ["test tag 1", "test tag 2"],
        country: "India",
        state: "MH",
        city: "Miraj",
        address_line: "Near Gandhi Chowk, Miraj",
        categories: [],
        menu_items: [],
        location: {
            latitude: "1234",
            longitude: "1234"
        }
    };

    it('should render the Restaurant component correctly', () => {
        const { getByText } = render(<RestaurantCard restaurant={restaurant} />);
        expect(getByText('Test Restaurant')).toBeDefined();
    });
    it('should render the Restaurant component and redirect to next screen on click', () => {
        const { getByTestId } = render(<RestaurantCard restaurant={restaurant} />);
        const element = getByTestId("show-rest-details");
        fireEvent.click(element);
        fireEvent.mouseOver(element);
        fireEvent.mouseLeave(element);
    });
})