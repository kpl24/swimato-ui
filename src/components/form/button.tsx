import { ButtonProps, default as FormButton } from "react-bootstrap/Button";

const Button = (props: ButtonProps) => {
    return (
        <FormButton
            {...props}
            style={{ height: "50px", fontWeight: "200" }}
            className="w-100 my-3"
            variant="danger"
        >
            {props.children}
        </FormButton>
    );
}

export default Button;