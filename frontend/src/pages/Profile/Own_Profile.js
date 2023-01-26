import React from 'react'
import { useSelector } from "react-redux"

function Own_Profile() {

const {currentUser} = useSelector((state) => state.userLogin);
// const { userInfo } = userLogin;

  return (
    <div>Own_Profile</div>
  )
}

export default Own_Profile