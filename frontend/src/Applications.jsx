import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import axiosInstance from './axiosInstance';

const Applications = () => {
    return (
        <Layout variant="full">
            <div className="applications">
                <h1> Applications Page </h1>
            </div>
        </Layout>
    )
}

export default Applications;