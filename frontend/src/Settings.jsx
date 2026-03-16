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
                        <div className="email-notifications"> 
                            <h4> Email notifications </h4>
                            <label className="toggle-switch">
                                <input type="checkbox" />
                                <span className="slider"></span>
                                </label> <br/>
                                <p className="notification-description"> Interview and follow up alerts</p>
                            </div>
                        <div className="application-updates"> 
                            <h4> Application Updates </h4>
                            <label className="toggle-switch">
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label> <br/>
                            <p className="notification-description"> Status change alerts </p>
                        </div>
                        <div className="weekly-summary"> 
                            <h4> Weekly Summary </h4>
                            <label className="toggle-switch">
                                <input type="checkbox"/>
                                <span className="slider"></span>
                            </label> <br/>
                            <p className="notification-description"> Weekly pipeline digest </p>
                        </div>
                        <div className="job-alerts"> 
                            <h4> Job Alerts </h4>
                             <label className="toggle-switch">
                                <input type="checkbox" />
                                <span className="slider"></span>
                            </label> <br />
                            <p className="notification-description"> Matching job postings</p>
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