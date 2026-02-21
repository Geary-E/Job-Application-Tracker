import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import { Navigate, Link, Outlet, useOutletContext } from 'react-router-dom';
import DashboardLayOut from './DashboardLayOut';
import './styling/DashboardLayOut.css';
import axiosInstance from './axiosInstance';

const Settings = () => {
      const { user } = useOutletContext();

       return (
        <div className="second-section">
            <h1>Settings Page</h1>
            <p>{user?.username}</p>
        </div>
    )
}

export default Settings;