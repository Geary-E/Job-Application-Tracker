import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import { Navigate, Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; {/* testing */}
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import DashboardLayOut from './DashboardLayOut';
import './styling/DashboardLayOut.css';
import axiosInstance from './axiosInstance';

const Applications = () => {

    const [user, setUser] = useState(null); {/* placeholder state */}
    const [isLoggedIn, setIsLoggedIn] = useState(true); {/* user logged in */}
    const [applications, setApplications] = useState(0); {/* placeholder state */}
    const [interviews, setInterviews] = useState(0); {/* placeholder state */}
    const [offers, setOffers] = useState(0); {/* placeholder state */}
    //console.log("Access Token: ", localStorage.getItem("access")); // testing purposes 1/25/2026
    /* this is to fetch user name for welcome message: Next step */

    /* Logout function - to be implemented later. 1/30/2026 */
    const logOut = () => {
        localStorage.clear(); // testing: 1/31/2026
        setIsLoggedIn(false); // testing: 1/31/2026
    }
    /* End logout function: to be completed later. 1/30/2026 */

    useEffect(() => {
        // fetch the user name to display welcome message 
        axiosInstance.get('userinfo/').then((response) => {
            console.log(response.data);
            setUser(response.data);
        }).catch((error) => {
            console.log("userinfo FAIL:", error.response?.status);
            console.log("userinfo FAIL data:", error.response?.data);
        });

    }, []) /* End */

    return (
        <Layout variant="full">
            <div className="applications">
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
                    <p className="profile-name"> {user?.username}</p></span> {/* {user?.username} */}
                    <br/><hr/>
                    <div className="logout-button" onClick={logOut}><p> Logout </p></div> {/* newly added: logout */}
                    {!isLoggedIn && <Navigate to="/" replace={true} />} {/* Redirect back to home page: 1/31/2026 */}
                </div>
            </div> {/* end of sidebar menu */}
            <div className="main-content"> {/* Main Content Dashboard */}
                <div className="top-section">
                    <span className="search-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                    <input className="search-bar" type="search" placeholder="Search" /> 
                    <button className="btn1"> + New Application </button>
                </div><br/>
                <div className="second-section">
                    <h1> Applications Page </h1>
                    </div>
                    </div> {/* end of main content */}
            </div>
        </Layout>
    )
}

export default Applications;