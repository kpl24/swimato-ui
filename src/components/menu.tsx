import { Menu } from "../constants/types"

export const MenuItem = ({ menu }: { menu: Menu }) => {
    return (
        <div className="py-2 text-danger">
            {`${menu.title} (${menu.count})`}
        </div>
    )
}