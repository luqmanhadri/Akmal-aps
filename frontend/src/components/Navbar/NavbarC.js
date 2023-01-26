import React, { useEffect, useState } from 'react';
import img1 from './UM logo.png'
import "./NavbarComp.css"
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"
import { logout } from "../../redux/userSlice";
import Cookies from 'js-cookie';
import { Typography } from '@mui/material';


function NavbarC() {
  
  // const [datatoken, setDataToken] = useState({});
  let navigate = useNavigate()

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = async () => {
    // e.preventDefault();
    try {
      dispatch(logout());
      Cookies.remove('access_token');
      console.log("Cookie removed")
      navigate("/");
    } catch (err) {
      console.log(err)
    }

  };

  const token = Cookies.get('access_token');
  if (token) {
    const data = JSON.parse(token);
    // console.log(data);
  } else {
    console.log("Failed")
  }

  let datatoken
  
  if (token && typeof token !== 'undefined') {
    datatoken = JSON.parse(token);
    // use datatoken here
  }

  

  return (


    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand >APS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" bg="dark">
        <Nav className="mr-auto" bg="dark">
        
          
          <Nav.Link as={Link} to="/search_profile">Search Profile</Nav.Link>
          {datatoken ? (
          <Nav bg="dark">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link onClick={()=> navigate(`/team/${datatoken.sport}`)}>Team</Nav.Link>
            <Nav.Link as={Link} to="/booking">Booking</Nav.Link>
            <Nav.Link as={Link} to="/fitness">Fitness</Nav.Link>
          <Nav.Link as={Link} to="/wellness">Wellness</Nav.Link>
          
          <Nav.Link as={Link} to="/inventory">Storekeeper Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/schedule">Schedule</Nav.Link>
          </Nav>
        ) : (
          <div></div>
        )}

{datatoken && datatoken.role === "admin" ? (
          
          <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>

        ) : (
          <div></div>
        )}

          
         
          
          <Nav.Link as={Link} to="/search_team">Search Team</Nav.Link>
          
        </Nav>
        {datatoken ? (
          <Nav bg="dark">
            <Nav.Link onClick={()=> navigate(`/profile/${datatoken._id}`)}>{datatoken.username}</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Sign Up</Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>




  )
}

export default NavbarC