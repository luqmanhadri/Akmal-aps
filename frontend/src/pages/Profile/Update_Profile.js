import {
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  MDBCol,
  MDBContainer,
  MDBRow
} from 'mdb-react-ui-kit';
import * as Yup from "yup";
import './Update_Profile.css'

import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import { update_user, update_profile } from "../../redux/userSlice"
import app from '../../firebase/firebase';
import Textfield from "../../components/AddEvent/Textfield";
import SelectWrapper from '../../components/AddEvent/Dropdown';
import { Formik, Form } from "formik";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import DateTimePicker from "../../components/AddEvent/DateTimePicker";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject
} from "firebase/storage";

import Cookies from 'js-cookie';

const Update_Profile = () => {

  const { currentUser } = useSelector((state) => state.user);
  const [profile, setProfile] = useState({});
  const [profileDetails, setProfileDetails] = useState({});
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [imgPerc, setImgPerc] = useState(0);

  const [name, setName] = useState(profileDetails.name);
  const [age, setAge] = useState(profileDetails.age);
  const [birthday, setBirthday] = useState(profileDetails.birthday);
  const [height, setHeight] = useState(profileDetails.height);
  const [sport, setSport] = useState(profileDetails.sport);
  const [email, setEmail] = useState(profileDetails.email);
  const [weight, setWeight] = useState(profileDetails.weight);
  const [state, setState] = useState(profileDetails.state);
  const [gender, setGender] = useState(profileDetails.gender);
  const [contact, setContact] = useState(profileDetails.contact);
  
  const [image, setImage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(profileDetails.imgUrl);

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






  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axios.get(`http://localhost:3001/account/find/${datatoken._id}`);


        setProfileDetails(accountRes.data);


      } catch (err) { }
    }
    fetchData();
  })

  // const uploadFile = (file, urlType) => {
  //   const storage = getStorage(app);
  //   const fileName = new Date().getTime() + file.name;
  //   const storageRef = ref(storage, fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : console.log("Something wrong");
  //       switch (snapshot.state) {
  //         case "paused":
  //           console.log("Upload is paused");
  //           break;
  //         case "running":
  //           console.log("Upload is running");
  //           break;
  //         default:
  //           break;
  //       }
  //     },
  //     (error) => { },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setImageUrl(downloadURL)


  //       });
  //     }
  //   );
  // };




  // const uploadFile = (file, urlType) => {
  //   return new Promise((resolve, reject) => {
  //     const storage = getStorage(app);
  //     const fileName = new Date().getTime() + file.name;
  //     const storageRef = ref(storage, fileName);
  //     const uploadTask = uploadBytesResumable(storageRef, file);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : console.log("Something wrong");
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //           default:
  //             break;
  //         }
  //       },
  //       (error) => {
  //         reject(error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           // setImageUrl(downloadURL);
  //           resolve(downloadURL);
  //         });
          
  //       }
  //     );
  //   });
  // };


  const uploadFile = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    // const storageRef = storage.ref(fileName);
    const storageRef = ref(storage, fileName);
    // const uploadTask = storageRef.put(file);
    const uploadTask = uploadBytesResumable(storageRef, file);
   
    return new Promise((resolve, reject) => {
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
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
            (error) => {
                reject(error);
            },
            // async () => {
            //     const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            //     resolve(downloadURL);
            // }
            () => {
                      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // setImageUrl(downloadURL);
                        resolve(downloadURL);
                      });
                      
                    }
        );
    });
  }

  const deleteFileFromStorage = async (url) => {
    const storage = getStorage();
    // const fileName = url.split('/').pop();
    // console.log(fileName)
  
  // Create a reference to the file to delete
  const desertRef = ref(storage, url);
  
  // Delete the file
  deleteObject(desertRef).then(() => {
    // File deleted successfully
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
  };

 
  // useEffect(() => {
  //   image && uploadFile(image, "imgUrl");
  // }, [image]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    // image && (await uploadFile(image, "imgUrl"));
    const previousImageUrl = datatoken.imgUrl;
    const imageUrl = (image && await uploadFile(image, "imgUrl"));
    
    const res = await axios.patch(`http://localhost:3001/account/${datatoken._id}`,
      {
        name: name,
        age: age,
        birthday: birthday,
        height: height,
        weight: weight,
        sport: sport,
        email: email,
        state: state,
        gender: gender,
        contact: contact,

        imgUrl: imageUrl
      }
    )
    Cookies.remove('access_token');
    const token = JSON.stringify(res.data)
    Cookies.set('access_token', token, { expires: 7 });
    // await deleteFileFromStorage(previousImageUrl);
    await deleteFileFromStorage(previousImageUrl);
    navigate(`/profile/${datatoken._id}`)
  };



  return (
    <div >


      {/* <MDBContainer
        style={{
          border: '3px solid #9f01ea',
          background: '#fff', width: '60%',
          padding: '30px',
          boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '20px', marginTop: '20px',
        }}>
        <MDBRow>

          <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <input
              accept="image/*"
              id="profilePhoto"
              type="file"
              style={{ display: 'none' }}
              onChange={(event) => setImage(event.target.files[0])}

            />
            <Avatar
              src={profileDetails.imgUrl}
              sx={{ width: 120, height: 120, cursor: 'pointer' }}
            />
          </label>


          <MDBCol lg="6" className="text-center">
            <h5 >Name : </h5>
            <input className='auth_input'
              type="text"
              placeholder="Enter your full name..."
              defaultValue={profileDetails.name}
              onChange={(event) => setName(event.target.value)}

            />


            <h5>Age : </h5>
            <input className='auth_input'
              type="text"
              placeholder="Enter your age..."
              defaultValue={profileDetails.age}
              onChange={(event) => setAge(event.target.value)}
            />

            <h5>Birthday : </h5>
            <input className='auth_input'
              type="date"
              placeholder="Enter your birthday..."
              defaultValue={profileDetails.birthday}
              onChange={(event) => setBirthday(event.target.value)}
            />

            <h5>Height : </h5>
            <input className='auth_input'
              type="number"
              placeholder="Enter your height..."
              defaultValue={profileDetails.height}
              onChange={(event) => setHeight(event.target.value)}
            />
          </MDBCol>

          <MDBCol lg={6} className="text-center">
            <h5>Weight : </h5>
            <input className='auth_input'
              type="number"
              placeholder="Enter your weight..."
              defaultValue={profileDetails.weight}
              onChange={(event) => setWeight(event.target.value)}
            />

            <h5>Sport : </h5>
            <input className='auth_input'
              type="text"
              placeholder="Enter your sport..."
              defaultValue={profileDetails.sport}
              onChange={(event) => setSport(event.target.value)}
            />

            <h5>Email : </h5>
            <input className='auth_input'
              type="text"
              placeholder="Enter your Email..."
              defaultValue={profileDetails.email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <h5>State : </h5>
            <select
              className='auth_input'
              placeholder="State"
              // defaultValue={profileDetails.state}
              value={profileDetails.state}
              onChange={(event) => setState(event.target.value)}>
              <option value="">Select State</option>
              <option value="Kelantan">Kelantan</option>
              <option value="Johor">Johor</option>
              <option value="Melaka">Melaka</option>
              <option value="Negeri Sembilan">Negeri Sembilan</option>
              <option value="Selangor">Selangor</option>
              <option value="WP Kuala Lumpur">WP Kuala Lumpur</option>
              <option value="Perak">Perak</option>
              <option value="Pulau Pinang">Pulau Pinang</option>
              <option value="Kedah">Kedah</option>
              <option value="Perlis">Perlis</option>
              <option value="Terengganu">Terengganu</option>
              <option value="Pahang">Pahang</option>
              <option value="Sabah">Sabah</option>
              <option value="Sarawak">Sarawak</option>
            </select>
            
          </MDBCol>

          <MDBRow>
           

            <MDBCol className='text-center'>
              <button className='btn btn-primary' style={{ width: '50%' }}
                onClick={handleSubmit}>Update Profile</button>
            </MDBCol>
          </MDBRow>

        </MDBRow>
      </MDBContainer> */}

<div class="login-box-container" style={{marginTop: '20px'}}>

<div class="login-box">

    <h2>Personal Info</h2>
    
    <div className="signup_form">

    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <input
                accept="image/*"
                id="profilePhoto"
                type="file"
                style={{ display: 'none' }}
              //  value={profileDetails.imgUrl}
                onChange={(event) => setImage(event.target.files[0])}

            />
            <Avatar
                src={profileDetails.imgUrl}
                sx={{ width: 100, height: 100, cursor: 'pointer' }}
            />
        </label>
        
    <div class="row" style={{marginTop: '50px'}}>
<div class="col-lg-6 col-xs-12" >
        
        <div class="user-box">


            <input className='signup_input'
                type="text"
                defaultValue={profileDetails.name}
                onChange={(e) => setName(e.target.value )}

            />
            <label >Full Name : </label>
        </div>

        <div class="user-box">


            <input className='signup_input'
                type="number"
                defaultValue={profileDetails.age}
                onChange={(e) => setAge( e.target.value )}
            />
            <label >Age: </label>
        </div>

        <div class="user-box">


            <input className='signup_input'
                type="number"
                defaultValue={profileDetails.contact}
                onChange={(e) => setContact(e.target.value )}
            />
            <label >Contact Number: </label>
        </div>

        

        
                <div class="user-box">


                    <input className='signup_input'
                        type="date"
                        defaultValue={profileDetails.birthday}
                        onChange={(e) => setBirthday(e.target.value )}
                    />
                    <label>Birthday : </label>
                </div>
        
                <div class="user-box">


                    <input className='signup_input'
                        type="number"
                        defaultValue={profileDetails.height}
                        onChange={(e) => setHeight(e.target.value )}
                    />
                    <label>Height : </label>
                </div>


           

       

            </div>


            <div class="col-lg-6 col-xs-12" >
        <div class="user-box">

            <select
                className='signup_input'
                value={gender || profileDetails.gender}
                onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>

            </select>
            <label>Gender : </label>
        </div>

       
                <div class="user-box">
                    <input className='signup_input'
                        type="text"
                        defaultValue={profileDetails.sport}
                        onChange={(e) => setSport(e.target.value )}
                    />
                    <label>Sport : </label>
                </div>
         

        

        <div class="user-box">

        <input className='signup_input'
                type="text"
                
                defaultValue={profileDetails.email}
                onChange={(e) => setEmail(e.target.value)}
            />
             <label>Email : </label>
        </div>


        <div class="user-box">

            <select
                className='signup_input'
                value={state || profileDetails.state}
                // defaultValue={profileDetails.state}
                onChange={(e) => setState(e.target.value)}>
                <option value="">Select State</option>
                <option value="Kelantan">Kelantan</option>
                <option value="Johor">Johor</option>
                <option value="Melaka">Melaka</option>
                <option value="Negeri Sembilan">Negeri Sembilan</option>
                <option value="Selangor">Selangor</option>
                <option value="WP Kuala Lumpur">WP Kuala Lumpur</option>
                <option value="Perak">Perak</option>
                <option value="Pulau Pinang">Pulau Pinang</option>
                <option value="Kedah">Kedah</option>
                <option value="Perlis">Perlis</option>
                <option value="Terengganu">Terengganu</option>
                <option value="Pahang">Pahang</option>
                <option value="Sabah">Sabah</option>
                <option value="Sarawak">Sarawak</option>
            </select>
            <label>State : </label>
        </div>

        
                <div class="user-box">


                    <input className='signup_input'
                        type="number"
                        defaultValue={profileDetails.weight}
                        onChange={(e) => setWeight(e.target.value )}
                    />
                    <label>Weight : </label>
                </div>


        </div>




        <button className="signup_button"
            // onClick={() => {
            //     if ((formData.username !== "" && formData.username.length >= 6) && formData.password !== ""
            //         && formData.confirmPassword !== "" && formData.role !== "") {
            //         setPage(page + 1);
            //         setX(1000);
            //         console.log(formData)
            //     } else {
            //         alert("Please fill all the fields")
            //     }
            // }}
            onClick={handleSubmit}
        >

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Submit
        </button>
        </div>
    </div>
</div>

</div>
      


    </div>




  )
}

export default Update_Profile