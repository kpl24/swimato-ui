import { IoIosMailOpen } from "react-icons/io";
import Input from "../../components/form/input";
import Button from "../../components/form/button";
import { useState } from "react";
import Loader from "../../components/loader";
import * as z from 'zod';
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { api } from "../../helpers/axios";

interface LoginForm {
    email: string,
    password: string
}

const Login = ({ redirect }: { redirect: () => void }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const initialValues = {
        email: "",
        password: ""
    }

    const onSubmit = (values: LoginForm) => {
        setLoading(true);
        setError('')
        api({ method: "post", url: "/user/login", data: values })
            .then((results) => {
                setLoading(false);
                if (results?.status?.code === 200) {
                    console.log(results.data)
                } else {
                    setError(results?.status?.message)
                }
            })
            .catch(err => {
                setLoading(false);
                setError(err);
            })
    }

    const schema = z.object({
        email: z.string().email('Invalid email'),
        password: z.string().min(5, 'Password should be minimum 5 characters').max(8, 'Password should be max 8 characters'),
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
                    <div className="text-danger text-center fs-6">{error}</div>
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