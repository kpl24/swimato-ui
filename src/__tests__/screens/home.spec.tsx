import { cleanup } from '@testing-library/react'
import { describe, it, vi, Mock, afterEach } from 'vitest'
import Home from '../../screens/home';
import * as APIs from '../../helpers/axios';
import getCityRestaurantsResponse from '../data/getCityRestaurantsResponse';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../test-utils';

vi.mock('../../helpers/axios');

describe('Home', () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
        vi.restoreAllMocks();
    })

    it('should fetch location and show loader correctly', async () => {
        (APIs.api as Mock).mockResolvedValueOnce(getCityRestaurantsResponse);
        renderWithProviders(<BrowserRouter><Home /></BrowserRouter>);
    });
});