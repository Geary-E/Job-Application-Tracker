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

        const fetchUserData = async () => {
            
            try {
                    // fetch the user name to display welcome message 
                    const userResponse = await axiosInstance.get('userinfo/');
                    console.log("User data: ",userResponse.data); // testing purposes: 4/10/2026            
                    const fetchedUser = userResponse.data;
                    setUser(fetchedUser);

                    const [applicationResponse, interviewResponse] = await Promise.all([
                        axiosInstance.get('jobapplications/'),
                        axiosInstance.get('interview_notes/'),
                    ]);

                    let applicationCount = 0;
                    let offerCount = 0; 

                    applicationResponse.data.forEach((application) => {
                        console.log("Job User ID: ", fetchedUser?.job_user_id, "Application User ID: ", application.jobuser);
                        if(application.jobuser == fetchedUser?.job_user_id) {
                            applicationCount += 1;
                            if(application.job_status == "Offered") {
                                offerCount += 1;
                            }
                        }
                    });

                    console.log("Application count: ", applicationCount);
                    console.log("Offer count: ", offerCount);
                    setApplications(applicationCount);
                    setOffers(offerCount);

                    let interviewCount = 0;

                    interviewResponse.data.forEach((interview) => {
                        if(interview.job_application.jobuser === fetchedUser?.job_user_id) {
                            interviewCount += 1;
                        }
                    });

                    console.log("Interview count: ", interviewCount);
                    setInterviews(interviewCount);

                } catch (error) {
                    console.log("userinfo FAIL:", error.response?.status);
                    console.log("userinfo FAIL data:", error.response?.data);
                }
            };
            fetchUserData();

        }, []) /* End */

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