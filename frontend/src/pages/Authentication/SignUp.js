
import { useState } from "react";
import { ToastContainer } from "react-bootstrap";
import './SignUp.css'
import { toast } from "react-toastify";
// import { motion } from "framer-motion";

const SignUp = ({ formData, setFormData, page, setPage, x, setX }) => {

    const [passwordMatch, setPasswordMatch] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const [showErrorUsername, setShowErrorUsername] = useState(false);
    const [showErrorPassword, setShowErrorPassword] = useState(false);

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
        // <div className="register_container">
        <div >

            
            <div class="register-box">
                <h2>Register</h2>
                <div className="signup_form">
                    <div class="form-box">

                        <input
                            type="text"
                            className="signup_input"
                            value={formData.username}
                            onChange={(e) => {
                                setFormData({ ...formData, username: e.target.value });
                                if (e.target.value.length >= 6) {
                                    setShowErrorUsername(false);
                                } else {
                                    setShowErrorUsername(true);
                                }
                            }}
                        />
                        <label>Username</label>
                    </div>

                    {showErrorUsername && formData.username.length < 6 && (
                        <p style={{ color: "red" }}>Username must be at least 6 characters</p>
                    )}

                    <div class="form-box">


                        <input
                            type={showPassword ? "text" : "password"}
                            className="signup_input"

                            value={formData.password}
                            // onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            onChange={(e) => {
                                setFormData({ ...formData, password: e.target.value });
                                if (e.target.value.length >= 8) {
                                    setShowErrorPassword(false);
                                } else {
                                    setShowErrorPassword(true);
                                }
                            }}
                        />
                        <label>Password : </label>
                        <button className="btn btn-success"
                            style={{ marginBottom: '20px' }}
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>


                    

                    {showErrorPassword && formData.password.length < 8 && (
                        <p style={{ color: 'red' }}
                        >Password must be at least 8 characters</p>)}

                    <div class="form-box">

                        <input
                            type={showPassword ? "text" : "password"}
                            className="signup_input"

                            value={formData.confirmPassword}
                            onChange={handleConfirmPasswordChange}

                        />
                        <label>Confirm Password : </label>
                    </div>

                    {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}

                    <div class="form-box">
                        <select className='signup_input' id="select_role"
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="" ></option>
                            <option value="athlete" style={{ color: 'black' }}>Athlete</option>
                            <option value="manager" style={{ color: 'black' }}>Manager</option>
                            <option value="coach" style={{ color: 'black' }}>Coach</option>
                            <option value="storekeeper" style={{ color: 'black' }}>Storekeeper</option>
                        </select>
                        <label>Select role : </label>
                    </div>

                    {/* <button className="btn btn-primary"
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
            </button>  */}
                    <button className="signup_button"
                        onClick={() => {
                            if ((formData.username !== "" && formData.username.length >= 6) && formData.password !== ""
                                && formData.confirmPassword !== "" && formData.role !== "") {
                                setPage(page + 1);
                                setX(1000);
                                console.log(formData)
                            } else {
                                toast.error("Please fill in all the fields!", 
                                {position: toast.POSITION.TOP_CENTER});
                            
                            }
                        }}
                    >

                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button>
                </div>
            </div>
            {/* <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Sign Up</h1>

            <label>Username : </label>
            <input
                type="text"
                placeholder="Username"
                className="signup_input"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}

            />
            {formData.username.length < 6 && <p style={{ color: 'red' }}>Username must be at least 6 characters</p>}

            <label>Password : </label>
            
                <input
                    type={showPassword ? "text" : "password"}
                    className="signup_input"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button className="btn btn-success" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Hide" : "Show"}
                </button>
            

            {formData.password.length < 8 && <p style={{ color: 'red' }}>Password must be at least 8 characters</p>}

            <label>Confirm Password : </label>
            <input
                type={showPassword ? "text" : "password"}
                className="signup_input"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleConfirmPasswordChange}

            />
            {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}

            <label>Select role : </label>
            <select className='signup_input' id="select_role"
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
            </button> */}

        </div>

    );
};

export default SignUp;
 