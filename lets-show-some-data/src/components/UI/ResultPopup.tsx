import React from "react";

interface ResultPopupProps {
    show?: boolean;
    message: string;
    bgColor: string;
}

const ResultPopup: React.FC<ResultPopupProps> = ({show, message, bgColor}) => {
    return (
        <>
            {show && (
                <div className={`p-4 rounded mb-4 ${bgColor}`}>
                    <p>{message}</p>
                </div>
            )}
        </>
    );
};

export default ResultPopup;
