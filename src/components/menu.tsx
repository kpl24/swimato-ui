import { useState } from "react"
import { MenuItemType, MenuType, StyleSheetType } from "../constants/types"
import { BiCheckboxSquare } from "react-icons/bi";
import { useWindowWidth } from "../helpers/useWindowDimentions";
import { Accordion } from "react-bootstrap";
import ReadMore from "./read-more";
import AddToCart from "./add-to-cart-button";

const RenderMenuItem = ({ item }: { item: MenuItemType }) => {

    const { isMobile } = useWindowWidth();

    return (
        <div className={`mb-4 w-${isMobile ? '100' : '75'} d-flex justify-content-between`}>
            <div className="d-flex flex-row align-items-start justify-content-between w-100">
                <div className="d-flex col-lg-6 col-9">
                    <div className="position-relative me-2">
                        <div className={`${item.image ? "position-absolute end-0 top-0" : ""}`}><BiCheckboxSquare size={25} style={{ backgroundColor: "white" }} color={item.is_veg ? "green" : "rgb(191, 76, 67)"} /></div>
                        {item.image && <img className="rounded" style={{ width: 80, height: 80 }} src={item.image} />}
                    </div>
                    <div>
                        <div style={{ fontWeight: "600" }} className="mb-2 fs-6">{`${item.title}`}</div>
                        <div style={{ fontWeight: "400" }} className="mb-2 text-dark">{`₹ ${item.price}`}</div>
                        <ReadMore text={item.description} maxLength={50} />
                    </div>
                </div>
                <AddToCart item={item} />
            </div>
        </div>
    );
}

const BigScreenRender = ({ menu }: { menu: MenuType[] }) => {

    const [selectedCategory, setSelectedCategory] = useState<MenuType | null>(menu.length > 0 ? menu[0] : null);

    return (
        <div className="d-flex col-12" style={{ paddingRight: '0px!important' }}>
            <div className="col-3 border-end border-secondary">
                {menu.filter(item => item.items.length).map((item) => (
                    <div key={item._id} role="button" onClick={() => setSelectedCategory(item)} style={selectedCategory?._id === item._id ? styles.category : {}} className="py-2 px-0 text-danger">
                        {`${item.title} (${item.count})`}
                    </div>
                ))}
            </div>
            {selectedCategory && <div className="col-9 ps-3 overflow-y-scroll" style={{ maxHeight: '50vh' }}>
                {selectedCategory.items.map((item) => <RenderMenuItem key={item._id} item={item} />)}
            </div>}
        </div>
    )
}

const SmallScreenRender = ({ menu }: { menu: MenuType[] }) => {

    return (
        <div className="d-flex flex-column">
            <Accordion defaultActiveKey="0">
                {menu.filter(item => item.items.length).map((item, index) => (
                    <Accordion.Item key={item._id} className="py-2 px-0" eventKey={index.toString()}>
                        <Accordion.Header className="text-danger">{`${item.title}`}</Accordion.Header>
                        <Accordion.Body>
                            {item.items.map((item) => <RenderMenuItem key={item._id} item={item} />)}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    )
}

const Menu = ({ menu }: { menu: MenuType[] }) => {

    const { isMobile } = useWindowWidth();

    return isMobile ? <SmallScreenRender menu={menu} /> : <BigScreenRender menu={menu} />
}

const styles: StyleSheetType = {
    category: { borderRight: "4px solid red", backgroundImage: 'linear-gradient(to right, white , rgba(220, 53, 69, 0.2))' }
}

export default Menu;