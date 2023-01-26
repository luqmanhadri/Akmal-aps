const express = require("express");
const router = express.Router();
const { Profile } = require("../models");
const {} = require("../controllers/Account")
const {createAthleteProfile, updateAthleteProfile, randomAthleteProfile, getPro} = require("../controllers/Profile")
const { verifyToken } = require("../middlewares/verifyToken");

//create profile
router.post("/", verifyToken, createAthleteProfile)

//update profile
router.put("/:id", verifyToken, updateAthleteProfile)

//get random profile
router.get("/random", randomAthleteProfile)

// router.get("/random", randomAthleteProfile)
router.get("/:id", getPro)

module.exports = router;