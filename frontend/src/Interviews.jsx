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
            console.log("Interviews: ",response.data);
            setInterviews(response.data);
        });
      }, [])

       return (
        <div className="second-section">
            <h1>Interviews Page </h1><br/>
            <div className="interviews">
                <div className="upcoming-interviews-section"> {/* upcoming-interviews-section-start */}
                     <h3> Upcoming Interviews</h3><hr/>   
                     <div className="interview-listings">
                        <table className="top-listing-part">
                            <thead>
                            <tr>
                            <th> Company </th>
                            <th> Role </th>
                            <th> Date </th>
                            <th> Type </th> 
                            </tr>
                            </thead>
                        </table>
                     </div>
                </div><br/> {/* upcoming-interviews-section ending */}
                <div className="past-interviews-section"> 
                    <h3> Past Interviews </h3><hr/>
                    <div className="interview-listings">
                        <table className="top-listing-part">
                            <thead>
                            <tr>    
                            <th> Company </th>
                            <th> Role </th>
                            <th> Date </th>
                            <th> Time </th>
                            <th> Result </th>
                            </tr>
                            </thead>
                            <tbody> 
                                {interviews.map((interview) => {
                                  const interviewDate = new Date(interview.date_and_time);
                                  const date = interviewDate.toLocaleDateString();
                                  const time = interviewDate.toLocaleTimeString();
                                  return (  
                                  <tr key={interview.id} className="interview-listing">
                                    <td> {interview.job_application.company} </td>
                                    <td> {interview.job_application.role} </td>
                                    <td> {date} </td>
                                    <td> {time}</td>
                                    <td> {interview.interview_outcome} </td>
                                </tr>
                                  );
                            })}
                            </tbody>
                        </table>
                    </div>
                     </div>
            </div>
            <p>{user?.username}</p>
        </div>
    )
}

export default Interviews;