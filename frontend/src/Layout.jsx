import React from 'react'; // page for Layout structure
import './Layout.css';

const Layout = ({children, style, variant="center"}) => { /* test: originally: variant="center" */
    return (
        <div className={`layout-background ${variant}`}> {/* test: originally: {`layout background ${variant}`} originally layout-background*/}
            <div className="layout-container" style={style}> {/* test */}
                {children}
            </div>
        </div>
    );
}

export default Layout;