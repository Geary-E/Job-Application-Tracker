import {useState} from 'react';
import Layout from './Layout';
import axios from 'axios';
import axiosInstance from './axiosInstance';


const SignUp = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        for(let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        axiosInstance.post('/jobusers', {formData}).then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handlePassword = (event) => {
        event.preventDefault();
        setPassword(event.target.value);
    }

    const handleConfirmPassword = (event) => {
        event.preventDefault();
        setConfirmPassword(event.target.value);
    }
   
    
    return (
        <Layout>
            <div className="signup">
                <form className="signup-container" onSubmit={handleSubmit} method="POST">
                    <h1>Sign Up</h1>
                    <label> First Name: </label>
                    <input type="text" name="first_name" required/><br/>
                    <label> Last Name: </label>
                    <input type="text" name="last_name"  required/><br/>
                    <label> Email: </label>
                    <input type="email" name="email" required /><br/>
                    <label> Current Role: </label>
                    <input type="text" name="current_role" required/><br/>
                    <label>Password: </label>
                    <input type="password" name="password" value={password} onChange={handlePassword} required minLength="12" /><br/>
                    <label>Confirm Password: </label>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} required minLength="12"/> <br/>
                    <label>Desired Role: </label>
                    <input type="text" name="desired_role" required/><br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default SignUp;