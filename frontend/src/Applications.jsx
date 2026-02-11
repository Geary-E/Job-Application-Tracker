import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import DashboardLayOut from './DashboardLayOut';
import './styling/DashboardLayOut.css';
import axiosInstance from './axiosInstance';

const Applications = () => {
    return (
        <Layout variant="full">
            <DashboardLayOut>
            <div className="applications">
                <h1> Applications Page </h1>
            </div>
            </DashboardLayOut>
        </Layout>
    )
}

export default Applications;