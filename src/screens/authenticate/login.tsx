import { IoIosMailOpen } from "react-icons/io";
import Input from "../../components/form/input";
import Button from "../../components/form/button";
import { useState } from "react";
import Loader from "../../components/loader";
import * as z from 'zod';
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

const Login = ({ redirect }: { redirect: () => void }) => {

    const [loading, setLoading] = useState(false);
    const initialValues = {
        email: "",
        password: ""
    }

    const onSubmit = () => {
        setLoading(true);
    }

    const schema = z.object({
        email: z.string().min(1).email('Invalid email'),
        password: z.string().min(5, 'Password should be minimum 5 characters').max(8, 'Password should be max 8 characters'),
    });

    return (
        <Formik initialValues={initialValues} validationSchema={toFormikValidationSchema(schema)} onSubmit={onSubmit}>
            {() => (
                <div className="d-flex flex-column w-100">
                    <IoIosMailOpen className="text-danger align-self-center my-3" size={80} />
                    <Input
                        placeholder="Email"
                    />
                    <Input
                        placeholder="Password"
                    />
                    {loading ? <Loader message="Loggin in..." /> : <Button onClick={onSubmit}>Login</Button>}
                    <hr />
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