import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import axiosInstance from './axiosInstance';
import { Navigate, Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; {/* testing */}
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './styling/Dashboard.css';

const DashboardLayout = () => {
    const [user, setUser] = useState(null); {/* placeholder state */}
    const [isLoggedIn, setIsLoggedIn] = useState(true); {/* user logged in */}

    const logOut = () => {
        localStorage.clear(); // testing: 1/31/2026
        setIsLoggedIn(false); // testing: 1/31/2026
    }

    return (
        <Layout variant="full">
            <div className="dashboard-layout-container">
                 <div className="sidebar-menu"> {/* sidebar menu */}
                    <img src="yellow-truck-2.png" alt="logo" className="logo-image"/>
                    <ul>
                        <li> <Link to="/dashboard" className="nav-link"> Dashboard </Link> </li>
                        <li><Link to="applications" className="nav-link"> Application </Link> </li>
                        <li><Link to="interviews" className="nav-link"> Interviews </Link> </li>
                        <li><Link to="templates" className="nav-link"> Templates </Link> </li>
                        <br/><br/><br/>
                        <li><Link to="settings" className="nav-link"> Settings </Link> </li>
                        <Outlet />
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
                     <span className="search-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                    <input className="search-bar" type="search" placeholder="Search" /> 
                    <button className="btn1"> + New Application </button>
              </div>
              </div>
            </div>
        </Layout>
    )
}

export default DashboardLayout;