import { StyleSheetType } from "../../constants/types";
import { MdError } from "react-icons/md";


const LoadError = ({ error }: { error?: string }) => {
    return <div className="d-flex flex-column align-items-center my-5 text-danger">
        <MdError size={40} className="text-danger my-2" />
        <div style={styles.error}>{error || 'Something went wrong'}</div>
    </div>
}

const styles: StyleSheetType = {
    error: { fontSize: '20px' }
}

export default LoadError;