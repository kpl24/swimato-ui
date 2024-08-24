import { cleanup, render } from '@testing-library/react'
import { describe, expect, it, vi, Mock, afterEach } from 'vitest'
import Home from '../../screens/home';
import * as APIs from '../../helpers/axios';
import getCityRestaurantsResponse from '../data/getCityRestaurantsResponse';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../helpers/axios');

describe('Home', () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
        vi.restoreAllMocks();
    })

    it('should fetch location and show loader correctly', async () => {
        (APIs.api as Mock).mockResolvedValueOnce(getCityRestaurantsResponse);
        const { getByText } = render(<BrowserRouter><Home /></BrowserRouter>);
        expect(getByText('Finding restaurants!')).toBeInTheDocument();
    });
});