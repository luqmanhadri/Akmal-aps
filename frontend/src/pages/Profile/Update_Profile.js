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
        urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : console.log("Something wrong");
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
          setImageUrl(downloadURL)


        });
      }
    );
  };

  useEffect(() => {
    image && uploadFile(image, "imgUrl");
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:3001/account/${datatoken._id}`,
      {
        name: name,
        age: age,
        birthday: birthday,
        height: height,
        weight: weight,
        sport: sport,
        email: email,

        imgUrl: imageUrl
      }
    )
    navigate(`/profile/${datatoken._id}`)
  };





  return (
    <div >


      {/* <form className='register_container'
      
        >
          <label>
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

          <h5 className='mt-3'>Name : </h5>
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
            placeholder="Enter your contact..."
            defaultValue={profileDetails.contact}
            onChange={(event) => setContact(event.target.value)}
          />

          <button className='btn btn-primary' onClick={handleSubmit}>Update Profile</button>
          
        </form> */}

      <MDBContainer
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
            {/* <button className='btn btn-primary' 
          style={{ display: 'flex', justifyContent: 'center', 
          alignItems: 'center', width: '50%'}}
          onClick={handleSubmit}
          >Update Profile</button> */}

            <MDBCol className='text-center'>
              <button className='btn btn-primary' style={{ width: '50%' }}
                onClick={handleSubmit}>Update Profile</button>
            </MDBCol>
          </MDBRow>

        </MDBRow>
      </MDBContainer>
      {/* <div className="form">
          <div className="form-body">
              <div className="username">
                  <label className="form__label" for="firstName">First Name </label>
                  <input className="form__input" type="text" id="firstName" placeholder="First Name"/>
              </div>
              <div className="lastname">
                  <label className="form__label" for="lastName">Last Name </label>
                  <input  type="text" name="" id="lastName"  className="form__input"placeholder="LastName"/>
              </div>
              <div className="email">
                  <label className="form__label" for="email">Email </label>
                  <input  type="email" id="email" className="form__input" placeholder="Email"/>
              </div>
              <div className="password">
                  <label className="form__label" for="password">Password </label>
                  <input className="form__input" type="password"  id="password" placeholder="Password"/>
              </div>
              <div className="confirm-password">
                  <label className="form__label" for="confirmPassword">Confirm Password </label>
                  <input className="form__input" type="password" id="confirmPassword" placeholder="Confirm Password"/>
              </div>
          </div>
          <div class="footer">
              <button type="submit" class="btn">Register</button>
          </div>
      </div>       */}


    </div>




  )
}

export default Update_Profile