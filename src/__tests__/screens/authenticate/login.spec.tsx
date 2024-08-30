import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Login from '../../../screens/authenticate/login';
import SignUp from '../../../screens/authenticate/signup';
import Loader from '../../../components/loader';

describe('Login', () => {
    const redirect = vi.fn();
    it('should render the login component correctly and redirect to signup', () => {
        const { getByText } = render(<Login redirect={redirect} />);
        fireEvent.click(getByText('Create One'))
        expect(SignUp).toBeDefined()
    });
    it('should render the login component and submit correctly', () => {
        const { getByText } = render(<SignUp redirect={redirect} />);
        fireEvent.click(getByText('Login'))
        expect(Loader).toBeDefined()
    });
})