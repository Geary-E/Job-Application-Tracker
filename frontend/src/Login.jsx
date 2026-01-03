import { useState } from 'react';
import Layout from './Layout';
import { Navigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';
import './styling/Login.css';

const Login = () => {

    const [loggedIn, setLoggedIn] = useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        axiosInstance.post('login/', Object.fromEntries(formData)).then((response) => {
            console.log(Object.fromEntries(formData));
            console.log(response);
            const { access, refresh } = response.data; /* testing...testing...testing */
            // Store token (localStorage or cookies)
            setLoggedIn(true); // testing..testing..testing
            localStorage.setItem("access", access); /* testing...testing...testing */
            localStorage.setItem("refresh", refresh); /* testing...testing...testing */
            alert("Login successful!");
        })
        .catch((error) => {
            console.log(Object.fromEntries(formData));
            console.log(error);
            console.log("Error logging in.");
            alert("Error logging in. Please check your credentials and try again.");
        });

    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleEmailChange = (e) => {
        //e.preventDefault();
        setEmail(e.target.value);
    }
    
    const handlePasswordChange = (e) => {
       // e.preventDefault();
        setPassword(e.target.value);
    }

    return (
        <Layout variant="center">
        <div className="login">
                <form className="login-container" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <label> Email: </label>
                    <input type="email" name="email" value={email} required onChange={handleEmailChange}/><br/>
                    <label> Password: </label>
                    <input type="password" name="password" required onChange={handlePasswordChange} minLength="12" /><br/>
                    <input className="login-btn" type="submit" value="Submit" />
                </form>
                {loggedIn && <Navigate to="/dashboard" replace={true} />}
        </div>
        </Layout>
    )
}

export default Login;