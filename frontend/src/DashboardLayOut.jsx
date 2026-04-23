import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import axiosInstance from './axiosInstance';
import { Navigate, Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; {/* testing */}
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './styling/DashboardLayOut.css';

const DashboardLayout = ({user, applications, interviews, offers, isLoggedIn, logOut}) => { {/* updated: 2/25/2026 */}
   
    const [sidebarOpen, setSidebarOpen] = useState(false); // state to manage side bar

    return (
        <Layout variant="full">
            <div className="dashboard-layout-container">
                {/* Hamburger menu for mobile view */}
                {/*<button className="hamburger-menu" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    &#9776; {/* unicode for hamburger icon */}
                {/*</button><br/> */}
                {/* Overlay - dims the page when sidebar is open on mobile */}
                {sidebarOpen && (
                    <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}/>
                )}

                 <div className={`sidebar-menu ${sidebarOpen ? 'open' : ''}`}> {/* sidebar menu */}
                    <img src="yellow-truck-2.png" alt="logo" className="logo-image"/>
                    <ul>
                        <li> <Link to="/dashboard" className="nav-link"> Dashboard </Link> </li>
                        <li><Link to="applications" className="nav-link"> Application </Link> </li>
                        <li><Link to="interviews" className="nav-link"> Interviews </Link> </li>
                        <li><Link to="templates" className="nav-link"> Templates </Link> </li>
                        <br/><br/><br/>
                        <li><Link to="settings" className="nav-link"> Settings </Link> </li>
                    </ul>
                    <div className="profile-info">
                        <span className="profile-icon"><img src="avatar-image.png" alt="avatar" className="avatar-image"/>
                        <p className="profile-name"> {user?.username}</p></span>
                        <br/><hr/>
                        <div className="logout-button" onClick={logOut}><p> Logout </p></div> {/* newly added: logout */}
                        {!isLoggedIn && <Navigate to="/" replace={true} />} {/* Redirect back to home page: 1/31/2026 */}
                    </div>
                </div> {/* end of sidebar menu */}
                <div className="main-content">{/* Main Content Dashboard */}
                    <div className="top-section">
                        <button className="hamburger-menu" onClick={() => setSidebarOpen(!sidebarOpen)}>
                             &#9776; {/* unicode for hamburger icon */}
                            </button>{/*<br/> */} 
                         <div className="search-container">
                            <span className="search-icon"><FontAwesomeIcon icon={faMagnifyingGlass} className="icon1" /></span>      
                            <input className="search-bar" type="search" placeholder="Search" />
                        </div> 
                        <button className="btn1"> + New Application </button>
                    </div> {/* end of top section */}
                    <Outlet context={{user, applications, interviews, offers}} /> {/* Updated: 2/25/2026 */}
              </div> {/* end of main content  */}
              {/*<Outlet />*/}
            </div>
        </Layout>
    )
}

export default DashboardLayout;