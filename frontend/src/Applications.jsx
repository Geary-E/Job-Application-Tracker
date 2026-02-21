import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import { Navigate, Link, Outlet, useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; {/* testing */}
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import DashboardLayOut from './DashboardLayOut';
import './styling/DashboardLayOut.css';
import axiosInstance from './axiosInstance';

const Applications = () => {

    const { user } = useOutletContext();

    return (
        <div className="second-section">
            <h1>Applications Page</h1>
            <p>{user?.username}</p>
        </div>
    );
};

export default Applications;