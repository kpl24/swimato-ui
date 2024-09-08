import { IoIosMailOpen } from "react-icons/io";
import Input from "../../components/form/input";
import Button from "../../components/form/button";
import { useState } from "react";
import Loader from "../../components/shared/loader";
import * as z from 'zod';
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { api } from "../../helpers/axios";
import { APIResponse } from "../../constants/types";
import { setUser } from "../../redux/reducers/user";
import { useDispatch } from "react-redux";
import toast from "../../helpers/toast";

interface LoginForm {
    email: string,
    password: string
}

const Login = ({ redirect }: { redirect: () => void }) => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const initialValues = {
        email: "",
        password: ""
    }

    const onSubmit = (values: LoginForm) => {
        setLoading(true);
        api({ method: "post", url: "/user/login", data: values })
            .then((results: APIResponse) => {
                setLoading(false);
                if (results?.status?.code === 200) {
                    dispatch(setUser(results.data.user));
                } else {
                    toast({ type: "error", title: "Login", message: results?.status?.message })
                }
            })
            .catch((err: APIResponse) => {
                setLoading(false);
                toast({ type: "error", title: "Login", message: err?.status?.message })
            })
    }

    const schema = z.object({
        email: z.string().email('Invalid email'),
        password: z.string().min(5, 'Password should be minimum 5 characters').max(16, 'Password should be max 16 characters'),
    });

    return (
        <Formik initialValues={initialValues} validationSchema={toFormikValidationSchema(schema)} onSubmit={onSubmit}>
            {({ handleChange, values, errors, touched, handleSubmit }) => (
                <div className="d-flex flex-column w-100">
                    <IoIosMailOpen className="text-danger align-self-center mb-3" size={80} />
                    <Input
                        className="invalid"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        isInvalid={touched.email && !!errors.email}
                        error={errors.email}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        isInvalid={touched.password && !!errors.password}
                        error={errors.password}
                    />
                    {loading ? <Loader message="Loggin in..." /> : <Button onClick={() => handleSubmit()}>Login</Button>}
                    <hr className="border-secondary" />
                    <div className="text-start text-secondary d-flex" style={{ fontWeight: "200" }}>
                        Dont have an account ?
                        <div onClick={redirect} role="button" className="text-danger mx-2">Create One</div>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default Login;