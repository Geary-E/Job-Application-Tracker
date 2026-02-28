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

    useEffect(() => {
        axiosInstance.get('jobapplications/').then((response) => {
            console.log(response.data);
            response.data.forEach((application) => {
                setCompany(application.company);
                setPosition(application.role);
                setLocation(application.location);
                setStatus(application.job_status);
                setDateApplied(application.date_applied);
            });
        });
     }, []);

    return (
        <div className="second-section">
            <h2>Applications</h2><br/>
            <div className="applications">
                <div className="top-applications-section">
                    <p> Company </p>
                    <p> Position </p>
                    <p> Location </p>
                    <p> Date Applied </p>
                    <p> Status </p>
                </div>
            <p>{user?.username}</p>
            </div>
        </div>
    );
};

export default Applications;