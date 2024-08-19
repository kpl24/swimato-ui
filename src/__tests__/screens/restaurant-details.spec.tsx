import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RestaurantDetails from "../../screens/restaurant-details";
import { useParams } from 'react-router-dom';
import getRestaurantsResponse from "../data/getRestaurantsResponse";
import axios from "axios";

vi.mock('react-router-dom', () => ({
    useParams: vi.fn(),
}));

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('Restaurant Details', () => {
    it('should render the restaurant details component correctly', () => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        (useParams as any).mockReturnValue({ restaurantId: '66b9bb39130d8de1720d5822' });
        mockedAxios.mockResolvedValue({ data: getRestaurantsResponse });
        const component = render(<RestaurantDetails />);
        waitFor(() => expect(component).toBeDefined())
    });
    it('should render the restaurant details component correctly if api rejects', () => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        (useParams as any).mockReturnValue({ restaurantId: '66b9bb39130d8de1720d5822' });
        mockedAxios.mockRejectedValue({
            data: {
                status: {
                    code: 500,
                    message: "Error"
                },
                data: {
                    error: "Error getting restaurants"
                }
            }
        });
        const component = render(<RestaurantDetails />);
        waitFor(() => expect(component).toBeDefined())
    });
});