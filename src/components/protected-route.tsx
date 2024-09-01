import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {

    const { user } = useSelector((state: RootState) => state.userDetails);

    if (user?.role === "admin") {
        return children;
    }

    return <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;