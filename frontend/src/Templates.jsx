import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import { Navigate, Link, Outlet, useOutletContext } from 'react-router-dom';
import DashboardLayOut from './DashboardLayOut';
import './styling/DashboardLayOut.css';
import axiosInstance from './axiosInstance';

const Templates = () => {

       const { user } = useOutletContext();
       const [templates, setTemplates] = useState([]); // state to hold templates data
       const [loading, setLoading] = useState(false); // state to track loading status 
       const [generating, setGenerating] = useState(false); // state to track if template generation is in progress 
       const [error, setError] = useState(null); // state to hold any error messages

       //useEffect(() => {
       // fetchTemplates();   // fetching templates
      // }, []);



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