const Announcement  = require("../models/Announcement.js");

const createAnnouncement = async(req,res,next) => {
    try {
        const newAnnouncement = new Announcement(req.body);
    
        await newAnnouncement.save();
        res.json("Announcement has been created!");
      } catch (err) {
        next(err);
      }
    
}

const getAnnouncement = async (req, res, next) => {
    try {
      const findAnnouncement= await Announcement.find();
      res.json(findAnnouncement);
    } catch (err) {
      next(err);
    }
  };

module.exports = {createAnnouncement, getAnnouncement}