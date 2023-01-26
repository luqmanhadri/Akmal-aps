// import { motion } from "framer-motion";
import React, { useState, useContext, useEffect } from 'react'
import { Avatar } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import Cookies from 'js-cookie';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import './Register.css'
import app from '../../firebase/firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    MDBCol,
    MDBContainer,
    MDBRow
} from 'mdb-react-ui-kit';

import './Register.css'

const AthleteInfo = ({ formData, setFormData, page, setPage, x, setX }) => {

    let navigate = useNavigate()
    const [image, setImage] = useState(undefined);
    // const [imageUrl, setImageUrl] = useState("");
    const [imgPerc, setImgPerc] = useState(0);


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
                    // setImageUrl(downloadURL)
                    // setFormData.imageUrl(downloadURL)
                    setFormData({ ...formData, imgUrl: downloadURL })


                });
            }
        );
    };

    useEffect(() => {
        image && uploadFile(image, "imgUrl");
    }, [image]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3001/account",
                {
                    username: formData.username,
                    password: formData.password,
                    name: formData.name,
                    age: formData.age,
                    birthday: formData.birthday,
                    height: formData.height,
                    weight: formData.weight,
                    sport: formData.sport,
                    email: formData.email,
                    gender: formData.gender,
                    state: formData.state,
                    imgUrl: formData.imageUrl,
                    role: formData.role,
                    approved: false
                });

            const token = JSON.stringify(res.data)
            Cookies.set('access_token', token, { expires: 7 });
            navigate("/home")
        } catch (err) {
            console.log("Unable to register")
        }
    };
    return (
        // <motion.div
        //   initial={{ x: x }}
        //   transition={{ duration: 1 }}
        //   animate={{ x: 0 }}
        //   className="card"
        // >
        <div >

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

                            sx={{ width: 120, height: 120, cursor: 'pointer' }}
                        />
                    </label>


                    <MDBCol lg="6" className="text-center">
                        <h5 >Name : </h5>
                        <input className='register_input'
                            type="text"
                            placeholder="Enter your full name..."
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}

                        />

                        
                        
                            <h5>Age : </h5>
                                <input className='register_input'
                                    type="text"
                                    placeholder="Age"
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                />


                        {formData.role === "athlete" ?
                            (<> <h5>Birthday : </h5>
                                <input className='register_input'
                                    type="date"
                                    placeholder="Enter your birthday..."
                                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                                /></>) : (<></>)}

                        {formData.role === "athlete" ? (
                            <>
                                <h5>Height : </h5>
                                <input className='register_input'
                                    type="number"
                                    placeholder="Height (cm)"
                                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                />
                            </>) : (<div></div>)}

                             <h5>Gender : </h5>
            <select
                className='register_input'
                placeholder="State"
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>

            </select>
                        
                    </MDBCol>

                    <MDBCol lg={6} className="text-center">
                        {formData.role === "athlete" ?
                            (<><h5>Weight : </h5>
                                <input className='register_input'
                                    type="number"
                                    placeholder="Weight (kg)"
                                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                /></>) : (<></>)}

                        {formData.role !== "storekeeper" ?
                            (<><h5>Sport : </h5>
                                <input className='register_input'
                                    type="text"
                                    placeholder="Sport"
                                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                                /></>) :
                            (<> </>)}

                        {formData.role === "storekeeper" ?
                            (<><h5>Store : </h5>
                                <select
                                    className='register_input'
                                    placeholder="Store"
                                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}>
                                    <option value="Pusat Sukan UM">Pusat Sukan UM</option>
                                    <option value="Tasik Universiti">Tasik Universiti</option>
                                </select>
                            </>) :
                            (<> </>)}


                        <h5>Email : </h5>
                        <input className='register_input'
                            type="text"
                            placeholder="Email"

                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

<h5>State : </h5>
            <select
                className='register_input'
                placeholder="State"
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}>
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

                    {/* <MDBRow>
                       

                        <MDBCol className='text-center' style={{ display: 'flex', justifyContent: 'center' }}>
                            <MDBRow>
                                <button className='btn btn-primary' style={{ width: '50%', margin: '0 auto' }}
                                    onClick={handleSubmit}>Update Profile</button>
                            </MDBRow>

                            <MDBRow>
                            <button className='btn btn-primary' style={{ width: '50%', margin: '0 auto' }}

                onClick={handleSubmit}

            >Sign Up</button>
            </MDBRow>


            <br />
            <MDBRow>
            <button className='btn btn-danger'
            style={{ width: '50%', margin: '0 auto' }}
                onClick={() => {
                    setPage(page - 1);
                    setX(-1000);
                }}
            >
                Previous
            </button>
            </MDBRow>

                        </MDBCol>
                    </MDBRow> */}

<MDBRow>
             

             <MDBCol className='text-center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 

                 <MDBRow>
                 <button className='btn btn-primary' 

     onClick={handleSubmit}
     style={{margin : '5px'}}
 >Sign Up</button>
 </MDBRow>

 <MDBRow>
 <button className='btn btn-danger'
 style={{margin : '5px'}}
     onClick={() => {
         setPage(page - 1);
         setX(-1000);
     }}
 >
     Previous
 </button>
 </MDBRow>

             </MDBCol>
         </MDBRow>

                </MDBRow>
            </MDBContainer>
            {/* <h1 style={{ textAlign: 'center' }}>Personal Info</h1>

            <label >
                <input
                    accept="image/*"
                    id="profilePhoto"
                    type="file"
                    style={{ display: 'none' }}

                    // onChange={handleImage}
                    onChange={(event) => setImage(event.target.files[0])}

                />
                <Avatar
                    //   src={currentUser.imgURL}
                    className='avatar'
                    sx={{ width: 75, height: 75, cursor: 'pointer' }}
                />
            </label>



            <h5>Name : </h5>
            <input
                className='register_input'
                type="text"
                placeholder='Full name'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required={true}
            />


            {formData.role !== "storekeeper" ?
                (<> <h5>Age : </h5>
                    <input className='register_input'
                        type="text"
                        placeholder="Age"
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    /></>) : (<></>)}



            {formData.role === "athlete" ?
                (<> <h5>Birthday : </h5>
                    <input className='register_input'
                        type="date"
                        placeholder="Enter your birthday..."
                        onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                    /></>) : (<></>)}

            <h5>Gender : </h5>
            <select
                className='register_input'
                placeholder="State"
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>

            </select>


            <h5>State : </h5>
            <select
                className='register_input'
                placeholder="State"
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}>
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

            {formData.role === "athlete" ? (
                <>
                    <h5>Height : </h5>
                    <input className='register_input'
                        type="number"
                        placeholder="Height (cm)"
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    />
                </>) : (<div></div>)
            }


            {formData.role === "athlete" ?
                (<><h5>Weight : </h5>
                    <input className='register_input'
                        type="number"
                        placeholder="Weight (kg)"
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    /></>) : (<></>)}



            {formData.role !== "storekeeper" ?
                (<><h5>Sport : </h5>
                    <input className='register_input'
                        type="text"
                        placeholder="Sport"
                        onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                    /></>) :
                (<> </>)}


            {formData.role === "storekeeper" ?
                (<><h5>Store : </h5>
                    <select
                        className='register_input'
                        placeholder="Store"
                        onChange={(e) => setFormData({ ...formData, sport: e.target.value })}>
                        <option value="Pusat Sukan UM">Pusat Sukan UM</option>
                        <option value="Tasik Universiti">Tasik Universiti</option>
                    </select>
                </>) :
                (<> </>)}


            <h5>Email : </h5>
            <input className='register_input'
                type="text"
                placeholder="Email"

            /> */}


        </div>
        // </motion.div>
    );
};

export default AthleteInfo