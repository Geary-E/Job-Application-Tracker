import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import { Navigate, Link, Outlet, useOutletContext } from 'react-router-dom';
import DashboardLayOut from './DashboardLayOut';
import './styling/DashboardLayOut.css';
import './styling/Interviews.css';
import axiosInstance from './axiosInstance';

const Interviews = () => {

      const { user } = useOutletContext(); 
      const [interviews, setInterviews] = useState([]);

      useEffect(() => {
        axiosInstance.get('interview_notes/').then((response) => {
            let interviewList = response.data.map((interview) => {
                return (
                        <ul className="interview-list">
                            <li key={interview.id} className="interview-listing">
                                <span className="company-section"><b>{interview.job_application.company}</b></span>
                                <span className="position-section"><b>{interview.job_application.role}</b></span>
                                <span className="date-section"><b>{interview.date_and_time}</b></span>
                                <span className="location-section"><b>{interview.location}</b></span>
                            </li>
                        </ul>
                );
            });
            setInterviews(interviewList);
        });
      })

       return (
        <div className="second-section">
            <h1>Interviews Page </h1><br/>
            <div className="interviews">
                <div className="upcoming-interviews-section"> {/* upcoming-interviews-section-start */}
                     <h3> Upcoming Interviews</h3><hr/>   
                     <div className="interview-listings">
                        <div className="top-listing-part">
                            <p> Company </p>
                            <p> Role </p>
                            <p> Date </p>
                            <p> Type </p>
                        </div>
                     </div>
                </div><br/> {/* upcoming-interviews-section ending */}
                <div className="past-interviews-section"> 
                    <h3> Past Interviews </h3><hr/>
                    <div className="interview-listings">
                        <div className="top-listing-part">
                            <p> Company </p>
                            <p> Role </p>
                            <p> Date </p>
                            <p> Result </p>
                        </div>
                        {interviews}
                    </div>
                     </div>
            </div>
            <p>{user?.username}</p>
        </div>
    )
}

export default Interviews;