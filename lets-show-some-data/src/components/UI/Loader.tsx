import React from 'react';
import {BeatLoader} from 'react-spinners';

const Loading = () => {
    return (
        <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center top-50 left-50">
            <BeatLoader color="blue" size={10} margin={2}/>
        </div>
    );
};

export default Loading;
