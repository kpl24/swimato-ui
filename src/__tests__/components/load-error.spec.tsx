import { render, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LoadError from '../../components/load-error'

describe('LoadError', () => {
    it('should render the LoadError component correctly', () => {
        render(<LoadError error='Something went wrong' />)
    });
    it('should render the LoadError component correctly if error message is not present', () => {
        const component = render(<LoadError />)
        waitFor(() => expect(component).toHaveTextContent('Something went wrong'));
    });
})