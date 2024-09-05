import { fireEvent, render, waitForElementToBeRemoved } from "@testing-library/react";
import { describe, expect, it, Mock, vi } from "vitest";
import RestaurantDetails from "../../../screens/restaurant-details";
import { api } from '../../../helpers/axios';
import getRestaurantsResponse from "../../data/getRestaurantsResponse";
import { useParams } from "react-router-dom";
import Reviews from "../../../screens/restaurant-details/reviews";
import getRestaurantReviews from "../../data/getRestaurantReviews";

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = importOriginal();
    return {
        ...actual,
        useParams: vi.fn(),
        BrowserRouter: vi.fn().mockImplementation((props) => props.children),
        Outlet: vi.fn().mockImplementation(() => <Reviews />),
        useNavigate: () => vi.fn(),
        useLocation: () => ({ pathname: "/reviews" })
    }
});

vi.mock('../../../helpers/axios');

describe('Restaurant Details', () => {
    it('should render the restaurant details component correctly', async () => {
        (useParams as Mock).mockReturnValue({ restaurantId: "66befd3aae14d3f1010ef128" })
        //@ts-expect-error: no type present
        api.mockResolvedValueOnce(getRestaurantsResponse).mockResolvedValueOnce(getRestaurantReviews);;
        const { getByText } = render(<RestaurantDetails />);
        await waitForElementToBeRemoved(() => getByText('Loading'));
        const element = getByText('Order Online');
        await fireEvent.click(element);
        expect(getByText("Combos (2)")).toBeInTheDocument();
    });

    it('should render the restaurant details component correctly', async () => {
        (useParams as Mock).mockReturnValue({ restaurantId: "66befd3aae14d3f1010ef128" })
        //@ts-expect-error: no type present
        api.mockResolvedValueOnce(getRestaurantsResponse).mockResolvedValueOnce(getRestaurantReviews);
        const { getByText } = render(<RestaurantDetails />);
        await waitForElementToBeRemoved(() => getByText('Loading'));
        const element = getByText('Reviews');
        await fireEvent.click(element);
        expect(getByText("nice chicken triple rice")).toBeInTheDocument();
    });
});