import { Form, FormControlProps } from "react-bootstrap";

interface CustomInputProps extends FormControlProps {
    error?: string,
    label?: string,
}

const Input = (props: CustomInputProps) => {
    return (
        <Form.Group className="col">
            {props.label && <Form.Label className="my-0 text-body-secondary">{props.label}</Form.Label>}
            <Form.Control
                {...props}
                autoComplete="off"
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