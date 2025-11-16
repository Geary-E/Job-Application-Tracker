import { useState } from 'react';
import Layout from './Layout';
import './styling/LearnMore.css';

const LearnMore = () => {
    return (
        <Layout>
            <div className="learn-more">
            <div className="learning-section" >
                <h2> Learn More About Us </h2>
                <p> Our Job Application Tracker was created to help job seekers manage and track their job applications and make the job search process effortless. We all know the job hunt is exhausting, this app is to help with that.</p>
                <p>Features: </p>
                <ul>
                    <li> Notes where you can track interviews </li>
                    <li> Application statuses </li>
                    <li> Resume Generators </li>
                </ul>
            </div> {/* learning section end */}
            </div>
        </Layout>
    )
}

export default LearnMore;