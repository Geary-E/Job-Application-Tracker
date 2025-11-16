import './styling/Home.css'
import {useRef} from 'react'
import { Link } from 'react-router'
//import building2 from './building-2.jpg'

const Home = () => {
    const learning = useRef();

   /* const handleScroll  = () => {
        console.log(learning.current);  // test and debug
        learning.current?.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }; */

    return (
        <div className="Home">
            <div className="body-section"> {/* Container */}
              <br /><br/>
              <div className="section-overlay"> {/* New section */}
                <h1 className="main-header"> <b> Job Application Tracker</b></h1><br/>
                <div className="button-section">
                  <Link to="/login"><button className="login">Login</button></Link>
                  <Link to="/signup"><button className="sign-up">Sign Up </button></Link>
                </div>
                <Link to="/learn-more"><button className="learn"> Learn More </button></Link>
                </div> {/* End of new section */}
            </div>
            <br/><br/>
        </div>
    )
}

export default Home; 