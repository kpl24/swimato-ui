import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MenuItem } from '../../components/menu';
import { Menu } from '../../constants/types';

describe('Menu', () => {

    const menu: Menu = {
        count: 2,
        title: 'SomeCategory',
        items: [
            {
                _id: "",
                category_id: "",
                image: "",
                description: "",
                is_egg_only: false,
                is_veg: true,
                price: 123,
                title: "Menu Item",
            }
        ]
    }

    it('should render the Category component correctly', () => {
        const { getByText } = render(<MenuItem menu={menu} />);
        expect(getByText('SomeCategory (2)')).toBeDefined();
    });
})