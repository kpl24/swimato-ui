import { useState } from "react";
import Button from "../../components/form/button";
import Input from "../../components/form/input";
import Loader from "../../components/loader";

const SignUp = ({ redirect }: { redirect: () => void }) => {

    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        setLoading(true);
    }

    return (
        <div>
            <Input
                placeholder="Full Name"
            />
            <Input
                placeholder="Email"
            />
            <Input
                placeholder="Password"
            />
            <Input
                placeholder="Confirm Password"
            />
            {loading ? <Loader message="Creating account..." /> : <Button onClick={onSubmit}>Create Account</Button>}
            <hr />
            <div className="text-start text-secondary d-flex mt-3" style={{ fontWeight: "200" }}>
                Already have an account ?
                <div onClick={redirect} role="button" className="text-danger mx-2">Login</div>
            </div>
        </div>
    );
}

export default SignUp;