import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { convertTime } from "../../utils/convertTime";
import Button from "@mui/material/Button";
import "./Schedule.css";
import DeleteIcon from '@mui/icons-material/Delete';

function Schedule() {
  const [listofEvent, setlistofEvent] = useState([]);
  const addEvent = useNavigate();

  //let history = useHistory();
  useEffect(() => {
    axios.get("http://localhost:3001/event").then((response) => {
      setlistofEvent(response.data);
      //console.log(response.data)
    });
  }, []);

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/event/delete/${id}`)
      .then(() => {
        window.location.reload(false)
      });
  };

  return (
    <div className="App">
      <Button
        className="addEventButton"
        variant="contained"
        onClick={() => {
          addEvent("addevent");
        }}
      >
        + Add Event
      </Button>

      {listofEvent.map((value, key) => {
        return (
          <div className="Event" key={key}>
            <div className="Date">{convertTime(value.date)} </div>
            <div className="Title">{value.title} </div>
            <div className="Location">
              <h8 className="lokasi">{value.location}</h8>
              {" "}
              <DeleteIcon
                className="buttons"
                onClick={() => {
                  deletePost(value._id);
                }}
              >
                {" "}
                Delete
              </DeleteIcon>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Schedule;
