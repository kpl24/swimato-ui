import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Header from '../../components/header';
import Home from '../../screens/home';

const mockUsedNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
    Outlet: vi.fn().mockImplementation(() => <Home />),
}));

describe('Header', () => {
    it('should render the header component correctly', () => {
        const { getByText } = render(<Header />);
        fireEvent.click(getByText('swimato'))
        expect(Home).toBeDefined()
    });
})