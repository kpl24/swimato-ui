import { cleanup, render, waitForElementToBeRemoved } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, Mock, afterEach } from 'vitest'
import Home from '../../screens/home';
import olaApiResponse from '../data/olaApiResponse';
import * as APIs from '../../helpers/axios';
import getCityRestaurantsResponse from '../data/getCityRestaurantsResponse';
import { BrowserRouter } from 'react-router-dom';

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

vi.mock('../../helpers/axios');

describe('Home Success', () => {

    beforeEach(() => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        (window as any).navigator = mockNavigator;
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
        vi.restoreAllMocks();
    })

    it('should fetch location and show loader correctly', async () => {
        (APIs.api as Mock).mockResolvedValueOnce(olaApiResponse).mockResolvedValueOnce(getCityRestaurantsResponse);
        const { getByText } = render(<BrowserRouter><Home /></BrowserRouter>);
        expect(getByText('Locating you')).toBeInTheDocument();
        await waitForElementToBeRemoved(() => getByText('Locating you'));
        expect(getByText('Order food online in Miraj')).toBeInTheDocument();
    });
});