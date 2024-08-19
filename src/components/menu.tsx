import { Menu } from "../constants/types"

export const Category = ({ menu }: { menu: Menu }) => {
    return (
        <div className="py-2 text-danger">
            {`${menu.category.title} (${menu.count})`}
        </div>
    )
}