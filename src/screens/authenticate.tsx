import { Modal } from "react-bootstrap";

export type ShowAuthScreenOptions = { show: boolean, type?: "login" | "signup" | '' }
type AuthenticateType = { showAuthScreenOptions: ShowAuthScreenOptions, handleModal: (options: ShowAuthScreenOptions) => void }

const Authenticate = ({ showAuthScreenOptions, handleModal }: AuthenticateType) => {
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered show={showAuthScreenOptions.show}
            onHide={() => handleModal({ show: false })}
        >
            <Modal.Body className="d-flex">
                <div>
                    <div className="text-capitalize fs-2">{showAuthScreenOptions.type}</div>
                    <div onClick={() => handleModal({ type: 'signup', show: true })}>Dont have an account ? Signup</div>
                    <div onClick={() => handleModal({ type: 'login', show: true })}>Already have an account ? Login</div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default Authenticate;