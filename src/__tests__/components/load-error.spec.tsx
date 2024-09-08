import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LoadError from '../../components/shared/load-error';

describe('LoadError', () => {
    it('should render the LoadError component correctly', () => {
        const { getByText } = render(<LoadError error='Sample Error' />)
        expect(getByText('Sample Error')).toBeDefined();
    });
    it('should render the LoadError component correctly with default value if error message is not present', () => {
        const { getByText } = render(<LoadError />)
        expect(getByText('Something went wrong')).toBeDefined();
    });
})