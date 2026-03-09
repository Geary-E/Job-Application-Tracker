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
            setApplications(response.data);
            //console.log("Applications: ", applicationList);
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
                <div className="application-listings">
                <table className="top-listing-part">    
                    <thead className="top-applications-section">
                        <tr>
                        <th className="company-tab"><p> Company </p></th>
                        <th className="position-tab"><p> Position </p></th>
                        <th className="location-tab"><p> Location </p></th>
                        <th className="date-applied-tab"><p> Date Applied </p></th>
                        <th className="status-tab"> <p> Status </p> </th>
                        </tr>
                    </thead>
                    <tbody className="job-application-section">
                        {applications.map((application) => {
                            return (
                                    <tr key={application.id} className="job-application-listing">
                                    <td className="company-section"> {application.company}</td>
                                    <td className="position-section"> {application.role} </td>
                                    <td className="location-section"> {application.location}</td>
                                    <td className="date-applied-section"> {application.date_applied}</td>
                                    <td className="status-section"> {application.job_status} </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
};

export default Applications;