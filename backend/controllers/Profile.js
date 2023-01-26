const Account  = require("../models/Account.js");
const AthleteProfile  = require("../models/AthleteProfile.js");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createAthleteProfile = async (req, res, next) => {
    const newAthleteProfile = new AthleteProfile({ userId: req.user.id, ...req.body });
    try {
      const savedAthleteProfile = await newAthleteProfile.save();
      res.json(savedAthleteProfile);
    } catch (err) {
      next(err);
    }
  };

const updateAthleteProfile = async (req,res,next) =>{
  try {
    const profile = await AthleteProfile.findById(req.params.id);
    if (!profile) return next(res.json("Profile not found!"));
    if (req.user.id === profile.userId) {
      const updatedProfile = await AthleteProfile.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updatedProfile);
    } else {
      return next(res.json("You can update only your profile!"));
    }
  } catch (err) {
    next(err);
  }
    
}

const randomAthleteProfile = async (req, res, next) => {
  try {
    const profile = await AthleteProfile.aggregate([{ $sample: { size: 2 } }]);
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

const getPro = async (req, res, next) => {
  try {
    const user = await AthleteProfile.findById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const addImage = async (req,res,next) =>{
  try {
    const profile = await AthleteProfile.findById(req.params.id);
    if (!profile) return next(res.json("Profile not found!"));
    if (req.user.id === profile.userId) {
      const updatedProfile = await AthleteProfile.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updatedProfile);
    } else {
      return next(res.json("You can update only your profile!"));
    }
  } catch (err) {
    next(err);
  }
    
}
  

module.exports = {createAthleteProfile, updateAthleteProfile, randomAthleteProfile, getPro}