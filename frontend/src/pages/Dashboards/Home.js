import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
// import Upload from './Upload';
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom";
import { loginSuccess } from '../../redux/userSlice';
import './Home.css'
import { useNavigate } from "react-router-dom";
// import { useValue } from '../../context/ContextProvider';
// import useCheckToken from '../../hooks/useCheckToken';
import { Grid } from '@mui/material';
import { async } from '@firebase/util';
import { setLogLevel } from 'firebase/app';
import Cookies from 'js-cookie';


function Home() {

  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [profileDetails, setProfileDetails] = useState({});
  const [announcementDetails, setAnnouncementDetails] = useState("");
  // const { datatoken } = useSelector((state) => state.user);
  const [announcement, setAnnouncement] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [message, setMessage] = useState("");

  const token = Cookies.get('access_token');

  if (token) {
    const data = JSON.parse(token);
    console.log(data);
  } else {
    console.log("Failed")
  }

  const datatoken = JSON.parse(token)
  // useEffect(() => {
  //   const accountRes = axios.get(`http://localhost:3001/account/find/${datatoken._id}`);
  //   // axios.get(`http://localhost:3001/account/${id}`).then((response) => {
  //   //       setProfileDetails(response.data);
  //   //     });
  //   setProfileDetails(accountRes.data);

  //   // axios.post("http://localhost:3001/announcement").then((response) => {
  //   //   setAnnouncementDetails(response.data);
  //   // });

  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axios.get(`http://localhost:3001/account/find/${datatoken._id}`);
        // const profileRes = await axios.get(`/profile/${accountRes.data._id}`);
        // const videoRes = await axios.get(`http://localhost:3001/videos/${path}`);

        // const channelRes = await axios.get(
        //   `/users/find/${videoRes.data.userId}`
        // );
        setProfileDetails(accountRes.data);
        console.log("Success")
        // setAchievements(accountRes.data.achievement)
        // setVideos(videoRes.data);
        // dispatch(loginSuccess(accountRes.data));
      } catch (err) { }
    };
    fetchData();
  }, []);

  // if(token) {
  //   console.log(token)
  // } else {
  //   console.log("No token")
  // }


  const addAnnouncement = async () => {
    await axios.post("http://localhost:3001/announcement",
      {
        announcementBody: newAnnouncement
        // , ProfileId: _id
      }
      , { withCredentials: true }

    )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const announcementToAdd = {
            announcementBody: newAnnouncement,
            // username: response.data.username,
          };
          setAnnouncement([...announcement, announcementToAdd]);
          setNewAnnouncement("");
        }
      });
  };


  return (
    <div>

      <Grid container justify="center" alignItems="center" marginTop={15}>
        <Grid item xs={12} xl={6} sm={6} >
          <div className="home-card">
            <div className="home-card-header">
              <img src={datatoken.imgUrl ? 
                datatoken.imgUrl : 
                'https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png'} 
                 className="profile-img" />
            </div>
            <div className="home-card-body">
              <p className="name" onClick={() => navigate(`/profile/${datatoken._id}`)}>{datatoken.username}</p>

              <p >Name : {datatoken.name}</p>
              <p >Sport : {datatoken.sport}</p>
              <p >Age : {datatoken.age}</p>
              <p >Height : {datatoken.height}</p>
              <p >Email : {datatoken.contact}</p>
              <p >Birthday : {datatoken.birthday}</p>
            </div>



          </div>
        </Grid>
{/* <Grid item xs={12} xl={6} sm={6} >
<div className="profile-home-container">
          <span className="pro">PRO</span>
          <img className="round" src={datatoken.imgUrl ? datatoken.imgUrl : 'https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png'} alt="user" />
          <h3>Ricky Park</h3>
          <h6>New York</h6>
          <p>User interface designer and <br /> front-end developer</p>
          <div className="buttons">
            <button className="primary">
              Message
            </button>
            <button className="primary ghost">
              Following
            </button>
          </div>
          
        </div>
        </Grid> */}


        <Grid item xs={12} xl={6} sm={6}>
          <div className="home-card">
            <div className="home-card-header">
              <h1>Bookings</h1>
            </div>
            <div className="home-card-body">
              <p className="name" >No Bookings As Of Now</p>

            </div>


          </div>
        </Grid>

        <Grid item xs={12} xl={6} sm={6}>
          <div className="home-card">
            <div className="home-card-header">
              <h1>Wellness Record</h1>
            </div>
            <div className="home-card-body">
              <p className="name" >Your Wellness Status is </p>

            </div>


          </div>
        </Grid>

        <Grid item xs={12} xl={6} sm={6}>
          <div className="home-card">
            <div className="home-card-header">
              <h1>Fitness Record</h1>
            </div>
            <div className="home-card-body">
              <p className="name" >Your Recent Fitness Record :  </p>

            </div>


          </div>
        </Grid>


      </Grid>
    </div>
  )
}

export default Home