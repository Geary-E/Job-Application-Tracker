import { useState } from 'react'

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
        <div className="login">
            <form className="login-container" onSubmit={handleSubmit}>
                <label> Email: </label>
                <input type="email" name="email" required /><br/>
                <label> Password: </label>
                <input type="password" name="password" required onChange={handleChange} minLength="12" /><br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Login;