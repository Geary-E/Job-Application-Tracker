import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import { Navigate, Link, Outlet, useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; {/* testing */}
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import DashboardLayOut from './DashboardLayOut';
import './styling/Applications.css';
import './styling/DashboardLayOut.css';
import axiosInstance from './axiosInstance';

const Applications = () => {

    const { user } = useOutletContext();
    const [company, setCompany] = useState('');
    const [position, setPosition] = useState('');
    const [location, setLocation] = useState('');
    const [dateApplied, setDateApplied] = useState('');
    const [status, setStatus] = useState('');
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        axiosInstance.get('jobapplications/').then((response) => {
            console.log(response.data);
             let applicationList = response.data.map((application) => {
                return (
                        <ul className="application-section">
                        <li key={application.id} className="application-list">    
                            <span className="company-section"><b>{application.company}</b></span>
                            <span className="position-section"><b>{application.role}</b></span>
                            <span className="location-section"><b> {application.location}</b></span>
                            <span className="date-applied-section"><b> {application.date_applied}</b></span>
                            <span className="status-section"><b>{application.job_status}</b> </span>
                            </li>
                            </ul> 
                );
            });
            setApplications(applicationList);
            console.log("Applications: ", applicationList);
           // response.data.forEach((application) => {
             //   setCompany(application.company);
               // setPosition(application.role);
               // setLocation(application.location);
               // setStatus(application.job_status);
               // setDateApplied(application.date_applied);
           // });
        });
     }, []);

    return (
        <div className="second-section">
            <h2>Applications</h2><br/>
            <div className="applications">
                <div className="top-applications-section">
                    <div className="company-tab"><p> Company </p></div>
                    <div className="position-tab"><p> Position </p></div>
                    <div className="location-tab"><p> Location </p></div>
                    <div className="date-applied-tab"><p> Date Applied </p></div>
                    <div className="status-tab"> <p> Status </p> </div>
                </div>
                <div className="job-application-section">
                  {applications}
                </div>
            </div>
        </div>
    );
};

export default Applications;