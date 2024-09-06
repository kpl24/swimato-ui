import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Menu from '../../components/menu';
import { MenuType } from '../../constants/types';

describe('Menu', () => {

    const menu: MenuType = {
        _id: "122323232",
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
        const { getByText } = render(<Menu menu={[menu]} />);
        expect(getByText('SomeCategory (2)')).toBeDefined();
    });
})