import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import axiosInstance from './axiosInstance';
import { Navigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; {/* testing */}
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './styling/Dashboard.css';

const Dashboard = () => {
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

    useEffect(() => {
        // Fetch data for applications, interviews, and offers
        axiosInstance.get('jobapplications/').then((response) => {
            let offerCount = 0;
            console.log(response.data);
            setApplications(response.data.length);
            response.data.forEach((application) => {
                if(application.job_status === 'O') {
                    offerCount += 1;
                }
            });
            console.log("Offer count: ", offerCount);
            setOffers(offerCount);
        });
    }, []);

    useEffect(() => {
            // Fetch data for interview
             axiosInstance.get('interview_notes/').then((response) => {
            console.log(response.data);
            setInterviews(response.data.length);
        });
    }, []);

    return (
        <Layout variant="full">
            <div className="dashboard">
                <div className="sidebar-menu">
                    <img src="yellow-truck-2.png" alt="logo" className="logo-image"/>
                    <ul>
                        <li> Dashboard </li>
                        <Link to="applications"> <li> Application </li></Link>
                        <li><Link to="interviews"> Interviews </Link> </li>
                        <li> Templates </li>
                        <br/><br/><br/>
                        <li> Settings </li>
                    </ul>
                    <div className="profile-info">
                        <span className="profile-icon"><img src="avatar-image.png" alt="avatar" className="avatar-image"/>
                        <p className="profile-name"> {user?.username}</p></span>
                        <br/><hr/>
                        <div className="logout-button" onClick={logOut}><p> Logout </p></div> {/* newly added: logout */}
                        {!isLoggedIn && <Navigate to="/" replace={true} />} {/* Redirect back to home page: 1/31/2026 */}
                    </div>
                </div>
                <div className="main-content">
                    {/* Main Content 
                    Dashboard */}
                    <div className="top-section">
                             <span className="search-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                            <input className="search-bar" type="search" placeholder="Search" /> 
                        {/*<div className="add-application-button">*/}
                            <button className="btn1"> + New Application </button>
                        {/*</div>*/}
                    </div><br/>
                    <div className="second-section">
                        <h2> Welcome {user?.username}! </h2><br/>
                        <div className="stats-overview-cards"> {/* Stats overview cards */}
                            <div className="stat-card"> 
                                <div className="stat-card-top">
                                    <h2> {applications} </h2><span className="stat-top"> Active Applications </span>
                                </div>
                            </div> {/* div 1 */}
                            <div className="stat-card"> 
                                <div className="stat-card-top">
                                    <h2> {interviews} </h2><span className="stat-top"> Interviews Scheduled </span>
                                </div>
                            </div> {/* div 2 */}
                            <div className="stat-card"> 
                                <div className="stat-card-top">
                                    <h2> {offers}</h2><span className="stat-top"> Offers Received </span>
                                </div>
                            </div> {/* div 3 */}
                        </div> {/* End of stats overview cards */}<br/>

                        <div className="application-pipeline-section">
                            Application Pipeline
                        </div>

                        <div className="recent-applications-section">
                            Recent Applications
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;