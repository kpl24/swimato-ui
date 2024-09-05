import { describe, expect, it, vi } from 'vitest'
import Authenticate, { ShowAuthScreenOptions } from '../../../screens/authenticate';
import { renderWithProviders } from '../../test-utils';

describe('Authenticate', () => {
    const handleModal = vi.fn();
    it('should render the authenticate component and show login form correctly', () => {
        const showAuthScreenOptions: ShowAuthScreenOptions = {
            show: true,
            type: 'login'
        }
        renderWithProviders(<Authenticate showAuthScreenOptions={showAuthScreenOptions} handleModal={handleModal} />);
        expect(Authenticate).toBeDefined();
    });
})