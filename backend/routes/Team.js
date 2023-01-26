const express = require("express");
const { createTeam, createAchievement, randomTeam, 
    getTeam, createSheet, updateTeam, addManager, 
    addCoach, deleteAchievement } = require("../controllers/Team");
// const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();


//create team
router.post("/", createTeam)

//add team achievement
router.post("/achievement/:name", createAchievement)

//get random teams
router.get("/random", randomTeam)

//get team by id
router.get("/find/:name", getTeam)

//add team sheet
router.patch("/sheet/:name", createSheet)

router.put("/:name", updateTeam)

router.post("/manager/:name", addManager)

router.post("/coach/:name", addCoach)

//delete comment
router.delete("/achievement/:name/:achievementid", deleteAchievement)

module.exports = router;