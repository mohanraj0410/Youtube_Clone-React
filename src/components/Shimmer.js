import React from 'react';
import '../Shimmer.css';

const Shimmer = () => {
    return (
        <div className="shimmer-wrapper">
            <div className="shimmer-card">
                <div className="shimmer-thumbnail"></div>
                <div className="shimmer-text shimmer-title"></div>
                <div className="shimmer-text shimmer-channel"></div>
                <div className="shimmer-text shimmer-views"></div>
            </div>
        </div>
    );
};

export default Shimmer;
