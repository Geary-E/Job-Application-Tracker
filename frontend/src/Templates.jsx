import Layout from './Layout';
import React, {useState, useEffect} from 'react';
import axiosInstance from './axiosInstance';

const Templates = () => {
       return (
        <Layout variant="full">
            <div className="templates">
                <h1> Templates Page </h1>
            </div>
        </Layout>
    )
}

export default Templates;