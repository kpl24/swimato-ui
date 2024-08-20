import { describe, it, expect, vi } from 'vitest'
import { createRoot } from 'react-dom/client'
import '../main';
import App from '../App';

vi.mock('react-dom/client', () => ({
    createRoot: vi.fn().mockReturnValue({
        render: vi.fn(),
    }),
}));

describe('main.tsx', () => {
    it('should render the App component', () => {
        const mockRoot = createRoot(document.getElementById('root')!)
        // Expect createRoot to have been called with the correct argument
        expect(createRoot).toHaveBeenCalledWith(document.getElementById('root')!)
        // Expect the render method to be called with the <App /> component
        expect(mockRoot.render).toHaveBeenCalledWith(<App />)
    })
});