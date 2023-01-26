const Booking = require('../models/Booking.js');
const Inventory = require('../models/Inventory.js');

const getUnapprovedBooking = async (req, res, next) => {
  try {
    const booking = await Booking.find({ approved: "false" })
    res.json(booking)
  } catch (error) {
    next(error);
  }
};

const getApprovedBooking = async (req, res, next) => {
  try {
    const booking = await Booking.find({ approved: "true" })
    res.json(booking)
  } catch (error) {
    next(error);
  }
};

const getReturnedBooking = async (req, res, next) => {
  try {
    const booking = await Booking.find({ returned: "true" })
    res.json(booking)
  } catch (error) {
    next(error);
  }
};

const getUnreturnedBooking = async (req, res, next) => {
  try {
    const booking = await Booking.find({ returned: "false" })
    res.json(booking)
  } catch (error) {
    next(error);
  }
};


const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.find()
    res.json(booking)
  } catch (error) {
    next(error);
  }
};

const getBookingbyId = async (req, res, next) => {
  try {
    const booking = await Booking.find({userId : req.params.id})
    res.json(booking)
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  const bookingId = req.params.id;
  try {
    await Booking.findByIdAndDelete(bookingId)
    res.json("Booking deleted")
  } catch (error) {
    next(error);
  }
};

const bookItem = async (req, res, next) => {
  try {
    const { item_name, item_amount, startDate, endDate, startTime, endTime, userId, store } = req.body;
    // Check if the item is available in the inventory
    const item = await Inventory.findOne({ item_name, store });
    if (!item) {
      res.json('Item is not available in the inventory');
    }
    if (item.item_amount < item_amount) {
      res.json('Insufficient quantity in the inventory');
    }
    // Create a new booking
    const booking = new Booking({
      item_name,
      item_amount,
      startDate,
      endDate,
      startTime,
      endTime,
      userId,
      store

    });
    await booking.save();
    // Update the inventory
    // item.item_amount -= item_amount;
    // await item.save();
    res.send({ message: 'Item booked successfully' });
  } catch (error) {
    next(error);
  }
};

const approveBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }
    // Check if the booking is already approved
    if (booking.approved) {
      throw new Error('Booking is already approved');
    }
    // Update the booking
    booking.approved = true;
    await booking.save();
   
  } catch (error) {
    next(error);
  }
};

const pickedBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }
    // Check if the booking is already approved
    if (booking.picked) {
      throw new Error('Booking is already picked up');
    }
    // Update the booking
    booking.picked = true;
    await booking.save();
    // Update the inventory
    const item = await Inventory.findOne({ item_name: booking.item_name, store: booking.store });
    if (!item) {
      throw new Error('Item is not available in the inventory');
    }
    if (item.item_amount < booking.item_amount) {
      throw new Error('Insufficient quantity in the inventory');
    }
    item.item_amount -= booking.item_amount;
    await item.save();
    res.send({ message: 'Booking picked successfully' });
  } catch (error) {
    next(error);
  }
};

const rejectBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }
    // Check if the booking is already approved
    if (booking.approved) {
      throw new Error('Booking is already approved');
    }
    // Update the booking
    booking.rejected = true;
    await booking.save();
    
    res.send({ message: 'Booking rejected successfully' });
  } catch (error) {
    next(error);
  }
};

const returnBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }
    // Check if the booking is already approved
    if (booking.returned) {
      throw new Error('Booking is already returned');
    }
    // Update the booking
    booking.returned = true;
    await booking.save();
    // Update the inventory
    const item = await Inventory.findOne({ item_name: booking.item_name, store: booking.store });
    if (!item) {
      throw new Error('Item is not available in the inventory');
    }
    
    item.item_amount += booking.item_amount;
    await item.save();
    res.send({ message: 'Booking returned successfully' });
  } catch (error) {
    next(error);
  }
};




module.exports = { bookItem, approveBooking, returnBooking, getUnapprovedBooking, 
getApprovedBooking, getReturnedBooking, getUnreturnedBooking, getBooking,
deleteBooking, rejectBooking, pickedBooking, getBookingbyId}