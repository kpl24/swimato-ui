import { Menu, StyleSheet } from "../constants/types"

export const MenuItem = ({ menu }: { menu: Menu }) => {
    return (
        <div style={styles.heading} className="py-2 text-danger">
            {`${menu.title} (${menu.count})`}
        </div>
    )
}

const styles: StyleSheet = {
    heading: { cursor: "pointer" }
}