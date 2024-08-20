import { render, waitForElementToBeRemoved } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import Home from '../../screens/home';
import olaApiResponse from '../data/olaApiResponse';
import axios from 'axios';
import getCityRestaurantsResponse from '../data/getCityRestaurantsResponse';

const locationMockResponse = {
    "timestamp": 1724077722102,
    "coords": {
        "accuracy": 10840.454327012008,
        "latitude": 16.8361984,
        "longitude": 74.6717184,
        "altitude": null,
        "altitudeAccuracy": null,
        "heading": null,
        "speed": null
    }
}

const mockNavigator = {
    geolocation: {
        getCurrentPosition: vi.fn().mockImplementationOnce((success) => Promise.resolve(success(locationMockResponse))),
    }
};

vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('Home Success', () => {

    beforeEach(() => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        (window as any).navigator = mockNavigator;
        global.fetch = vi.fn().mockResolvedValue({ ok: true, json: async () => new Promise((resolve) => resolve(olaApiResponse)) });
    });

    it('should fetch location and render restaurants correctly', async () => {
        const { getByText } = render(<Home />);
        expect(getByText('Locating you')).toBeDefined();
        await waitForElementToBeRemoved(() => getByText('Locating you'));
        await mockedAxios.mockResolvedValue({ data: getCityRestaurantsResponse });
        expect(getByText('Order food online in Miraj')).toBeDefined();
    });
});