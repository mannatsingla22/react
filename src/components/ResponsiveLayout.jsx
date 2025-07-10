import React from 'react';
import '../styles/auth.css';

const ResponsiveLayout = ({ children }) => {
    return (
        <div className="responsive-layout">
            <div className="container">
                {children}
            </div>
        </div>
    );
};

export default ResponsiveLayout;