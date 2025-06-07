import {useState} from 'react'

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [currentRole, setCurrentRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [desiredRole, setDesiredRole] = useState("");
    
    return (
        <div className="signup">
            Sign-Up
            <div className="signup-container">
                Sign Up
            </div>
        </div>
    )
}

export default SignUp;