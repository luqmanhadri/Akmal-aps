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

import './PersonalInfo.css'

const PersonalInfo = ({ formData, setFormData, page, setPage, x, setX }) => {

    let navigate = useNavigate()
    const [image, setImage] = useState(undefined);
    // const [imageUrl, setImageUrl] = useState("");
    // const [imgPerc, setImgPerc] = useState(0);
    // const [imageUrl, setImageUrl] = useState("");


    // const uploadFile = (file, urlType) => {
    //     const storage = getStorage(app);
    //     const fileName = new Date().getTime() + file.name;
    //     const storageRef = ref(storage, fileName);
    //     const uploadTask = uploadBytesResumable(storageRef, file);

    //     uploadTask.on(
    //         "state_changed",
    //         (snapshot) => {
    //             const progress =
    //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //             urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : console.log("Something wrong");
    //             switch (snapshot.state) {
    //                 case "paused":
    //                     console.log("Upload is paused");
    //                     break;
    //                 case "running":
    //                     console.log("Upload is running");
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         },
    //         (error) => { },
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 // setImageUrl(downloadURL)
    //                 // setFormData.imageUrl(downloadURL)
    //                 setFormData({ ...formData, imgUrl: downloadURL })


    //             });
    //         }
    //     );
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

    // useEffect(() => {
    //     image && uploadFile(image, "imgUrl");
    // }, [image]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imageUrl = (image && await uploadFile(image, "imgUrl"));
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
                    imgUrl: imageUrl,
                    role: formData.role,
                    contact: formData.contact,
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

                            sx={{ width: 120, height: 120, cursor: 'pointer' }}
                        />
                    </label>


                    <MDBCol lg="6" className="text-center">
                        <label >Name : </label>
                        <input className='signup_input'
                            type="text"
                            placeholder="Enter your full name..."
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}

                        />



                        <label>Age : </label>
                        <input className='signup_input'
                            type="text"
                            placeholder="Age"
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />


                        {formData.role === "athlete" ?
                            (<> <label>Birthday : </label>
                                <input className='signup_input'
                                    type="date"
                                    placeholder="Enter your birthday..."
                                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                                /></>) : (<></>)}

                        {formData.role === "athlete" ? (
                            <>
                                <label>Height : </label>
                                <input className='signup_input'
                                    type="number"
                                    placeholder="Height (cm)"
                                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                />
                            </>) : (<div></div>)}

                        <label>Gender : </label>
                        <select
                            className='signup_input'
                            placeholder="State"
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>

                        </select>

                    </MDBCol>

                    <MDBCol lg={6} className="text-center">
                        {formData.role === "athlete" ?
                            (<><label>Weight : </label>
                                <input className='signup_input'
                                    type="number"
                                    placeholder="Weight (kg)"
                                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                /></>) : (<></>)}

                        {formData.role !== "storekeeper" ?
                            (<><label>Sport : </label>
                                <input className='signup_input'
                                    type="text"
                                    placeholder="Sport"
                                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                                /></>) :
                            (<> </>)}

                        {formData.role === "storekeeper" ?
                            (<><label>Store : </label>
                                <select
                                    className='signup_input'
                                    placeholder="Store"
                                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}>
                                    <option value="Pusat Sukan UM">Pusat Sukan UM</option>
                                    <option value="Tasik Universiti">Tasik Universiti</option>
                                </select>
                            </>) :
                            (<> </>)}


                        <label>Email : </label>
                        <input className='signup_input'
                            type="text"
                            placeholder="Email"

                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        <label>State : </label>
                        <select
                            className='signup_input'
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

                 

                    <MDBRow>


                        <MDBCol className='text-center' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


                            <MDBRow>
                                <button className='btn btn-primary'

                                    onClick={handleSubmit}
                                    style={{ margin: '5px' }}
                                >Sign Up</button>
                            </MDBRow>

                            <MDBRow>
                                <button className='btn btn-danger'
                                    style={{ margin: '5px' }}
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
            </MDBContainer> */}


            <div class="login-box-container">

            <div class="login-box">
            
                <h2>Personal Info</h2>
                
                <div className="signup_form">

                <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <input
                            accept="image/*"
                            id="profilePhoto"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={(event) => setImage(event.target.files[0])}

                        />
                        <Avatar

                            sx={{ width: 100, height: 100, cursor: 'pointer' }}
                        />
                    </label>
                    
                <div class="row" style={{marginTop: '50px'}}>
        <div class="col-lg-6 col-xs-12" >
                    
                    <div class="user-box">


                        <input className='signup_input'
                            type="text"

                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}

                        />
                        <label >Full Name : </label>
                    </div>

                    <div class="user-box">


                        <input className='signup_input'
                            type="number"

                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />
                        <label >Age: </label>
                    </div>

                    {formData.role === "storekeeper" ?
                        (<>
                            <div class="user-box">
                                <select
                                    className='signup_input'
                                    placeholder="Store"
                                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}>
                                    <option value="Pusat Sukan UM">Pusat Sukan UM</option>
                                    <option value="Tasik Universiti">Tasik Universiti</option>
                                </select>
                                <label>Store : </label>
                            </div>
                        </>) :
                        (<> </>)}

                    <div class="user-box">


                        <input className='signup_input'
                            type="number"

                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        />
                        <label >Contact Number: </label>
                    </div>

                    

                    {formData.role === "athlete" ?
                        (<>
                            <div class="user-box">


                                <input className='signup_input'
                                    type="date"

                                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                                />
                                <label>Birthday : </label>
                            </div>


                        </>) : (<></>)}

                    {formData.role === "athlete" ?
                        (<>
                            <div class="user-box">


                                <input className='signup_input'
                                    type="number"

                                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                                />
                                <label>Height : </label>
                            </div>


                        </>) : (<></>)}

                   

                        </div>


                        <div class="col-lg-6 col-xs-12" >
                    <div class="user-box">

                        <select
                            className='signup_input'

                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>

                        </select>
                        <label>Gender : </label>
                    </div>

                    {formData.role !== "storekeeper" ?
                        (<>
                            <div class="user-box">
                                <input className='signup_input'
                                    type="text"

                                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                                />
                                <label>Sport : </label>
                            </div>
                        </>) :
                        (<> </>)}

                    

                    <div class="user-box">

                    <input className='signup_input'
                            type="text"
                            

                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                         <label>Email : </label>
                    </div>


                    <div class="user-box">

                        <select
                            className='signup_input'
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
                        <label>State : </label>
                    </div>

                    {formData.role === "athlete" ?
                        (<>
                            <div class="user-box">


                                <input className='signup_input'
                                    type="number"

                                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                />
                                <label>Weight : </label>
                            </div>


                        </>) : (<></>)}

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
        // </motion.div>
    );
};

export default PersonalInfo