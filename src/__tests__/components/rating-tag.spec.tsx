import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import RatingTag from '../../components/rating-tag';

describe('Rating', () => {
    it('should render the small Rating Tag component correctly', () => {
        const { getByText } = render(<RatingTag small />);
        expect(getByText('New')).toBeDefined();
    });
    it('should render the big Rating Tag component correctly', () => {
        const { getByText } = render(<RatingTag />);
        expect(getByText('New')).toBeDefined();
    });
})