import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';

function Create_Team({ setOpenAchievement }) {
    const path = useLocation().pathname.split("/")[2];
    const [achievement, setAchievement] = useState([]);
    const [selectedYear, setSelectedYear] = useState('2023');

    const handleChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        await axios.post(`http://localhost:3001/account/achievement/${path}`,
            {
                achievement: achievement,
                year : selectedYear
            })

        setOpenAchievement(false)

    }

    return (
        <div className="UploadContainer">
            <div className="Wrapper">
                <div className="Close" onClick={() => setOpenAchievement(false)}>X</div>
                <h1 className="Title">Add a New Achievement</h1>
                <label className="Label">Achievement:</label>

                <textarea className="Desc"
                    placeholder="Description"
                    name="desc"
                    rows={8}
                    onChange={(e) => setAchievement(e.target.value)}
                />

                <label htmlFor="color-select">Select a store:</label>
                <select id="color-select" value={selectedYear} onChange={handleChange}>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                </select>

                <button className="Button" onClick={handleUpload}>Add Achievement</button>
            </div>

            {openAchievement && <Add_Achievement setOpenAchievement={setOpenAchievement} />}
        </div>
    )
}

export default Create_Team