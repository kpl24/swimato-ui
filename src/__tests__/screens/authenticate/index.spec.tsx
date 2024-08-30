import { fireEvent, render } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import Authenticate, { ShowAuthScreenOptions } from '../../../screens/authenticate';

describe('Authenticate', () => {
    const handleModal = vi.fn();
    it('should render the authenticate component and show login form correctly', () => {
        const showAuthScreenOptions: ShowAuthScreenOptions = {
            show: true,
            type: 'login'
        }
        const { getByText } = render(<Authenticate showAuthScreenOptions={showAuthScreenOptions} handleModal={handleModal} />);
        fireEvent.click(getByText('Create One'));
    });
    it('should render the authenticate component and show signup form correctly', () => {
        const showAuthScreenOptions: ShowAuthScreenOptions = {
            show: true,
            type: 'signup'
        }
        const { getByText } = render(<Authenticate showAuthScreenOptions={showAuthScreenOptions} handleModal={handleModal} />);
        fireEvent.click(getByText('Login'));
    });
    it('should render the authenticate component and close the modal', () => {
        const showAuthScreenOptions: ShowAuthScreenOptions = {
            show: true,
            type: 'signup'
        }
        const { getByTestId } = render(<Authenticate showAuthScreenOptions={showAuthScreenOptions} handleModal={handleModal} />);
        fireEvent.click(getByTestId('close-icon'));
    });
})