import './styling/Home.css'

const Home = () => {

    return (
        <div className="Home">
            <div className="nav-section">
                <button className="sign-up">Sign Up </button>
                <button className="login"> Login </button>
            </div>
            <div className="body-section">
              <h2>Welcome To The Job Application Tracker App! </h2> 
              <br />
              <button className="learn"> Learn More </button>
            </div>
        </div>
    )
}

export default Home;