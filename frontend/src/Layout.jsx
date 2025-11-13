import React from 'react'; // page for Layout structure
import './Layout.css';

const Layout = ({children, style}) => { /* test */
    return (
        <div className="layout-background">
            <div className="layout-container" style={style}> {/* test */}
                {children}
            </div>
        </div>
    );
}

export default Layout;