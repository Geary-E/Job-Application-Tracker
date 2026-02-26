import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import axiosInstance from './axiosInstance';
import { Navigate, Link, Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; {/* testing */}
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import DashboardLayOut from './DashboardLayOut';
import DashboardHome from './DashboardHome';
import './styling/DashboardLayOut.css';

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
         <DashboardLayOut
            user={user}
            applications={applications}
            interviews={interviews}
            offers={offers}
            isLoggedIn={isLoggedIn}
            logOut={logOut}
            />
    );
};

export default Dashboard;