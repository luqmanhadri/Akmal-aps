import React from 'react'
import { Grid } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Team_Navbar from './Team_Navbar';

function Player_DB() {

  const path = useLocation().pathname.split("/")[2];
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const players = await axios.get(`http://localhost:3001/account/sport/${path}`);
        setPlayers(players.data);
      } catch (err) { }
    };
    fetchData();
  }, []);

  let navigate = useNavigate();

  const token = Cookies.get('access_token');
  const datatoken = JSON.parse(token)
  return (
    <div>
      <Team_Navbar />


      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Username</TableCell>
              {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow
                key={player.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {player.name}
                </TableCell>
                <TableCell align="right">{player.position}</TableCell>
                <TableCell align="right">{player.age}</TableCell>
                <TableCell align="right">{player.username}</TableCell>
                {/* <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


    </div>
  )
}

export default Player_DB