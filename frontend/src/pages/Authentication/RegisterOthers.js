import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import './Register.css'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBIcon,
  MDBInputGroup,
  MDBValidationItem
} from 'mdb-react-ui-kit';
import imageReg from '../../images/lcw (1).png'
import SignUp from './SignUp';
import AthleteInfo from './AthleteInfo';
import StorekeeperInfo from './StorekeeperInfo';

function RegisterOthers() {

  const [page, setPage] = useState(0);

  const [x, setX] = useState(0);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    age: "",
    gender: "",
    state: "",
    birthday: "",
    height: "",
    weight: "",
    sport: "",
    email: "",
    imgUrl: "",
    role: ""
   
  });

  const componentList = [
    <SignUp
      formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
      x={x}
      setX={setX}
    />,
    <AthleteInfo
      formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
      x={x}
      setX={setX}
    />,
    <StorekeeperInfo
      formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
      x={x}
      setX={setX}
    />
  ];

  return (
    <div>
      <div className='register_body' >
        <div className="progress-bar">
          {
            <div
              style={{
                width:
                  page === 0
                    ? "50%"
                    : "100%",
              }}
            ></div>
          }
        </div>

        <div className="body">{componentList[page]}</div>
      </div>
    </div>
  );

}

export default RegisterOthers