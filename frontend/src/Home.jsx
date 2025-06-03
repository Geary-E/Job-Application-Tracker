import './styling/Home.css'
import {useRef} from 'react'

const Home = () => {
    const learning = useRef();
    return (
        <div className="Home">
            <div className="nav-section">
                <button className="sign-up">Sign Up </button>
                <button className="login"> Login </button>
            </div>
            <div className="body-section">
              <h2 className="body-header">Welcome To The Job Application Tracker! </h2> 
              <br /><br/>
              <button className="learn"> Learn More </button>
            </div>
            <br/>
            <div ref={learning} className="learn">
                Learning
            </div>
        </div>
    )
}

export default Home;