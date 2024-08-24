import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import RatingTag from '../../components/rating-tag';

describe('Rating', () => {
    it('should render the small Rating Tag component correctly', () => {
        const { getByText } = render(<RatingTag small />);
        expect(getByText('New')).toBeDefined();
    });
    it('should render the Rating Tag component correctly for rating between 1 - 2', () => {
        const { getByText } = render(<RatingTag rating={1} />);
        expect(getByText('1')).toBeDefined();
    });
    it('should render the Rating Tag component correctly for rating between 1 - 2', () => {
        const { getByText } = render(<RatingTag rating={2} />);
        expect(getByText('2')).toBeDefined();
    });
    it('should render the Rating Tag component correctly for rating between 2 - 3', () => {
        const { getByText } = render(<RatingTag rating={3} />);
        expect(getByText('3')).toBeDefined();
    });
    it('should render the Rating Tag component correctly for rating between 3 - 4', () => {
        const { getByText } = render(<RatingTag rating={4} />);
        expect(getByText('4')).toBeDefined();
    });
    it('should render the rating tag with text new if no rating is provided', () => {
        const { getByText } = render(<RatingTag />);
        expect(getByText('New')).toBeDefined();
    });
})