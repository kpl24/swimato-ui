import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import RatingTag from '../../components/rating-tag';

describe('Rating', () => {
    it('should render the small Rating Tag component correctly', () => {
        render(<RatingTag small />)
    });
    it('should render the big Rating Tag component correctly', () => {
        render(<RatingTag />)
    });
})