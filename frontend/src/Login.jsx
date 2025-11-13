import { useState } from 'react';
import Layout from './Layout';
import './styling/Login.css';

const Login = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
    }

    const [password, setPassword] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        setPassword(password);
    }

    return (
        <Layout>
        <div className="login">
                <form className="login-container" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <label> Email: </label>
                    <input type="email" name="email" required /><br/>
                    <label> Password: </label>
                    <input type="password" name="password" required onChange={handleChange} minLength="12" /><br/>
                    <input className="login-btn" type="submit" value="Submit" />
                </form>
        </div>
        </Layout>
    )
}

export default Login;