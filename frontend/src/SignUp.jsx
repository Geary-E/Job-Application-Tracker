import {useState} from 'react';
import Layout from './Layout';
import axios from 'axios';
import axiosInstance from './axiosInstance';
import './styling/SignUp.css';


const SignUp = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        for(let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        axiosInstance.post('signup/', Object.fromEntries(formData)).then((response) => { /* originally {formData} */
            console.log(response);
            alert("User created successfully!");
        })
        .catch((error) => {
            console.log(error);
            console.log("Error creating user.");
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
        <Layout variant="center">
            <div className="signup">
                <form className="signup-container" onSubmit={handleSubmit} method="POST">
                    <h2>Sign Up</h2>
                    <label> First Name: </label>
                    <input type="text" name="first_name" required/>
                    <label> Last Name: </label>
                    <input type="text" name="last_name"  required/>
                    <label> Email: </label>
                    <input type="email" name="email" required />
                    <label> Current Role: </label>
                    <input type="text" name="current_role" required/>
                    <label>Password: </label>
                    <input type="password" name="password" value={password} onChange={handlePassword} required minLength="12" />
                    <label>Confirm Password: </label>
                    <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} required minLength="12"/> 
                    <label>Desired Role: </label>
                    <input type="text" name="desired_role" required/>
                    <button className="signup-btn" type="submit">Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default SignUp;