import { Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import Login from "./login";
import SignUp from "./signup";

export type ShowAuthScreenOptions = { show: boolean, type?: "login" | "signup" | '' }
type AuthenticateType = { showAuthScreenOptions: ShowAuthScreenOptions, handleModal: (options: ShowAuthScreenOptions) => void }

const Authenticate = ({ showAuthScreenOptions, handleModal }: AuthenticateType) => {
    return (
        <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={false}
            show={showAuthScreenOptions.show}
            onHide={() => handleModal({ show: false })}
            className="special_modal"
        >
            <Modal.Body className="d-flex flex-column">
                <div style={{ color: "#4f4f4f" }} className="d-flex justify-content-between align-items-center text-capitalize fs-2 mb-2 p-1">
                    {showAuthScreenOptions.type}
                    <IoMdClose role="button" onClick={() => handleModal({ show: false })} className="text-dark" />
                </div>
                {showAuthScreenOptions.type === "login" && <Login redirect={() => handleModal({ type: 'signup', show: true })} />}
                {showAuthScreenOptions.type === "signup" && <SignUp redirect={() => handleModal({ type: 'login', show: true })} />}
            </Modal.Body>
        </Modal>
    );
};

export default Authenticate;