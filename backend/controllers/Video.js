const AthleteProfile = require("../models/AthleteProfile.js");
const Account = require("../models/Account.js")
const Video = require("../models/Video.js");

const addVideo = async (req, res, next) => {
  // const newVideo = new Video({ userId: req.user.id, ...req.body });
  // const user = await Account.findOne({ id: req.body.username });


  // const newVideo = new Video({ userId: req.params.id, ...req.body });
  const newVideo = new Video(req.body);
  
  try {
    const savedVideo = await newVideo.save();
    res.json(savedVideo);
  } catch (err) {
    next(err);
  }
};

const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(res.json("Video not found!"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.json(updatedVideo);
    } else {
      return next(res.json("You can update only your video!"));
    }
  } catch (err) {
    next(err);
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    // const video = await Video.findById(req.params.id);
    // if (!video) return next(res.json( "Video not found!"));
    // if (req.user.id === video.userId) 
    
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("The video has been deleted.");
    
  } catch (err) {
    next(err);
  }
};

const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.json(video);
  } catch (err) {
    next(err);
  }
};

const getAccountVideo = async (req, res, next) => {
  try {
    // const user = await Account.findById(req.params.id);
    // if (!user) return next(res.json("User not found!"));

    // const video = await Video.findById(req.params.id);
    const video = await Video.find({ userId: req.params.id });
    res.json(video);
  } catch (err) {
    next(err);
  }
};

const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.json("The view has been increased.");
  } catch (err) {
    next(err);
  }
};



// const trend = async (req, res, next) => {
//   try {
//     const videos = await Video.find().sort({ views: -1 });
//     res.status(200).json(videos);
//   } catch (err) {
//     next(err);
//   }
// };

// const sub = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const subscribedChannels = user.subscribedUsers;

//     const list = await Promise.all(
//       subscribedChannels.map(async (channelId) => {
//         return await Video.find({ userId: channelId });
//       })
//     );

//     res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
//   } catch (err) {
//     next(err);
//   }
// };

// const getByTag = async (req, res, next) => {
//   const tags = req.query.tags.split(",");
//   try {
//     const videos = await Video.find({ tags: { $in: tags } }).limit(20);
//     res.status(200).json(videos);
//   } catch (err) {
//     next(err);
//   }
// };

// const search = async (req, res, next) => {
//   const query = req.query.q;
//   try {
//     const videos = await Video.find({
//       title: { $regex: query, $options: "i" },
//     }).limit(40);
//     res.status(200).json(videos);
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = {addVideo, updateVideo, deleteVideo, getVideo,
  getAccountVideo, addView}