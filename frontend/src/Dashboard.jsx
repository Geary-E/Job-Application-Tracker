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
                    </ul>
                </div>
                <div className="main-content">
                    Main Content 
                    Dashboard
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;