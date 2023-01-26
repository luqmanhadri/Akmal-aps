const express = require("express");
const { bookItem, approveBooking, returnBooking, getUnapprovedBooking,
    getBooking,
    getUnreturnedBooking, getApprovedBooking, getReturnedBooking,
    rejectBooking, deleteBooking, pickedBooking, getBookingbyId }
    = require("../controllers/Booking");
// const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

//create account

router.get("/", getBooking)

router.get("/:id", getBookingbyId)

router.get("/unapprovebook", getUnapprovedBooking)

router.get("/unreturn", getUnreturnedBooking)

router.get("/approvebook", getApprovedBooking)

router.get("/returned", getReturnedBooking)

router.post("/", bookItem)

router.post("/approve/:id", approveBooking)

router.post("/reject/:id", rejectBooking)

router.post("/picked/:id", pickedBooking)

router.post("/return/:id", returnBooking)

router.delete("/:id", deleteBooking)

module.exports = router;