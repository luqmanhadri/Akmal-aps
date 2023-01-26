import React from 'react'
import { Grid } from '@mui/material';
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
    MDBCard,
    MDBCardBody,
    MDBCheckbox,
    MDBCardImage,
    MDBCol, MDBContainer, MDBRow 
  } from 'mdb-react-ui-kit';
  import {Checkbox, FormControlLabel} from '@mui/material';

const Player_Selection = ({players, setSelectedProfiles, setOpenSelection, 
  setPlayers,
  selectedProfiles,
  setIsOpen
}) => {

    const [selectedCard, setSelectedCard] = useState(false);

const toggleProfileSelection = (profile) => {
    const updatedPlayers = players.map(p => {
        if (p === profile) {
            p.selected = !p.selected;
        }
        return p;
    });
    setPlayers(updatedPlayers);
}

  return (
    <div>
      {players.map((profile) => {
    return (
       
                <MDBCard className="mb-4 card-hover" key={profile._id} 
                style={{ width: '400px', height: '150px', marginLeft: '30px', 
                borderColor: profile.selected ? 'blue' : 'black',
                borderWidth: profile.selected ? '4px' : '1px',
                borderStyle: 'solid' }}
                onClick={() => {toggleProfileSelection(profile)
                    // setSelectedCard(!selectedCard);
                }}>
                    {/* <MDBCardBody className="text-center"> */}
                    <MDBCardBody className="d-flex align-items-center ">
                        {/* <input 
                            type="checkbox" 
                            checked={profile.selected} 
                            onChange={() => toggleProfileSelection(profile)} 
                        /> */}
                        <MDBCheckbox 
                        className='m-2'
                        checked={profile.selected} 
                        onChange={() => toggleProfileSelection(profile)}
                        />
                        <MDBCardImage
                            src={profile.imgUrl ? profile.imgUrl : 
                                'https://resources.premierleague.com/premierleague/photos/players/250x250/Photo-Missing.png'}
                            alt="avatar"
                            className="rounded-circle m-2"
                            style={{ width: '80px', height: '80px' }}
                            fluid 
                        />
                        <p className="text-muted m-2">{profile.name}</p> 
                    </MDBCardBody>
                </MDBCard>
                
              
    )
})}
<button 
    className="btn btn-danger" 
    onClick={() => setSelectedProfiles(players.filter(p => p.selected))}
> 
    Add Selected Profiles
</button>
    </div>
  )
}

export default Player_Selection