import React from 'react'
import './Admin.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from '@mui/material';
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';

function Admin() {

  let navigate = useNavigate();
  const [listofProfiles, setListofProfiles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("")
  const [storeDropdown, setStoreDropdown] = useState("")
  const [approval, setApproval] = useState(false);


  useEffect(() => {
    axios.get("http://localhost:3001/account/find").then((response) => {
      setListofProfiles(response.data);
    });
  }, []);


  const approveUser = async (userid) => {
    await axios.patch(`http://localhost:3001/account/request/${userid}`)


  }

  const approveManager = async (team, id, name) => {
    try {
      await axios.post(`http://localhost:3001/team/manager/${team}`,
      {
        id: id,
        name: name
      }
    )
    } catch (err) {
      console.log(err)
    }
    
  }

  const approveCoach = async (team, id, name) => {
    try {
      await axios.post(`http://localhost:3001/team/coach/${team}`,
      {
        id: id,
        name: name
      }
    )
    } catch (err) {
      console.log(err)
    }
    
  }

  const rejectUser = async (userid) => {
    await axios.delete(`http://localhost:3001/account/${userid}`)
  }

  const handleChange = (e) => {
    setSelectedRole(e.target.value);
  }

  // const filteredProfiles = listofProfiles.filter(profile => profile.role === selectedRole);


  return (
    <div>


      <div>
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '5px' }}>New User Requests</h1>
        <select placeholder='Select store'
          // value={selectedStore}

          className="auth_input"
          onChange={handleChange}
        >

          <option value="coach">Coach</option>
          <option value="manager">Manager</option>
          <option value="storekeeper">Storekeeper</option>


        </select>
        {listofProfiles
          .filter(value => !selectedRole || value.role === selectedRole)
          .map((value, key) => {
            return (

              <Grid xl={4}>
                <MDBCard className="mb-4">
                  <MDBCardBody >
                    <MDBCardText>Username : {value.name}</MDBCardText>
                    <MDBCardText>Name : {value.name}</MDBCardText>
                    <MDBCardText>Role : {value.role}</MDBCardText>
                    <MDBCardText>Team : {value.sport ? value.sport : 'None'}</MDBCardText>
                    {/* <MDBCardText>Start Date : <Moment format="DD/MM/YYYY">{booking.startDate}</Moment></MDBCardText>
              <MDBCardText>End Date : <Moment format="DD/MM/YYYY">{booking.endDate}</Moment></MDBCardText> */}
                    <button className='btn btn-primary m-2'
                      onClick={() => {
                        if (value.role === "manager") {
                          approveManager(value.sport, value._id, value.name);
                        } else if (value.role === "coach") {
                          approveCoach(value.sport, value._id, value.name);
                        }
                        approveUser(value._id);
                      }}>Approve</button>


                    <button className='btn btn-danger'
                      onClick={() => rejectUser(value._id)}
                    >Reject</button>
                  </MDBCardBody>
                </MDBCard>
              </Grid>
            )

          })}

      </div>
    </div>
  )
}

export default Admin