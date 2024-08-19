import { render, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import Home from '../../screens/home';
import olaApiResponse from '../data/olaApiResponse';

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


describe('Home Success', () => {
    beforeEach(() => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        (window as any).navigator = mockNavigator;
        global.fetch = vi.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => new Promise((resolve) => resolve(olaApiResponse)),
        });
    });
    it('should render the home component correctly', () => {
        const component = render(<Home />);
        waitFor(() => expect(component).toBeDefined())
    });
});