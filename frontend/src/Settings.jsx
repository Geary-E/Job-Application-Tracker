import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import { Navigate, Link, Outlet, useOutletContext } from 'react-router-dom';
import DashboardLayOut from './DashboardLayOut';
import './styling/DashboardLayOut.css';
import './styling/Settings.css';
import axiosInstance from './axiosInstance';

const Settings = () => {
      const { user } = useOutletContext();

       return (
        <div className="second-section">
            <h1>Settings Page</h1>
            <div className="settings"> {/* settings section start */}

                <div className="account-settings-section"> {/* account-settings-section start */}
                    <h3> Account Settings </h3>
                    <div className="account-settings-options">
                        <div className="email-section"> Email </div>
                        <div className="name-section"> Name </div>
                        <div className="password-section"> Password </div>
                    </div>
                </div> {/* account-settings-section end */}
                
                <div className="notification-settings-section"> {/* notification-settings-section start */} 
                    <h3> Notification Settings </h3>
                </div> {/* notification-settings-section end */}
                <p>{user?.username}</p>
            </div> {/* settings section end */}
        </div>
    )
}

export default Settings;