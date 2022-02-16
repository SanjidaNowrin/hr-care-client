import React from 'react';
import './Leave.css'


const Leave = () => {
    const pathname = window.location.pathname;
    return (
        <div>
            {/* add leave area */}
            <div className="add-leave-area">
                <div className="top-heading">
                    <h4>Add Leave</h4>
                    <p>{pathname}</p>
                </div>
                {/* Leave text fild */}
                <div className="leave-fild-content">
                    
                </div>
            </div>
        </div>
    );
};

export default Leave;