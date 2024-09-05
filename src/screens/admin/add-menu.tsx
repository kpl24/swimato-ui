import { Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { APIResponse, MenuItem } from "../../constants/types";
import Input from "../../components/form/input";
import * as zod from 'zod';
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useState } from "react";
import Button from "../../components/form/button";
import Loader from "../../components/loader";
import toast from "../../helpers/toast";
import { api } from "../../helpers/axios";
import Switch from "../../components/form/switch";

type AddMenuType = {
    menu_items: MenuItem[],
    restaurant_id: string,
    category_id: string,
    show: boolean,
    onAdd: (menu: MenuItem) => void
    handleMenuModal: (show: boolean) => void
}

const AddMenu = ({ menu_items, restaurant_id, category_id, show, handleMenuModal, onAdd }: AddMenuType) => {

    const [loading, setLoading] = useState(false);

    const initialValues = {
        restaurant_id,
        category_id,
        image: "",
        title: "",
        description: "",
        price: 0,
        is_veg: true,
        is_egg_only: false
    }

    const validationSchema = zod.object({
        restaurant_id: zod.string(),
        category_id: zod.string(),
        title: zod.string().refine((val) => {
            if (menu_items.filter(item => item.title === val).length > 0) {
                return false;
            }
            return true;
        }, {
            message: "This menu item already exists.",
        }),
        description: zod.string().optional(),
        price: zod.string(),
        is_veg: zod.boolean(),
        is_egg_only: zod.boolean(),
    })

    const onSubmit = (values: { title: string, restaurant_id: string }) => {
        setLoading(true);
        api({ method: "POST", url: `/menu/create`, data: values })
            .then((result: APIResponse) => {
                setLoading(false);
                if (result?.status?.code === 200) {
                    onAdd(result?.data?.menu)
                    handleMenuModal(false);
                    toast({ type: "success", title: "Menu Creation", message: result?.status?.message });
                } else {
                    toast({ type: "error", title: "Error creating Menu", message: result?.status?.message });
                }
            })
            .catch((err: APIResponse) => {
                toast({ type: "error", title: "Error creating menu", message: err?.status?.message });
                setLoading(false);
            })
    }

    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={false}
            show={show}
            onHide={() => handleMenuModal(false)}
            className="special_modal"
        >
            <Modal.Body className="d-flex flex-column">
                <div style={{ color: "#4f4f4f" }} className="d-flex justify-content-between align-items-center text-capitalize fs-2 mb-2 p-1">
                    <div className="fs-5">Add Menu Item</div>
                    <IoMdClose data-testid="close-icon" role="button" onClick={() => handleMenuModal(false)} className="text-dark" />
                </div>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={toFormikValidationSchema(validationSchema)}>
                    {({ handleChange, values, errors, touched, handleSubmit, setFieldValue }) => (
                        <>
                            <Input
                                label="Name"
                                name="title"
                                onChange={handleChange}
                                value={values.title}
                                isInvalid={touched.title && !!errors.title}
                                error={errors.title}
                            />
                            <Input
                                label="Description"
                                name="description"
                                onChange={handleChange}
                                value={values.description}
                                isInvalid={touched.description && !!errors.description}
                                error={errors.description}
                            />
                            <Switch
                                name="is_veg"
                                onChange={(e) => {
                                    handleChange(e);
                                    if (e.target.checked) {
                                        setFieldValue("is_egg_only", !e.target.checked)
                                    }
                                }}
                                checked={values.is_veg}
                                label="Is this a veg dish ?"
                            />
                            <Switch
                                name="is_egg_only"
                                onChange={handleChange}
                                disabled={values.is_veg}
                                checked={values.is_egg_only}
                                label="Does this dish contains only egg ?"
                            />
                            <Input
                                label="Price"
                                name="price"
                                onChange={handleChange}
                                value={values.price}
                                isInvalid={touched.price && !!errors.price}
                                error={errors.price}
                            />
                            {loading ? <Loader message="Loggin in..." /> : <Button onClick={() => handleSubmit()}>Submit</Button>}
                        </>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default AddMenu;