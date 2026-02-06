import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import axiosInstance from './axiosInstance';

const Settings = () => {
       return (
        <Layout variant="full">
            <div className="settings">
                <h1> Settings Page </h1>
            </div>
        </Layout>
    )
}

export default Settings;