import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
// import Upload from './Upload';
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom";
// import './Spesific_Profile.css'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import './Team_Profile.css'
import Card from '../Videos/Card';
// import Add_Achievement from './Add_Achievement';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, IconButton } from '@mui/material';
import { Modal, Button } from 'react-bootstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
import Team_Navbar from './Team_Navbar';
import badge from '../../images/gold-shield-icon-vector-18193912 (3).png'
import Add_Team_Achievement from './Add_Team_Achievement';

function Team_Profile() {

  const [teamDetails, setTeamDetails] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [manager, setManager] = useState([]);
  const [coach, setCoach] = useState([]);
  const [videos, setVideos] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAchievement, setOpenAchievement] = useState(false);
  const [managerImages, setManagerImages] = useState({});
  const [coachImages, setCoachImages] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  
  const dispatch = useDispatch();
  let navigate = useNavigate();


  const path = useLocation().pathname.split("/")[2];
  const token = Cookies.get('access_token');
  const [players, setPlayers] = useState([]);

  // if (token) {
  //   const data = JSON.parse(token);
  //   // console.log(data);
  // } else {
  //   console.log("Failed")
  // }

  let datatoken

  if (token && typeof token !== 'undefined') {
    datatoken = JSON.parse(token);
    // use datatoken here
  }



  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const teamRes = await axios.get(`http://localhost:3001/team/find/${path}`);
        setTeamDetails(teamRes.data);
        const players = await axios.get(`http://localhost:3001/account/sport/${path}`);
        setPlayers(players.data);
        setAchievements(teamRes.data.achievement)
        setManager(teamRes.data.manager)
        setCoach(teamRes.data.coach)
        console.log(teamRes.data)
        
      } catch (err) { }
    };

    fetchData();
    
  }, []);

  const athletes = players.filter((player) => player.role === "athlete");

  useEffect(() => {
    const fetchManagerImages = async () => {
        manager.forEach(async (manager) => {
            const image = await getManagerImage(manager.id);
            setManagerImages(prevImages => ({ ...prevImages, [manager.id]: image }));
        });
    };
    fetchManagerImages();
}, [manager]);

 

  const getManagerImage = async (managerId) => {
    const response = await axios.get(`http://localhost:3001/account/find/${managerId}`);
    console.log(response.data.imgUrl)
    return response.data.imgUrl;
    
  }

  useEffect(() => {
    const fetchCoachImages = async () => {
        coach.forEach(async (coach) => {
            const image = await getCoachImage(coach.id);
            setCoachImages(prevImages => ({ ...prevImages, [coach.id]: image }));
        });
    };
    fetchCoachImages();
}, [coach]);

const getCoachImage = async (coachId) => {
  const response = await axios.get(`http://localhost:3001/account/find/${coachId}`);
  console.log(response.data.imgUrl)
  return response.data.imgUrl;
  
}

  const deleteAchievement = async (achievementId) => {
    await axios.delete(`http://localhost:3001/team/achievement/${path}/${achievementId}`)
  }


  return (
    <div>
      {datatoken && datatoken.sport == path ? (<Team_Navbar />) : (<div></div>)}

      <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5">

          <div
            style={{
              backgroundImage: `url(${'https://www.premierleague.com/resources/prod/v6.111.2-4807/i/bg-elements/heading-bg-desktop.svg'})`,
              width: '100%',
              height: '200px',
              // backgroundColor: clubDetails.clubColor,
              backgroundColor: '#37003c',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '10px'
            }}
          >
            <MDBCardImage
              src={teamDetails.logoUrl ? teamDetails.logoUrl : badge}
              className="rounded-circle mt-4 mb-4"
              style={{
                width: '150px', height: '150px',
              }}
              fluid />
            <h1 className='m-5' style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{teamDetails.name}</h1>
          </div>


          <MDBRow>
            <MDBCol lg="4">

              <MDBCard className="mb-4 mb-lg-0 mt-4">
                <MDBCardBody className="p-0">
                  <MDBListGroup flush className="rounded-3" >
                    <MDBListGroupItem className="d-flex justify-content-between align-items-center" style={{ backgroundColor: '#37003c' }}>
                      <MDBCardText style={{ color: 'white' }}>Details</MDBCardText>
                      {/* {datatoken && datatoken.sport === path ? (
                        <button className='btn btn-primary update_button'
                          onClick={() => setOpen(true)}
                          style={{ backgroundColor: '#ff2882', border: 'none' }}
                        > Edit </button>
                      ) : (
                        <div></div>
                      )} */}

                    
                    </MDBListGroupItem>

                    {manager.map((manager) => {
                      
                      // const managerImage = getManagerImage(manager.id);

                      // const [managerImage, setManagerImage] = useState('');

                      // useEffect(() => {
                      //   getManagerImage(manager.id).then(imgUrl => setManagerImage(imgUrl));
                      // }, [manager.id]);
                      return (
                        <MDBListGroupItem key={manager.id} className="d-flex justify-content-between align-items-center">
                          <MDBCol>
                          <Avatar src={managerImages[manager.id]} style={{height : '100px', width : '100px'}}/>
                          </MDBCol>
                          <MDBCol>
                          <MDBCardText >Manager : {manager.name}</MDBCardText>
                          </MDBCol>

                        </MDBListGroupItem>


                      );
                    })} 

                    {coach.map((coach) => {
                      return (
                        <MDBListGroupItem key={coach.id} className="d-flex justify-content-between align-items-center">
                          <MDBCol>
                          <Avatar src={coachImages[coach.id]} style={{height : '100px', width : '100px'}}/>
                          </MDBCol>
                          <MDBCol>
                          <MDBCardText >Coach : {coach.name ? coach.name : "TBA"}</MDBCardText>
                          </MDBCol>

                        </MDBListGroupItem>


                      );
                    })}
                   


                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>


              {/* <MDBCard className="mb-4 mt-3">
                <MDBCardBody className="text-center">
                  <MDBCardText>Nearest Event</MDBCardText>
                </MDBCardBody>
              </MDBCard> */}



            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4 mt-4">

                <MDBListGroup>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center" style={{ backgroundColor: '#37003c' }}>
                    <MDBCardText style={{ color: 'white' }}
                    onClick={() => setOpen(true)}>Team Achievements</MDBCardText>
                    {datatoken && datatoken.sport === path && (datatoken.role === "coach" ||datatoken.role === "manager") ? (
                      <button className='btn btn-primary update_button' 
                      onClick={() => setOpen(true)}
                      style={{ backgroundColor: '#ff2882', border: 'none' }}> Add Achievements </button>
                    ) : (
                      <div></div>
                    )}
                    {/* <button className='btn btn-primary' style={{ backgroundColor: '#ff2882', border: 'none' }}>Add Achievements</button> */}
                  </MDBListGroupItem>

                  {achievements.map((achievement) => {
                    return (

                      <MDBListGroupItem key={achievement._id} className="d-flex justify-content-between align-items-center">
                        <MDBCardText >{achievement.year}</MDBCardText>
                        <MDBCardText > {achievement.achievement}</MDBCardText>
                        <IconButton onClick={() => deleteAchievement(achievement._id)}><DeleteIcon/></IconButton>
                      </MDBListGroupItem>
   

                    );
                  })}
                </MDBListGroup>


              </MDBCard>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow style={{ backgroundColor: '#37003c' }}>
                      <TableCell style={{ color: 'white' }}>Name</TableCell>
                      <TableCell style={{ color: 'white' }} align="right">State</TableCell>
                      <TableCell style={{ color: 'white' }} align="right">Age</TableCell>
                      <TableCell style={{ color: 'white' }} align="right">Username</TableCell>
                      {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {athletes.map((player) => (
                      <TableRow
                        key={player._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" 
                        onClick={() => navigate(`/profile/${player._id}`)}
                        style={{cursor: 'pointer'}}
                        >
                          {player.name}
                        </TableCell>
                        <TableCell align="right">{player.state}</TableCell>
                        <TableCell align="right">{player.age}</TableCell>
                        <TableCell align="right">{player.username}</TableCell>
                        {/* <TableCell align="right">{row.protein}</TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      {open && <Add_Team_Achievement setOpen={setOpen} />}


    </div>
  )
}

export default Team_Profile