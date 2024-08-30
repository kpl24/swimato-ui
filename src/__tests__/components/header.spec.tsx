import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Header from '../../components/header';
import Home from '../../screens/home';
import Login from '../../screens/authenticate/login';
import SignUp from '../../screens/authenticate/signup';

const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
    Outlet: vi.fn().mockImplementation(() => <Home />),
}));

vi.mock('../../helpers/useWindowDimentions', () => ({
    ...vi.importActual('../../helpers/useWindowDimentions'),
    useWindowWidth: () => ({ isMobile: true })
}));

describe('Header', () => {
    it('should render the header component correctly', () => {
        const { getByText } = render(<Header />);
        fireEvent.click(getByText('swimato'))
        expect(Home).toBeDefined()
    });
    it('should render the header component correctly and open login form', () => {
        const { getByText } = render(<Header />);
        fireEvent.click(getByText('Log in'))
        expect(Login).toBeDefined()
    });
    it('should render the header component correctly and open login form', () => {
        const { getByText } = render(<Header />);
        fireEvent.click(getByText('Sign up'))
        expect(SignUp).toBeDefined()
    });
    it('should render the header component correctly and open login form and redirect to signup', () => {
        const { getByText } = render(<Header />);
        fireEvent.click(getByText('Log in'))
        fireEvent.click(getByText('Create One'))
        expect(SignUp).toBeDefined()
    });
})