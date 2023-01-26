import React from 'react'
import { Grid } from '@mui/material';
import { Link, useNavigate, useLocation } from "react-router-dom";

function Storekeeper() {
  return (
    <div>
        <Grid container justify="center">
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <header className="header">
                        <Link to="/inventory">
                            <button className='header_button' ><span className="text">Inventory</span></button>
                        </Link>
                        <Link to="/managebooking">
                            <button className='header_button' ><span className="text">Bookings</span></button>
                            </Link>
                            <Link to="/inventorylist">
              <button className='header_button' ><span className="text">Inventory List</span></button>
            </Link>
                        {/* <Link to="/storekeepers">
                            <button className='header_button'><span className="text">Storekeepers</span></button>
                        </Link>
                        <Link to="/team">
                            <button className='header_button'><span className="text">Team Creation</span></button>
                        </Link> */}

                    </header>
                </Grid>
            </Grid>
    </div>
  )
}

export default Storekeeper