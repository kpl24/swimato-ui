import { IoDocumentLockOutline } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {

    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <IoDocumentLockOutline size={50} className="text-danger mb-3" />
            <div className="fs-4">No access to this page</div>
            <div role="button" onClick={() => navigate("/")} className="d-flex flex-row align-items-center my-5">
                <IoMdArrowBack size={20} />
                <div className="px-2">Go to home page</div>
            </div>
        </div>
    );
}

export default Unauthorized;