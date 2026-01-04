import Layout from './Layout';
import './styling/Dashboard.css';

const Dashboard = () => {

    return (
        <Layout variant="full">
            <div className="dashboard">
                <div className="sidebar-menu">
                    Sidebar Menu
                    <ul>
                        <li> Dashboard </li>
                        <li> Application </li>
                        <li> Interviews </li>
                        <li> Templates </li>
                        <br/><br/><br/>
                        <li> Settings </li>
                    </ul>
                    <div className="profile-info">
                        <p> User Profile Info</p>
                        <hr/>
                        <p> Logout </p>
                    </div>
                </div>
                <div className="main-content">
                    {/* Main Content 
                    Dashboard */}
                    <div className="top-section">
                        <div className="search-bar"> Search </div>
                        <div className="add-application-button"></div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;