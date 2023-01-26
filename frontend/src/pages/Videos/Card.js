import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link,useLocation } from "react-router-dom";
// import styled from "styled-components";
import { format } from "timeago.js";
import './Card.css'



function Card({video}) {

  const path = useLocation().pathname.split("/")[2];
  const [videos, setVideos] = useState([]);



  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <div className='videoCard_Container' 
      // type={type}
      >
        
        <video className='videoCard_Image'
          // type={type}
          src={video.videoUrl}
        />
        <div className='videoCard_Details' 
        // type={type}
        >
          {/* <img className="videoCard_ChannelImage"
            // type={type}
            src={channel.img}
          /> */}
          <div className='videoCard_Texts'>
            <h1 className="videoCard_Title">{video.title}</h1>
            {/* <h2 className="videoCard_ChannelName">{channel.name}</h2> */}
            <div className="videoCard_Info" >{video.views} views • {format(video.createdAt)}</div>
          </div>
          
        </div>
      </div>
    </Link>
  )
}

export default Card