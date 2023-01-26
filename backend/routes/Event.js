const { application } = require("express");
const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const moment = require('moment-timezone');

router.get("/", async (req, res, next) => {
  const eventlist = await Event.find({});
  res.json(eventlist);
});

// post event to db

router.post("/", async (req, res, next) => {
  const event = new Event(req.body);
  const savedEvent = await event.save();
  res.json(savedEvent);
});

// getNearestEvent = async (req, res) => {
  router.get("/nearest", async (req, res, next) => {
  try {
    const malaysiaTime = moment().tz("Asia/Kuala_Lumpur");
    const currentDate = new Date();
    const nearestEvent = await Event.findOne({
      // date: { $gte: malaysiaTime.toDate() }
      date: { $gte: currentDate }
    }).sort({ date: 1 });
    // res.status(200).json(nearestEvent);
    // res.json(currentDate)
    res.json(malaysiaTime.toDate())
  } catch (error) {
    res.status(500).json({ message: 'Error fetching nearest event', error });
  }
}
  );


  router.post("/new", async (req, res, next) => {
  // createEvent = async (req, res) => {
    try {
      //Get malaysia time
      const malaysiaTime = moment().tz("Asia/Kuala_Lumpur");
      // Create new event with malaysia time
      const newEvent = new Event({
        ...req.body,
        date: malaysiaTime.toDate(),
        timeZone: "Asia/Kuala_Lumpur"
      });
  
      // Save the event to the database
      await newEvent.save();
      res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
      res.status(500).json({ message: 'Error creating event', error });
    }
  }
  );

  router.post("/newevent", async (req, res, next) => {
    try {
      // Get the current date and format it as a string
      const dateFormat = 'DD-MM-YYYY';
      const date = moment().format(dateFormat);
      // Create new event with date string
      const newEvent = new Event({
        // ...req.body,
        date: date
      });
      // Save the event to the database
      await newEvent.save();
      res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
      res.status(500).json({ message: 'Error creating event', error });
    }
  }
  );
  
  router.get("/newevent", async (req, res, next) => {
    try {
      const { date } = req.body;
      // Parse the query date string into a moment object
      const queryDate = moment(date, dateFormat);
      // Find all events with a date greater than or equal to the query date
      const events = await Event.find({
        date: { $gte: queryDate.format(dateFormat) }
      });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events', error });
    }
  }
  );


module.exports = router;
