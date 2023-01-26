const express = require("express");
const router = express.Router();
const { Comment } = require("../models");

router.get("/:profileId", async (req, res) =>{
    const profileId = req.params.profileId
    const listOfComments = await Comment.findAll({where: {id:profileId}});
    res.json(listOfComments);
});

router.post("/", async (req, res) => {
    const post = req.body
    await Comment.create(post);
    res.json(post);
});

module.exports = router;