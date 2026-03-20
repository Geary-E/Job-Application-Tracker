import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import { Navigate, Link, Outlet, useOutletContext } from 'react-router-dom';
import DashboardLayOut from './DashboardLayOut';
import './styling/DashboardLayOut.css';
import axiosInstance from './axiosInstance';

const Templates = () => {
       const { user } = useOutletContext();
       const [templates, setTemplates] = useState([]); // state to hold templates data

       return (
        <div className="second-section">
            <h1>Templates Page </h1>
            <div className="templates-container">
                <div className="template-card">
                    <h2> Template 1 </h2>
                </div>
            </div>
            <p>{user?.username}</p>
        </div>
    )
}

export default Templates;