import { describe, it, vi } from 'vitest'
import SignUp from '../../../screens/authenticate/signup';
import { renderWithProviders } from '../../test-utils';

describe('Signup', () => {
    const redirect = vi.fn();
    it('should render the signup component correctly and redirect to login', () => {
        renderWithProviders(<SignUp redirect={redirect} />);
    });
})