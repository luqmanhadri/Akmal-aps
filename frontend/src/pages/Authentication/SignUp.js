
import { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import './SignUp.css'
// import { motion } from "framer-motion";

const SignUp = ({ formData, setFormData, page, setPage, x, setX }) => {

    const [passwordMatch, setPasswordMatch] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [inputTouched, setInputTouched] = useState(false);

    const handleConfirmPasswordChange = (e) => {
        setFormData({ ...formData, confirmPassword: e.target.value });
        checkPasswordMatch(formData.password, e.target.value);
    }

    const checkPasswordMatch = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            setPasswordMatch(false);
        } else {
            setPasswordMatch(true);
        }
    }
    return (
        <div className="register_container">

            <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Sign Up</h1>

            <h5>Username : </h5>
            <input
                type="text"
                placeholder="Username"
                className="register_input"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}

            />
            {formData.username.length < 6 && <p style={{ color: 'red' }}>Username must be at least 6 characters</p>}

            <h5>Password : </h5>
            
                <input
                    type={showPassword ? "text" : "password"}
                    className="register_input"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button className="btn btn-success" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Hide" : "Show"}
                </button>
            

            {formData.password.length < 8 && <p style={{ color: 'red' }}>Password must be at least 8 characters</p>}

            <h5>Confirm Password : </h5>
            <input
                type={showPassword ? "text" : "password"}
                className="register_input"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleConfirmPasswordChange}

            />
            {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}

            <h5>Select role : </h5>
            <select className='register_input' id="select_role"
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
                <option value="">Select Role</option>
                <option value="athlete">Athlete</option>
                <option value="manager">Manager</option>
                <option value="coach">Coach</option>
                <option value="storekeeper">Storekeeper</option>
            </select>

            <button className="btn btn-primary"
                onClick={() => {
                    if ((formData.username !== "" && formData.username.length >= 6) && formData.password !== ""
                        && formData.confirmPassword !== "" && formData.role !== "") {
                        setPage(page + 1);
                        setX(1000);
                        console.log(formData)
                    } else {
                        alert("Please fill all the fields")
                    }
                }}
            >
                Next
            </button>

        </div>

    );
};

export default SignUp;
