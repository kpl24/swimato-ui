import { Form, FormControlProps } from "react-bootstrap";

interface CustomInputProps extends FormControlProps {
    error?: string
}

const Input = (props: CustomInputProps) => {
    return (
        <Form.Group className="col">
            <Form.Control
                {...props}
                style={{ height: "50px" }}
                className="my-2 shadow-none"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
            />
            <Form.Control.Feedback type="invalid">{props.error}</Form.Control.Feedback>
        </Form.Group>
    );
}

export default Input;