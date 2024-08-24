import { FaRegStar, FaStar } from "react-icons/fa";

const getRatingColors = (rating?: number | null) => {
    if (rating && rating >= 1 && rating < 2) return { backgroundColor: "#ef4f5f", color: "#fff", border: '1px solid #ef4f5f' }
    if (rating && rating >= 2 && rating < 3) return { backgroundColor: "#e9b501", color: "#fff", border: '1px solid #e9b501' }
    if (rating && rating >= 3 && rating < 4) return { backgroundColor: "#3ab757", color: "#fff", border: '1px solid #3ab757' }
    if (rating && rating >= 4 && rating <= 5) return { backgroundColor: "#0e5020", color: "#fff", border: '1px solid #0e5020' }
    if (!rating) {
        return { backgroundColor: '#ebffef', color: '#3ab757', border: '1px solid #3ab757' }
    }
}

const RatingTag = ({ small, rating }: { small?: boolean, rating?: number | null }) => {
    return (
        <div className="d-flex align-items-center gap-1 rounded px-2" style={{ ...getRatingColors(rating || null), fontSize: small ? '13px' : '16px' }}>
            <span>{rating || "New"}</span>
            {rating ? <FaStar /> : <FaRegStar />}
        </div>
    );
}

export default RatingTag;