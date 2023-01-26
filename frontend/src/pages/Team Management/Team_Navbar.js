import React from 'react'
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function Team_Navbar() {

    const token = Cookies.get('access_token');
    const datatoken = JSON.parse(token)

    return (
        <div>
            <Grid container justify="center">
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <header className="header">
                        <Link to={`/team/${datatoken.sport}`}>
                            <button className='header_button' ><span className="text">Dashboard</span></button>
                        </Link>

                        <Link to={`/player_database/${datatoken.sport}`}>
                            <button className='header_button'  ><span className="text">Player Database</span></button>
                        </Link>
                        <Link to={`/team_sheet/${datatoken.sport}`}>
                            <button className='header_button' ><span className="text">Team Sheet</span></button>
                        </Link>

                    </header>
                </Grid>
            </Grid>
        </div>
    )
}

export default Team_Navbar