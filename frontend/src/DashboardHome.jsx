import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import axiosInstance from './axiosInstance';
import './styling/DashboardHome.css';
import { Navigate, Link, Outlet } from 'react-router-dom';

const DashboardHome = ({user, applications, interviews, offers}) => {
    return (
             <div className="second-section">
                <h2> Welcome {user?.username}! </h2><br/>
                <div className="stats-overview-cards"> {/* Stats overview cards */}
                    <div className="stat-card"> {/* div 1 */}
                        <div className="stat-card-top">
                            <h2> {applications} </h2><span className="stat-top"> Active Applications </span>
                        </div>
                    </div> {/* div 1 */}
                    <div className="stat-card">  {/* div 2 */}
                        <div className="stat-card-top">
                            <h2> {interviews} </h2><span className="stat-top"> Interviews Scheduled </span>
                        </div>
                    </div> {/* div 2 */}
                    <div className="stat-card"> {/* div 3 */}
                        <div className="stat-card-top">
                            <h2> {offers}</h2><span className="stat-top"> Offers Received </span>
                        </div>
                    </div> {/* div 3 */}
                </div> {/* End of stats overview cards */}<br/>

                        <div className="application-pipeline-section">
                            Application Pipeline
                        </div>

                        <div className="recent-applications-section">
                            Recent Applications
                        </div>
                    </div>
            );
        }

        export default DashboardHome;