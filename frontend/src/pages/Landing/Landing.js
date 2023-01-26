import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Landing.css';
import { Container } from "react-bootstrap"
import Slider from './Slider';
import Search_Profile from '../Profile/Search_Profile';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { userRequest } from '../../requestMethod';
import { publicRequest } from '../../requestMethod';
import { Grid } from '@mui/material';


function Landing() {

  let navigate = useNavigate();

  const [announcements, setAnnouncements] = useState([]);

  const [listofProfiles, setListofProfiles] = useState([]);

  // useEffect( () => {
  //     axios.get("http://localhost:3001/announcement").then((response) => {
  //         setAnnouncements(response.data);
  //       });

  //       axios.get("http://localhost:3001/account/random").then((response) => {
  //         setListofProfiles(response.data);
  // });
  // }, []);

  useEffect(() => {
    const getAnnouncement = async () => {
      try {
        const res = await publicRequest.get("/announcement");
        axios.get("http://localhost:3001/account/random").then((response) => {
          // retrieve sport name data from other table
          setListofProfiles(response.data);
        });
        setAnnouncements(res.data);
      } catch { }
    };
    getAnnouncement();
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item xl={6}>
          <Slider />
        </Grid>

        {/* <Grid item xl={6}>
          <div>
            {listofProfiles.map((value, key) => {
              return (
                
                <Grid item xs={12} lg={6} key={key}>
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
                    <h3>{value.sport} Player</h3>
                    <div className="size">
                      <h3>Age : {value.age} </h3>

                    </div>
                    <div className="color">
                      <h3>Position :</h3>

                    </div>

                    <button className='btn btn-primary' onClick={() => navigate(`/profile/${value._id}`)}>View Profile</button>
                  </div>
                </div>
              </div>


            </Grid>
              )
            })}
          </div>
        </Grid> */}

        <h1 className='announcement_title'> Latest Announcements </h1>
        {/* <div classname="name">{announcements.announcementBody}
      </div> */}

        <div>

          {announcements.map((value, key) => {
            return (

              <div className='announcement' key={key}>
                <div className='name' > {value.announcementBody} </div>
              </div>

            )

          })}
        </div>
      </Grid>
    </div>

  )
}

export default Landing