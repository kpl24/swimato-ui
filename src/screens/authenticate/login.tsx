import { IoIosMailOpen } from "react-icons/io";
import Input from "../../components/form/input";
import Button from "../../components/form/button";
import { useState } from "react";
import Loader from "../../components/loader";

const Login = ({ redirect }: { redirect: () => void }) => {

    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        setLoading(true);
    }

    return (
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
    );
}

export default Login;