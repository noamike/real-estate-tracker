import React from 'react';

const LoadingSpinner = ({ message = "Loading"}) => {
    return(
        <div className="flex items-center justify-center min-h-screnn bg-gray-100">
            <div className='text-xl font-semibold text-gray-700'>{message}</div>
        </div>
    );
};

export default LoadingSpinner;