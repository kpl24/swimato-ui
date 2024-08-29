import { Form, FormControlProps } from "react-bootstrap";

const Input = (props: FormControlProps) => {
    return (
        <Form.Control
            {...props}
            style={{ height: "50px" }}
            className="my-2"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
        />
    );
}

export default Input;