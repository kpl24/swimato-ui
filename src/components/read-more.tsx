import { useState } from "react";

interface ReadMoreProps {
    text: string;
    maxLength: number;
}

const ReadMore = ({ text, maxLength }: ReadMoreProps) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleReadMore = () => setIsExpanded(!isExpanded);
    const shouldTruncate = text.length > maxLength;
    const truncatedText = shouldTruncate ? text.substring(0, text.lastIndexOf(' ', maxLength)) + '...' : text;
    const displayText = isExpanded ? text : truncatedText;

    return (
        <div className="text-body-tertiary">
            <p className="mb-0">{displayText}</p>
            {shouldTruncate && !isExpanded && (
                <div role="button" className="p-0 m-0 text-dark" style={{ fontSize: '14px' }} onClick={toggleReadMore}>
                    <b style={{ fontWeight: "400" }}>read more</b>
                </div>
            )}
        </div>
    );
};

export default ReadMore;