import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Landing.css';
import { Container, Row } from "react-bootstrap"
import Slider from './Slider';
import Search_Profile from '../Profile/Search_Profile';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { userRequest } from '../../requestMethod';
import { publicRequest } from '../../requestMethod';
import { Grid } from '@mui/material';
import AnnouncementSlider from './AnnouncementSlider';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardLink } from 'mdb-react-ui-kit';
// import Slider from "react-slick";


function Landing() {

  let navigate = useNavigate();

  const [announcements, setAnnouncements] = useState([]);

  const [listofProfiles, setListofProfiles] = useState([]);
  const [listofTeams, setListofTeams] = useState([]);


  useEffect(() => {
    const getAnnouncement = async () => {
      try {
        const res = await axios.get("http://localhost:3001/announcement");
        axios.get("http://localhost:3001/account/random/home").then((response) => {
          // retrieve sport name data from other table
          setListofProfiles(response.data);
        });
        axios.get("http://localhost:3001/team/randomhome").then((response) => {
          setListofTeams(response.data);
        });
        setAnnouncements(res.data);
      } catch { }
    };
    getAnnouncement();
  }, []);


  return (
    <div>
      <Grid container >
        <Grid item xl={6}>
          <Slider />
        </Grid>


        <Grid item xl={6}>
          <h1 className='announcement_title'> Latest Announcements </h1>

          <AnnouncementSlider announcements={announcements} />

        </Grid>


        <h1> Explore Our Athletes! </h1>
        
        <Grid container>
          
        {listofProfiles.map((value, key) => {
          return (
            // <Row xl={12} style={{marginLeft: '2px'}}>
            
            <Grid item xs={12} lg={3}>
            
              <div className="profile-card-container" key={key}>
                <div className="card" onClick={() => navigate(`/profile/${value._id}`)}>
                  <div className="imgBx">
                    <img src={value.imgUrl ? value.imgUrl :
                      //'https://flaticons.net/icon.php?slug_category=application&slug_icon=user-profile'
                      'https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png'
                    }
                      alt="" />
                  </div>
                  <div className="contentBx">
                    <h2>@{value.username ? value.username : "Unknown"}</h2>
                    <img style={{height : '50px', marginTop: '3px', marginBottom: '6px'}} 
                    src={value.state === "Johor" ? 
                    "https://www.flagcolorcodes.com/data/Flag-of-Johor.png" 
                    : value.state === "Kelantan" ? 
                    "https://www.flagcolorcodes.com/data/Flag-of-Kelantan.png"
                    : value.state === "Terengganu" ? 
                    "https://www.flagcolorcodes.com/data/Flag-of-Terengganu.png"
                    : value.state === "Perlis" ? 
                    "https://www.flagcolorcodes.com/data/Flag-of-Perlis.png"
                    : value.state === "Melaka" ? 
                    "https://www.flagcolorcodes.com/data/Flag-of-Melaka.png"
                    : value.state === "Pulau Pinang" ? 
                    "https://www.flagcolorcodes.com/data/Flag-of-Penang.png"
                    : value.state === "Negeri Sembilan" ? 
                    "https://www.flagcolorcodes.com/data/Flag-of-Negeri-Sembilan.png"
                    : value.state === "WP Kuala Lumpur" ? 
                    "https://www.flagcolorcodes.com/data/Flag-of-Kuala-Lumpur.png"
                    : value.state === "Perak" ? 
                    "https://www.flagcolorcodes.com/data/Flag-of-Perak.png"
                    : value.state === "Sabah" ? 
                    "https://www.flagcolorcodes.com/data/Flag-of-Sabah.png"
                    : value.state === "Sarawak" ? 
                    "https://www.flagcolorcodes.com/data/Flag-of-Sarawak.png"
                    : value.state === "Pahang" ? 
                    "https://www.flagcolorcodes.com/data/Flag-of-Pahang.png"
                    : value.state === "Kedah" ? 
                    "https://www.flagcolorcodes.com/data/Flag-of-Kedah.png"
                    : value.state === "Selangor" ? 
                    "https://www.flagcolorcodes.com/data/Flag-of-Selangor.png"
                    : ""}/>
                    <div className="size">
                      <h3>Age : {value.age} </h3>

                    </div>
                    <div className="color">
                      <h3>Sport : {value.sport}</h3>

                    </div>

                    <button className='btn btn-primary' onClick={() => navigate(`/profile/${value._id}`)}>View Profile</button>
                  </div>
                </div>
              </div>



            </Grid>
           
          )
        })}
         </Grid>

         <h1 style={{marginTop: '5%'}}> Explore Our teams! </h1>
<Grid container>
        {listofTeams.length > 0 && listofTeams

          .map((team, key) => (

            <Grid item xl={3} sm={6} xs={12} key={key}>

              <MDBCard className="m-2 card-hover">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={team.logoUrl}
                    alt="avatar"
                    className="rounded-circle mt-4 mb-4"
                    style={{ width: '150px', height: '150px' }}
                    fluid />
                  <p className="text-muted mb-4">{team.name}</p>
                  <MDBCardLink onClick={() => navigate(`/team/${team.name}`)}
                    style={{ cursor: 'pointer', ':hover': { cursor: 'pointer' } }}
                  >View Profile</MDBCardLink>

                </MDBCardBody>
              </MDBCard>

            </Grid>
          ))}
          </Grid>
      </Grid>









    </div>

  )
}

export default Landing