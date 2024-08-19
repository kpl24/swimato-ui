import { render, screen } from '@testing-library/react'
import App from '../App';
import { describe, it, vi } from 'vitest'

const mockGeolocation = {
    getCurrentPosition: vi.fn(),
    watchPosition: vi.fn()
};

//@ts-expect-error: not in namespace
global.navigator.geolocation = mockGeolocation;

describe('App', () => {
    it('renders the App component', () => {
        render(<App />)

        screen.debug(); // prints out the jsx in the App component unto the command line
    })
})