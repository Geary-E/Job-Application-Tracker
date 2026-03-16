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
            <h1>Settings Page</h1><br/>
            <div className="settings"> {/* settings section start */}

                <div className="account-settings-section"> {/* account-settings-section start */}
                    <h3> Account Settings </h3>
                    <div className="account-settings-options">
                        <div className="email-section"> <label> Email Address: </label> <br/><br/> <input type="text" className="account-input" value={user?.email} /></div>
                        <div className="name-section"> <label> Name: </label><br/><br/> <input type="text" className="account-input" value={user?.username} /> </div>
                        <div className="password-section"> <label> Password: </label><br/> <button className="change-password"> Change Password </button> </div>
                        <div className="buttons-section"> 
                            <button className="save-changes"> Save  </button>
                            <button className="cancel"> Cancel </button>
                            </div>
                    </div>
                </div> {/* account-settings-section end */}
                
                <div className="notification-settings-section"> {/* notification-settings-section start */} 
                    <h3> Notification Settings </h3>
                    <div className="notification-settings-options">
                        <div className="email-notifications"> Email notifications 
                            <label className="toggle-switch">
                                <input type="checkbox" checked />
                                <span className="slider"></span>
                                </label> 
                            </div>
                        <div className="application-updates"> Application Updates 
                            <label className="toggle-switch">
                                <input type="checkbox" checked />
                                <span className="slider"></span>
                            </label> 
                        </div>
                        <div className="weekly-summary"> Weekly Summary 
                            <label className="toggle-switch">
                                <input type="checkbox" checked />
                                <span className="slider"></span>
                            </label> 
                        </div>
                        <div className="job-alerts"> Job Alerts
                             <label className="toggle-switch">
                                <input type="checkbox" checked />
                                <span className="slider"></span>
                            </label> 
                         </div>
                    </div> {/* notification-settings-options end */}
                </div> {/* notification-settings-section end */}

                <div className="danger-zone-section">   {/* danger-zone-section start */} 
                    <h3> Danger Zone </h3>
                </div> {/* danger-zone-section end */}
            </div> {/* settings section end */}
        </div>
    )
}

export default Settings;