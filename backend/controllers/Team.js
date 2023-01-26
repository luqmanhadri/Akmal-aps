const Account  = require("../models/Account.js");
const Team  = require("../models/Team.js");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createTeam = async (req, res, next) => {
    const newTeam = new Team(req.body);
    try {
      const savedTeam = await newTeam.save();
      res.json(savedTeam);
    } catch (err) {
      next(err);
    }
  };

const updateTeam = async (req, res, next) => {
  try {
  const updatedTeam = await Team.findOneAndUpdate(
  { name: req.params.name },
  {
  $set: req.body,
  },
  { new: true }
  );
  res.json(updatedTeam);
  } catch (err) {
  next(err);
  }
  };

// const randomAthleteProfile = async (req, res, next) => {
//   try {
//     const profile = await AthleteProfile.aggregate([{ $sample: { size: 2 } }]);
//     res.json(profile);
//   } catch (err) {
//     next(err);
//   }
// };

const getTeam = async (req, res, next) => {
  try {
    const team = await Team.findOne({name :req.params.name});
    res.json(team);
  } catch (err) {
    next(err);
  }
};

const randomTeam = async (req, res, next) => {
  try {
    const teams = await Team.aggregate([
      { $sample: { size: 12 } }]);
    res.json(teams);
  } catch (err) {
    next(err);
  }
};

const addManager = async (req, res, next) => {
  const team = req.params.name;
  const managerDetails = req.body
    try {
      await Team.findOneAndUpdate({name : team}, {
        $push: { manager:
          managerDetails
        },
      });
    } catch (err) {
      next(err);
    }
    res.json(req.body);
  
  // }
};

const addCoach = async (req, res, next) => {
  const team = req.params.name;
  const coachDetails = req.body
    try {
      await Team.findOneAndUpdate({name : team}, {
        $push: { coach:
          coachDetails
        },
      });
    } catch (err) {
      next(err);
    }
    res.json(req.body);
  
  // }
};

const createAchievement = async (req, res, next) => {
  const teamId = req.params.name;
  const achievement = req.body
    try {
      await Team.findOneAndUpdate({name : teamId}, {
        $push: { achievement:
          achievement
        },
      });
    } catch (err) {
      next(err);
    }
    res.json(req.body);
  
  // }
};

const deleteAchievement = async (req, res, next) => {
  const teamname = req.params.name;
  const achievementid = req.params.achievementid;
  
  try {
    // Find the user by their name and update the comment field to remove the comment with the specified commentId
    await Team.findOneAndUpdate({name: teamname}, 
      { $pull: { achievement: {_id: achievementid} } });

    return res.json("Achievement deleted");
  } catch (err) {
    return res.json("Achievement can't be deleted")
  }
};

// const createSheet = async (req, res, next) => {
//   const teamId = req.params.id;
//   const players= req.body.players
//   try {
//     await Team.findByIdAndUpdate(teamId, {
//       $push: { 
//         // players:
//         // players
//         players: { $each: players } 
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// const team = new Team()
// await team.save()
// }

const createSheet = async (req, res, next) => {
  const teamName = req.params.name;
  const players= req.body.players;
  try {
    await Team.findOneAndUpdate({name: teamName}, {
      $push: { 
        players: { $each: players } 
      },
    });
  } catch (err) {
    next(err);
  }
  
}

  

module.exports = {createTeam, updateTeam, getTeam, createAchievement, randomTeam, 
  createSheet, addManager, addCoach, deleteAchievement}