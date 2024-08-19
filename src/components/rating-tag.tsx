import { StyleSheet } from '../constants/types';
import { CiStar } from "react-icons/ci";

const RatingTag = ({ small }: { small?: boolean }) => {
    return <div className="d-flex align-items-center gap-1 rounded px-2" style={{ ...styles.rating, fontSize: small ? '13px' : '16px' }}>New <CiStar /></div>;
}

const styles: StyleSheet = {
    rating: { backgroundColor: '#ebffef', color: '#3ab757', border: '1px solid #3ab757' },
}

export default RatingTag;