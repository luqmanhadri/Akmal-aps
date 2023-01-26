const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({

  item_name: {
    type: String,
    required: true
  },
  
  item_amount: {
    type: Number,
    required: true
  },

  store: {
    type: String,
    required: true
  },

  startDate: {
    type: Date,
    required: true
  },

  endDate: {
    type: Date,
    required: true
  },

  startTime: {
    type: String,
    required: true
  },

  endTime: {
    type: String,
    required: true
  },

  userId: {
    type: String,
    required: true
  },

  approved : {
    type: Boolean,
    required: true,
    default: "false"
  },

  rejected : {
    type: Boolean,
    required: true,
    default: "false"
  },

  picked : {
    type: Boolean,
    required: true,
    default: "false"
  },

  returned : {
    type: Boolean,
    required: true,
    default: "false"
  }

});

module.exports = mongoose.model('Bookings', BookingSchema);