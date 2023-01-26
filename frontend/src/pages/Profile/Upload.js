import React, { useEffect, useState } from "react";
// import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Upload.css'
import { useDispatch, useSelector } from 'react-redux'
import { Snackbar } from "@mui/material";


const Upload = ({ setOpen }) => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState([]);
  const [imgUrl1, setImgUrl] = useState("");
  const [videoUrl1, setVideoUrl] = useState("");
  const [openMB, setOpenMB] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const id = currentUser._id

  const navigate = useNavigate()

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => { },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Set the download URL for the image or video based on the 'urlType' argument
          if (urlType === "imgUrl") {
            setImgUrl(downloadURL);
          } else if (urlType === "videoUrl") {
            setVideoUrl(downloadURL);
          }
        });
      }
    );
  }


  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = 
    await axios.post("http://localhost:3001/videos",
      {
        userId: id,
         imgUrl : imgUrl1,
         videoUrl : videoUrl1,
        title: title,
        desc: desc
      })

    setOpen(false)
    navigate(`/video/${res.data._id}`)
    // res.status===200 && navigate(`/videos/${res.data._id}`)
  }

  return (
    <div className="UploadContainer">
      <div className="Wrapper">
        <div className="Close" onClick={() => setOpen(false)}>X</div>
        <h1 className="Title">Upload a New Video</h1>
        <label className="Label">Video:</label>
        {videoPerc > 0 ? (
          "Uploading:" + videoPerc
        ) : (
          <input className="Input"
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <input className="Input"
          type="text"
          placeholder="Title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea className="Desc"
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={(e) => setDesc(e.target.value)}
        />

        <label className="Label">Image:</label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <input className="Input"
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <button className="Button" onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
};

export default Upload;