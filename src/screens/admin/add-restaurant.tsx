import { FieldArray, Formik, getIn } from "formik";
import AdminHeader from "../../components/shared/admin-header";
import { APIResponse, RestaurantType } from "../../constants/types";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Input from "../../components/form/input";
import Button from "../../components/form/button";
import { api } from "../../helpers/axios";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";
import { useState } from "react";
import Loader from "../../components/shared/loader";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import toast from "../../helpers/toast";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const AddRestaurant = () => {

    const [loading, setLoading] = useState(false);
    const { token } = useSelector((s: RootState) => s.userDetails);
    const navigate = useNavigate();

    const initialValue: Partial<RestaurantType> = {
        name: "",
        tags: [],
        logo: "https://firebasestorage.googleapis.com/v0/b/swi-mato.appspot.com/o/china-hut.png?alt=media&token=5c685d11-1859-4e9d-af11-cb7bd278907e",
        country: "",
        state: "",
        city: "",
        address_line: "",
        location: {
            latitude: "",
            longitude: ""
        }
    }

    const onSubmit = (values: Partial<RestaurantType>) => {
        setLoading(true);
        api({ method: "post", url: "/admin/restaurants/create", data: values, token })
            .then((results: APIResponse) => {
                setLoading(false);
                if (results.status.code === 200) {
                    navigate('/admin/restaurants');
                } else if (results.status.code === 401) {
                    toast({ type: "error", title: "Error Creating Restaurant", message: "Unauthorized!" });
                    navigate('/');
                }
            })
            .catch((err: APIResponse) => {
                setLoading(false);
                toast({ type: "error", title: "Server Error", message: err.status.message });
            })
    }

    const schema = z.object({
        name: z.string(),
        country: z.string(),
        tags: z.array(z.string()).min(1, 'Minimum 1 dish type is expected').max(8, 'Maximum 8 dishes type are expected'),
        state: z.string(),
        city: z.string(),
        address_line: z.string(),
        location: z.object({
            latitude: z.string(),
            longitude: z.string(),
        })
    });

    return (
        <AdminHeader title="Add Restaurant">
            <Formik validationSchema={toFormikValidationSchema(schema)} onSubmit={onSubmit} initialValues={initialValue}>
                {({ handleChange, values, handleSubmit, errors, touched }) => (
                    <div>
                        <Input
                            isInvalid={touched.name && !!errors.name}
                            error={errors.name}
                            label="Restaurant Name"
                            name="name"
                            onChange={handleChange}
                            value={values.name}
                            placeholder="Name of the Restaurant"
                        />
                        <div className="fs-6 text-body-secondary">Add Dishes you serve (e.g Chinese, North Indian, Biryani)</div>
                        <FieldArray name="tags">
                            {({ remove, push }) => (
                                <div className="py-2 d-flex flex-wrap">
                                    {values?.tags?.length ? values.tags.length &&
                                        values.tags.map((_, index) => (
                                            <div className="d-flex bg-body-secondary rounded px-2 me-2 my-2">
                                                <Form.Control
                                                    autoComplete="off"
                                                    className="border-0 bg-transparent shadow-none outline-none"
                                                    name={`tags.${index}`}
                                                    style={{ width: '130px' }}
                                                    placeholder="Add here"
                                                    onChange={handleChange} />
                                                <button
                                                    className="btn btn-sm d-flex align-items-center"
                                                    onClick={() => {
                                                        remove(index)
                                                    }}
                                                >
                                                    <IoIosRemoveCircle className="text-danger fs-3" />
                                                </button>
                                            </div>
                                        )) : null}
                                    <button
                                        type="button"
                                        className="btn btn-sm d-flex align-items-center"
                                        onClick={() => push('')}
                                    >
                                        <IoIosAddCircle className="text-danger fs-3" />
                                    </button>
                                </div>
                            )}
                        </FieldArray>
                        {touched.tags && errors.tags ? <div className="text-danger" style={{ fontSize: "0.875em" }}>{errors.tags}</div> : null}
                        <div className="row row-cols-12 row-cols-lg-3">
                            <Input
                                isInvalid={touched.country && !!errors.country}
                                error={errors.country}
                                label="Country"
                                name="country"
                                onChange={handleChange}
                                value={values.country}
                                className="col"
                                placeholder="Country"
                            />
                            <Input
                                isInvalid={touched.state && !!errors.state}
                                error={errors.state}
                                label="State"
                                name="state"
                                onChange={handleChange}
                                value={values.state}
                                className="col"
                                placeholder="State"
                            />
                            <Input
                                isInvalid={touched.city && !!errors.city}
                                error={errors.city}
                                label="City"
                                name="city"
                                onChange={handleChange}
                                value={values.city}
                                className="col"
                                placeholder="City"
                            />
                        </div>
                        <Input
                            isInvalid={touched.address_line && !!errors.address_line}
                            error={errors.address_line}
                            label="Restaurant Address"
                            name="address_line"
                            onChange={handleChange}
                            value={values.address_line}
                            placeholder="Full address of the restaurant"
                        />
                        <div className="row row-cols-12 row-cols-lg-2">
                            <Input
                                isInvalid={getIn(touched, "location.latitude") && !!getIn(errors, "location.latitude")}
                                error={getIn(errors, "location.latitude")}
                                label="Latitude"
                                name="location.latitude"
                                onChange={handleChange}
                                value={values.location?.latitude}
                                className="col"
                                placeholder="Latitude"
                            />
                            <Input
                                isInvalid={getIn(touched, "location.longitude") && !!getIn(errors, "location.longitude")}
                                error={getIn(errors, "location.longitude")}
                                label="Longitude"
                                name="location.longitude"
                                onChange={handleChange}
                                value={values.location?.longitude}
                                className="col"
                                placeholder="Longitude"
                            />
                        </div>
                        {loading ? <Loader message="Creating Restaurant" /> : <Button onClick={() => handleSubmit()}>Create</Button>}
                    </div>
                )}
            </Formik>
        </AdminHeader>
    );
}

export default AddRestaurant;