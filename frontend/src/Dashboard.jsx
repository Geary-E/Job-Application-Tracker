import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import axiosInstance from './axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; {/* testing */}
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './styling/Dashboard.css';

const Dashboard = () => {
    const [userName, setUserName] = useState(''); {/* placeholder state */}
    const [applications, setApplications] = useState(0); {/* placeholder state */}
    const [interviews, setInterviews] = useState(0); {/* placeholder state */}
    const [offers, setOffers] = useState(0); {/* placeholder state */}

    /* this is to fetch user name for welcome message: Next step */
    useEffect(() => {
        // fetch the user name to display welcome message 
        axiosInstance.get('jobusers/').then((response) => {
            console.log(response.data);
            response.data.forEach((user) => {
                console.log("User ID: ", user.user);
            });
        }, []);

    }) /* End */

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
                        <li> Application </li>
                        <li> Interviews </li>
                        <li> Templates </li>
                        <br/><br/><br/>
                        <li> Settings </li>
                    </ul>
                    <div className="profile-info">
                        <p> User Profile Info</p>
                        <hr/>
                        <p> Logout </p>
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
                        <h2> Welcome Name! </h2><br/>
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