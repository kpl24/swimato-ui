import { Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import { APIResponse, Category } from "../../constants/types";
import Input from "../../components/form/input";
import * as zod from 'zod';
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useState } from "react";
import Button from "../../components/form/button";
import Loader from "../../components/loader";
import toast from "../../helpers/toast";
import { api } from "../../helpers/axios";

type AddCategory = {
    categories: Category[],
    restaurant_id: string,
    show: boolean,
    onAdd: (category: Category) => void
    handleCategoryModal: (show: boolean) => void
}

const AddCategory = ({ categories, restaurant_id, show, handleCategoryModal, onAdd }: AddCategory) => {

    const [loading, setLoading] = useState(false);

    const initialValues = {
        restaurant_id,
        title: ""
    }

    const validationSchema = zod.object({
        restaurant_id: zod.string(),
        title: zod.string().refine((val) => {
            if (categories.filter(item => item.title === val).length > 0) {
                return false;
            }
            return true;
        }, {
            message: "This category already exists.",
        })
    })

    const onSubmit = (values: { title: string, restaurant_id: string }) => {
        setLoading(true);
        api({ method: "POST", url: `/menu/category/create`, data: values })
            .then((result: APIResponse) => {
                setLoading(false);
                if (result?.status?.code === 200) {
                    onAdd(result?.data?.category)
                    handleCategoryModal(false);
                    toast({ type: "success", title: "Category Creation", message: result?.status?.message });
                } else {
                    toast({ type: "error", title: "Error creating category", message: result?.status?.message });
                }
            })
            .catch((err: APIResponse) => {
                toast({ type: "error", title: "Error creating category", message: err?.status?.message });
                setLoading(false);
            })
    }

    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={false}
            show={show}
            onHide={() => handleCategoryModal(false)}
            className="special_modal"
        >
            <Modal.Body className="d-flex flex-column">
                <div style={{ color: "#4f4f4f" }} className="d-flex justify-content-between align-items-center text-capitalize fs-2 mb-2 p-1">
                    <div className="fs-5">Add Category</div>
                    <IoMdClose data-testid="close-icon" role="button" onClick={() => handleCategoryModal(false)} className="text-dark" />
                </div>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={toFormikValidationSchema(validationSchema)}>
                    {({ handleChange, values, errors, touched, handleSubmit }) => (
                        <>
                            <Input
                                label="Category Name"
                                name="title"
                                onChange={handleChange}
                                value={values.title}
                                isInvalid={touched.title && !!errors.title}
                                error={errors.title}
                            />
                            {loading ? <Loader message="Loggin in..." /> : <Button onClick={() => handleSubmit()}>Submit</Button>}
                        </>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default AddCategory;