import React from 'react'
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import './Team_Dashboard.css'
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Team_Navbar from './Team_Navbar';

function Team_Dashboard() {
    let navigate = useNavigate();

    const token = Cookies.get('access_token');
    const datatoken = JSON.parse(token)
    return (
        <div>
            <Team_Navbar/>

            <div className='dashboard '>

                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} md={8}>
                        <h1>Try</h1>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Team_Dashboard