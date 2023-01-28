import React, {useState, useContext} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import './PersonalInfo.css'
import { AuthContext } from "../../context/AuthContext";
import {setCookie} from 'react-auth-kit'
import { useSignIn } from 'react-auth-kit'
import Cookies from 'js-cookie';

const Login = () => {

  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
 
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post("http://localhost:3001/account/login", 
      { username, password });
      
      const token = JSON.stringify(res.data)
      Cookies.set('access_token', token, { expires: 7 });
      navigate("/home")
    } catch (err) {
      
    }
  };

  return (
    
    <div >
    {/* <div className="form-container">
      <form className='loginForm' action="#">

        <h1>Login</h1>

        <input className='auth_input' 
        type="text" 
        placeholder="Username" 
        onChange={(e) => setUsername(e.target.value)}
        />

        <input className='auth_input' 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)}
        />

        <a href="#">Forgot your password?</a>

        <span>Don't have an account? Register <a href="/register">here</a> </span>

        <button className='btn btn-primary' onClick={handleLogin}>Login</button>
        
      </form>
    </div> */}

<div class="register-box">
                <h2>Register</h2>
                <div className="signup_form">
                    <div class="form-box">

                        <input
                            type="text"
                            className="signup_input"
                            // value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>Username</label>
                    </div>

                    

                    <div class="form-box">


                        <input
                            type={showPassword ? "text" : "password"}
                            className="signup_input"

                            // value={password}
                            // onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label>Password : </label>
                        <button className="btn btn-success"
                            style={{ marginBottom: '20px' }}
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>


        

              

                
                    <button className="signup_button"
                    onClick={handleLogin}
                      
                    >

                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button>
                </div>
            </div>
   
  </div>
 
    
  )
}

export default Login