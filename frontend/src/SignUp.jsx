import {useState} from 'react'

const SignUp = () => {
    //const [firstName, setFirstName] = useState("");
    //const [lastName, setLastName] = useState("");
    //const [currentRole, setCurrentRole] = useState("");
    //const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //const [desiredRole, setDesiredRole] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        for(let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    }

    const handlePassword = (event) => {
        event.preventDefault();
        setPassword(event.target.value);
    }
    
    return (
        <div className="signup">
            Sign-Up
            <form className="signup-container" onSubmit={handleSubmit}>
                Sign Up
                <label> First Name: </label>
                <input type="text" name="first_name" /><br/>
                <label> Last Name: </label>
                <input type="text" name="last_name" /><br/>
                <label> Current Role: </label>
                <input type="text" name="current_role" /><br/>
                <label>Password: </label>
                <input type="password" name="password" value={password} onChange={handlePassword} /><br/>
                <label>Desired Role: </label>
                <input type="text" name="desired_role" /><br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUp;