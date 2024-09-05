import { Form } from "react-bootstrap";
import { FormCheckInputProps } from "react-bootstrap/esm/FormCheckInput";

interface CustomInputProps extends FormCheckInputProps {
    error?: string,
    label?: string,
}

const Switch = (props: CustomInputProps) => {
    return (
        <div className="col d-flex justify-content-between w-100 my-2">
            {props.label && <Form.Label style={{opacity: props.disabled ? '0.5' : '1'}} className="my-0 text-body-secondary">{props.label}</Form.Label>}
            <Form.Check
                {...props}
                type="switch"
                label=""
            />
            <Form.Control.Feedback type="invalid">{props.error}</Form.Control.Feedback>
        </div>
    );
}

export default Switch;