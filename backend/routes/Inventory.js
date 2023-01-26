const express = require("express");
const router = express.Router();
const { Inventory } = require("../models");
const {createItems, getItems, updateItemAvailability, searchItems, updateItem, deleteItem} = require("../controllers/Inventory");

//create items
router.post("/", createItems)

//get items
router.get("/",getItems);

router.patch("/:id", updateItem);

router.delete("/:id", deleteItem);

router.put("/availability/:id", updateItemAvailability);

router.get("/search", searchItems);

module.exports = router;