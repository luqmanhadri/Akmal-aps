import React, {useState, useContext} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import './Auth.css'
import { AuthContext } from "../../context/AuthContext";
import {setCookie} from 'react-auth-kit'
import { useSignIn } from 'react-auth-kit'
import Cookies from 'js-cookie';

const Login = () => {

  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
 

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:3001/account/login", { username, password });
      dispatch(loginSuccess(res.data));
      const token = JSON.stringify(res.data)
      Cookies.set('access_token', token, { expires: 7 });
      navigate("/home")
    } catch (err) {
      dispatch(loginFailure());
    }
  };

  return (
    
    <div >
    <div className="form-container">
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
        {/* {error && <span>{error.message}</span>} */}
      </form>
    </div>
   
  </div>
 
    
  )
}

export default Login