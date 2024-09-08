import { describe, expect, it, vi } from 'vitest'
import Header from '../../components/shared/header';
import Home from '../../screens/home';
import { renderWithProviders } from '../test-utils';

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
        renderWithProviders(<Header />);
        expect(Header).toBeDefined()
    });
})