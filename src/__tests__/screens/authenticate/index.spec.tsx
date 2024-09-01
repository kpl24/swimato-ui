import { fireEvent, render } from '@testing-library/react'
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