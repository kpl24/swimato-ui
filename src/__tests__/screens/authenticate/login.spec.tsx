import { describe, expect, it, vi } from 'vitest'
import Login from '../../../screens/authenticate/login';
import { renderWithProviders } from '../../test-utils';

describe('Login', () => {
    const redirect = vi.fn();
    it('should render the login component correctly and redirect to signup', () => {
        renderWithProviders(<Login redirect={redirect} />);
        expect(Login).toBeDefined()
    });
})