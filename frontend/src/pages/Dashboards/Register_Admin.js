import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Avatar, Grid } from '@mui/material';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject
} from "firebase/storage";
import app from '../../firebase/firebase';
import { toast } from "react-toastify";

function Register_Admin() {
    const path = useLocation().pathname.split("/")[2];
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [logo, setLogo] = useState("");
    const [avatarLogo, setAvatarLogo] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showErrorUsername, setShowErrorUsername] = useState(false);
    const [showErrorPassword, setShowErrorPassword] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        checkPasswordMatch(password, e.target.value);
    }

    const checkPasswordMatch = (password, confirmPassword) => {
        if (password !== confirmPassword) {
            setPasswordMatch(false);
        } else {
            setPasswordMatch(true);
        }
    }

    // const handleChange = (event) => {
    //     setSelectedYear(event.target.value);
    // };
    const handleChange = (event) => {
        setAvatarLogo(URL.createObjectURL(event.target.files[0]));

    };

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

    const handleUpload = async () => {

        const logoUrlUpload = await uploadFile(logo, "imgUrl");

        await axios.post("http://localhost:3001/account/",
            {
                imgUrl: logoUrlUpload,
                username: username,
                password: password,
                name: name,
                role: "admin",
                approved: true,
                contact: contact,
                email: email
            })

        toast.success("Admin account added successfully!", { position: toast.POSITION.TOP_CENTER });
        window.location.reload()
    }

    return (
        <div>
            <Grid container justify="center" >
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <header className="header">
                        <Link to="/admin">
                            <button className='header_button' >
                                <span className="text">Manage Requests</span></button>
                        </Link>
                        <Link to="/announcement">
                            <button className='header_button' >
                                <span className="text">Announcement</span></button>
                        </Link>
                        <Link to="/createteam">
                            <button className='header_button' >
                                <span className="text">Create Team</span></button>
                        </Link>
                        <Link to="/registeradmin">
                            <button className='header_button' >
                                <span className="text">Register Admin</span></button>
                        </Link>


                    </header>
                </Grid>
            </Grid>

            <div class="register-box" style={{ background: 'linear-gradient(#80FFDB, #5390D9)' }}>
                <h2 style={{ color: 'black' }}>Register Admin</h2>
                <div className="signup_form">

                    <label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <input
                            accept="image/*"
                            id="profilePhoto"
                            type="file"
                            style={{ display: 'none' }}
                            //  value={profileDetails.imgUrl}
                            onChange={(event) => {
                                setLogo(event.target.files[0]);
                                handleChange(event)
                            }
                            }

                        />
                        <Avatar
                            // src={imageUrl}
                            src={avatarLogo}
                            sx={{ width: 100, height: 100, cursor: 'pointer' }}
                        />
                    </label>

                    <div class="row" style={{ marginTop: '50px' }}>
                    <div class="col-lg-6 col-xs-12" >
                    <div class="form-box">

                        <input
                            type="text"
                            className="signup_input"
                            value={username}
                            style={{ color: 'black' }}
                            onChange={(e) => {
                                setUsername(e.target.value );
                                if (e.target.value.length >= 6) {
                                    setShowErrorUsername(false);
                                } else {
                                    setShowErrorUsername(true);
                                }
                            }}
                        />
                        <label
                        style={{ color: 'black' }}>Username</label>
                    </div>

                    {showErrorUsername && username.length < 6 && (
                        <p style={{ color: "red" }}>Username must be at least 6 characters</p>
                    )}

                    <div class="form-box">


                        <input
                            type={showPassword ? "text" : "password"}
                            className="signup_input"

                            value={password}
                            style={{ color: 'black' }}
                            // onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            onChange={(e) => {
                                setPassword( e.target.value);
                                if (e.target.value.length >= 8) {
                                    setShowErrorPassword(false);
                                } else {
                                    setShowErrorPassword(true);
                                }
                            }}
                        />
                        <label
                        style={{ color: 'black' }}>Password : </label>
                        
                    </div>


                    

                    {showErrorPassword && password.length < 8 && (
                        <p style={{ color: 'red' }}
                        >Password must be at least 8 characters</p>)}

                    <div class="form-box">

                        <input
                            type={showPassword ? "text" : "password"}
                            className="signup_input"
                            style={{ color: 'black' }}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}

                        />
                        <label 
                        style={{ color: 'black' }}>Confirm Password : </label>
                        <button className="btn btn-success"
                            style={{ marginBottom: '20px' }}
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}
</div>

<div class="col-lg-6 col-xs-12" >
                    <div class="form-box" >

                        <input
                            style={{ color: 'black' }}

                            className="signup_input"
                            // value={formData.username}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <label style={{ color: 'black' }}>Full Name</label>
                    </div>

                    <div class="form-box">

                        <input
                            type="text"
                            className="signup_input"
                            value={contact}
                            style={{ color: 'black' }}
                            onChange={(e) => 
                                setContact(e.target.value )
                            }
                        />
                        <label
                        style={{ color: 'black' }}>Contact</label>
                    </div>

                    <div class="form-box">

                        <input
                            type="text"
                            className="signup_input"
                            value={email}
                            style={{ color: 'black' }}
                            onChange={(e) => 
                                setEmail(e.target.value )
                            }
                        />
                        <label
                        style={{ color: 'black' }}>Email</label>
                    </div>
                    </div>
                    </div>

                    <button className='btn'
                        style={{ background: 'black', color: 'white' }}
                        onClick={() => {
                            if (!name || !logo) {
                                toast.error("Please fill all fields", { position: toast.POSITION.TOP_CENTER });
                                return;
                            };
                            handleUpload()
                        }}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Register_Admin