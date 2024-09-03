import { Formik } from "formik";
import AdminHeader from "../../components/admin-header";
import { APIResponse, Restaurant } from "../../constants/types";
import * as z from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Input from "../../components/form/input";
import Button from "../../components/form/button";
import { api } from "../../helpers/axios";
import { useState } from "react";
import Loader from "../../components/loader";
import { useNavigate } from "react-router-dom";

const AddRestaurant = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const initialValue: Partial<Restaurant> = {
        name: "",
        tags: [],
        logo: "https://firebasestorage.googleapis.com/v0/b/swi-mato.appspot.com/o/china-hut.png?alt=media&token=5c685d11-1859-4e9d-af11-cb7bd278907e",
        country: "India",
        state: "MH",
        city: "sangli",
        address_line: "",
        location: {
            latitude: "",
            longitude: ""
        }
    }

    const onSubmit = (values: Partial<Restaurant>) => {
        setLoading(true);
        api({ method: "post", url: "/restaurants/create", data: values, isAdmin: true })
            .then((results: APIResponse) => {
                setLoading(false);
                if (results.status.code === 200) {
                    navigate('/admin/restaurants');
                } else {
                    setError(results.status.message);
                }
            })
            .catch((err: APIResponse) => {
                setLoading(false);
                setError(err?.status?.message)
            })
    }

    const schema = z.object({
        name: z.string(),
        country: z.string(),
        tags: z.array(z.string()).max(8, 'Maximum 8 tags are expected'),
        state: z.string(),
        city: z.string(),
        address_line: z.string(),
        location: z.object({
            latitude: z.string(),
            longitude: z.string(),
        })
    });

    return (
        <AdminHeader
            title="Add Restaurant"
            right={(
                <div role="button" className="d-flex flex-row align-items-center">
                    <div className="ps-2 fs-6">Save</div>
                </div>
            )}
        >
            <Formik validationSchema={toFormikValidationSchema(schema)} onSubmit={onSubmit} initialValues={initialValue}>
                {({ handleChange, values, handleSubmit }) => (
                    <div>
                        <Input name="name" onChange={handleChange} value={values.name} placeholder="Name of the Restaurant" />
                        <div className="row row-cols-12 row-cols-lg-3">
                            <Input name="country" onChange={handleChange} value={values.country} className="col" placeholder="Country" />
                            <Input name="state" onChange={handleChange} value={values.state} className="col" placeholder="State" />
                            <Input name="city" onChange={handleChange} value={values.city} className="col" placeholder="City" />
                        </div>
                        <Input name="address_line" onChange={handleChange} value={values.address_line} placeholder="Full address of the restaurant" />
                        <div className="row row-cols-12 row-cols-lg-3">
                            <Input name="location.latitude" onChange={handleChange} value={values.location?.latitude} className="col" placeholder="Latitude" />
                            <Input name="location.longitude" onChange={handleChange} value={values.location?.longitude} className="col" placeholder="Longitude" />
                        </div>
                        {loading ? <Loader message="Creating Restaurant" /> : <Button onClick={() => handleSubmit()}>Create</Button>}
                        {error && <div className="text-danger text-center">{error}</div>}
                    </div>
                )}
            </Formik>
        </AdminHeader>
    );
}

export default AddRestaurant;