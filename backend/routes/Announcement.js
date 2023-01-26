const express = require("express");
const router = express.Router();

const {createAnnouncement, getAnnouncement} = require("../controllers/Announcement");
const { verifyToken } = require("../middlewares/verifyToken");

router.get("/", getAnnouncement);

router.post("/", verifyToken,createAnnouncement)


module.exports = router;