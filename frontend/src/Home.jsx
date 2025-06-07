import './styling/Home.css'
import {useRef} from 'react'

const Home = () => {
    const learning = useRef();

    const handleScroll  = () => {
        console.log(learning.current);  // test and debug
        learning.current?.scrollIntoView({ behavior: 'smooth', block: 'start'});
    };

    return (
        <div className="Home">
            <div className="nav-section">
                <button className="sign-up">Sign Up </button>
                <button className="login"> Login </button>
            </div>
            <div className="body-section">
              <h2 className="body-header">Welcome To The Job Application Tracker! </h2> 
              <br /><br/>
              <button className="learn" onClick={handleScroll}> Learn More </button>
            </div>
            <br/><br/>
            <div ref={learning} className="learn-target">
                <h2>Job Application Tracker</h2>
                    <h3>We all know the Job Application Process is Challenging...especially in this current job market</h3>
                    <p> This application is created to make the job application process as easy for you as possible</p>
                    <p><b> Features of the Application:</b></p>
                    <ul>
                        <li>A slot for each job you applied to </li>
                        <li>Notes customized by you from each interview</li>
                        <li>The ability to generate resume and cover letter templates based on the job you're looking for</li>
                        <li>And more...</li>
                    </ul>
                    <p> Let's make your journey of the pursuit of a job easier and better with the Job Application Tracker today!</p>
            </div>
        </div>
    )
}

export default Home; 