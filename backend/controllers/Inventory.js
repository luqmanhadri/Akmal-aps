const Inventory  = require("../models/Inventory.js");


// const createStore = async (req, res, next) => {
//     const hotelId = req.params.hotelid;
//     const newRoom = new Room(req.body);
  
//     try {
//       const savedRoom = await newRoom.save();
//       try {
//         await Hotel.findByIdAndUpdate(hotelId, {
//           $push: { rooms: savedRoom._id },
//         });
//       } catch (err) {
//         next(err);
//       }
//       res.json(savedRoom);
//     } catch (err) {
//       next(err);
//     }
//   };


const getItems = async (req, res, next) =>{
    try {
        const listofItems = await Inventory.find();
        res.json(listofItems);
    } catch (err) {
        next(err);
    }
};


const createItems =  async (req, res, next) => {
    try {
        const newItem = new Inventory(req.body)
        await newItem.save();
        res.json(newItem);
    } catch (err) {
        next(err)
    }
};

const updateItem = async (req,res,next) =>{
      try {
        const updatedItem = await Inventory.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.json(updatedItem);
      } catch (err) {
        next(err);
      }
}


const deleteItem = async (req, res, next) => {
  const itemId = req.params.id;
  try {
    await Inventory.findByIdAndDelete(itemId)
    res.json("Item deleted")
  } catch (error) {
    next(error);
  }
};


const updateItemAvailability = async (req, res, next) => {
   const itemId = req.params.id 

    try {
      await Inventory.findByIdAndUpdate(
        itemId,
        {
          $push: {
           unavailable_dates : req.body.dates
          },
        }
      );
      res.json("Item status has been updated.");
    } catch (err) {
      next(err);
    }
  };

  const searchItems = async (req, res, next) => {

    const { min, ...others } = req.query;

    try {

       const items = await Inventory.find({
        ...others,

        quantity: { $gt: min | 1
        },
       }
       )
       .limit(req.query.limit);

      res.status(200).json(items);
    } catch (err) {
      next(err);
    }
  };

module.exports = {getItems, createItems, updateItemAvailability, searchItems
, updateItem, deleteItem}