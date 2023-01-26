import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import { dislike, fetchSuccess, like } from "../../redux/videoSlice";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import './Video.css'
import Cookies from 'js-cookie';
import DeleteIcon from '@mui/icons-material/Delete';


function Video() {

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  // const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];
  const token = Cookies.get('access_token');

  const [user, setUser] = useState({});
  const [video, setVideo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`http://localhost:3001/videos/find/${path}`);
        const channelRes = await axios.get(
          `http://localhost:3001/account/find/${videoRes.data.userId}`
        );
        const addViews = await axios.put(
          `http://localhost:3001/videos/view/${path}`
        );
        setUser(channelRes.data);
        setVideo(videoRes.data);
        console.log(addViews)
        // dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };
    fetchData();
  }, [path]); // Note the empty array here

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3001/videos/${path}`
      
    )
  }

  // const handleLike = async () => {
  //   await axios.put(`/account/like/${currentVideo._id}`);
  //   dispatch(like(currentUser._id));
  // };
  // const handleDislike = async () => {
  //   await axios.put(`/account/dislike/${currentVideo._id}`);
  //   dispatch(dislike(currentUser._id));
  // };
  
  return (
    <div>
        <div className='video_container'>
        <div className='video_content'>
        <div className='video_wrapper'>
        <video className="video_videoFrame" src={video.videoUrl} controls/>
          </div>
         
          <h1 className='video_title'>{video.title}</h1>
          <button className="video_buttons" onClick={handleDelete}><DeleteIcon/></button>
          
          <div className='video_details'>
            <span className='video_info'>
              {video.views} views • {format(video.createdAt)}
            </span>
            {/* <div className='video_buttons'>
            <div className='button' onClick={handleLike}>
              {video.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {video.likes?.length}
            </div>
            <div className='button' onClick={handleDislike}>
              {video.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </div>
            </div> */}

          </div>
          <hr className='hr' />
          <div className='video_channel'>
          <div className='video_channelInfo' >
            <img className="video_image" src={user.imgUrl} />
            <div className='video_channelDetail' >
              <span className='video_channelName' >{user.name}</span>
              <p className='video_description'>{video.desc}</p>
            </div>
          </div>
          
        </div>
        {/* <Hr /> */}
        {/* <Comments videoId={currentVideo._id} /> */}
          </div>
            
        </div>
    </div>
  )
}

export default Video