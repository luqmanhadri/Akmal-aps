const express = require("express");
const router = express.Router();
const {addVideo, updateVideo, deleteVideo, getVideo, addView, getAccountVideo} = require("../controllers/Video");
const { verifyToken } = require("../middlewares/verifyToken");

//create video
router.post("/", 
// verifyToken, 
addVideo)

//update video
router.put("/:id", verifyToken, updateVideo)

//delete video
router.delete("/:id", deleteVideo);

//get account video
router.get("/:id", getAccountVideo);

//get video
router.get("/find/:id", getVideo);

//add views 
router.put("/view/:id", addView)

module.exports = router;