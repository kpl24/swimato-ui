import { useState } from "react";
import Button from "../../components/form/button";
import Input from "../../components/form/input";
import Loader from "../../components/shared/loader";
import * as z from 'zod';
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { api } from "../../helpers/axios";
import { APIResponse, UserType } from "../../constants/types";
import toast from "../../helpers/toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";

const SignUp = ({ redirect }: { redirect: () => void }) => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const initialValues = {
        name: "",
        email: "",
        password: "",
        confirm: ""
    }

    const schema = z.object({
        name: z.string(),
        email: z.string().email('Invalid email'),
        password: z.string().min(5, 'Password should be minimum 5 characters').max(16, 'Password should be max 16 characters'),
        confirm: z.string().min(5, 'Password should be minimum 5 characters').max(16, 'Password should be max 16 characters'),
    }).refine((data) => data.password === data.confirm, {
        message: "Confrimation password not matching with password",
        path: ["confirm"],
    });

    const onSubmit = (values: Partial<UserType>) => {
        setLoading(true);
        api({ method: "post", url: "/user/register", data: values })
            .then((results: APIResponse) => {
                setLoading(false);
                if (results?.status?.code === 200) {
                    dispatch(setUser({ user: results.data.user, token: results.data.token }));
                    toast({ type: "success", title: "Register", message: results?.status?.message })
                } else {
                    toast({ type: "error", title: "Register", message: results?.status?.message })
                }
            })
            .catch((err: APIResponse) => {
                setLoading(false);
                toast({ type: "error", title: "Register", message: err?.status?.message })
            })
    }

    return (
        <Formik initialValues={initialValues} validationSchema={toFormikValidationSchema(schema)} onSubmit={onSubmit}>
            {({ handleChange, values, errors, touched, handleSubmit }) => (
                <div>
                    <Input
                        placeholder="Full Name"
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                        isInvalid={touched.name && !!errors.name}
                        error={errors.name}
                    />
                    <Input
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
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirm"
                        onChange={handleChange}
                        value={values.confirm}
                        isInvalid={touched.confirm && !!errors.confirm}
                        error={errors.confirm}
                    />
                    {loading ? <Loader message="Creating account..." /> : <Button onClick={() => handleSubmit()}>Create Account</Button>}
                    <hr />
                    <div className="text-start text-secondary d-flex mt-3" style={{ fontWeight: "200" }}>
                        Already have an account ?
                        <div onClick={redirect} role="button" className="text-danger mx-2">Login</div>
                    </div>
                </div>
            )}
        </Formik>
    );
}

export default SignUp;