import React from 'react'; // page for Layout structure
import './Layout.css';

const Layout = ({children}) => {
    return (
        <div className="layout-background">
            <div className="layout-container">
                {children}
            </div>
        </div>
    );
}

export default Layout;