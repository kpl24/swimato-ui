import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Reviews from "../../../screens/restaurant-details/reviews";
import getRestaurantReviews from "../../data/getRestaurantReviews";

vi.mock('react-router-dom', () => ({
    useParams: vi.fn(),
}));

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('Restaurant Details', () => {
    it('should render the restaurant details component correctly', () => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        (useParams as any).mockReturnValue({ restaurantId: '66b9bb39130d8de1720d5822' });
        mockedAxios.mockResolvedValue({ data: getRestaurantReviews });
        const component = render(<Reviews />);
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
                    error: "Error getting reviews"
                }
            }
        });
        const component = render(<Reviews />);
        waitFor(() => expect(component).toBeDefined())
    });
});